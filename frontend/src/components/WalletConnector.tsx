import { useEffect, useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { initializeLineMiniDappSDK, getLineMiniDappSDK, isRunningInLineMiniDapp } from '../lib/lineMiniDapp';
import { useAccount, useDisconnect } from 'wagmi';

export function WalletConnector() {
  const [isLineInitialized, setIsLineInitialized] = useState(false);
  const [lineError, setLineError] = useState<string | null>(null);
  const [lineAddress, setLineAddress] = useState<string | null>(null);
  const [isLineConnecting, setIsLineConnecting] = useState(false);

  const { isConnected: isRainbowKitConnected, disconnect: rainbowKitDisconnect } = useAccount();

  const isInLine = isRunningInLineMiniDapp();

  useEffect(() => {
    if (isInLine && !isLineInitialized) {
      setIsLineConnecting(true);
      initializeLineMiniDappSDK()
        .then(sdk => {
          setIsLineInitialized(true);
          // Attempt to get account immediately if in LINE
          sdk.getWalletProvider().then(walletProvider => {
            walletProvider.send('eth_accounts').then((accounts: string[]) => {
              if (accounts.length > 0) {
                setLineAddress(accounts[0]);
              }
            }).catch(err => console.error("Failed to get LINE accounts:", err));
          });
        })
        .catch(err => {
          setLineError(err.message);
          console.error("LINE SDK initialization failed:", err);
        })
        .finally(() => {
          setIsLineConnecting(false);
        });
    }
  }, [isInLine, isLineInitialized]);

  const connectLineWallet = async () => {
    setIsLineConnecting(true);
    setLineError(null);
    try {
      const sdk = getLineMiniDappSDK();
      const walletProvider = await sdk.getWalletProvider();
      const accounts: string[] = await walletProvider.send('eth_requestAccounts');
      if (accounts.length > 0) {
        setLineAddress(accounts[0]);
      }
    } catch (err: any) {
      setLineError(err.message);
      console.error("LINE wallet connection failed:", err);
    } finally {
      setIsLineConnecting(false);
    }
  };

  const disconnectLineWallet = async () => {
    setLineError(null);
    try {
      const sdk = getLineMiniDappSDK();
      const walletProvider = await sdk.getWalletProvider();
      await walletProvider.send('wallet_disconnect'); // Assuming a disconnect method exists or is handled by the provider
      setLineAddress(null);
    } catch (err: any) {
      setLineError(err.message);
      console.error("LINE wallet disconnection failed:", err);
    }
  };

  if (isInLine) {
    return (
      <div className="mb-6 text-center">
        {lineError && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">Error: {lineError}</div>}
        {lineAddress ? (
          <div>
            <p className="text-white mb-2">Connected to LINE: {lineAddress.substring(0, 6)}...{lineAddress.substring(lineAddress.length - 4)}</p>
            <button
              onClick={disconnectLineWallet}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
              disabled={isLineConnecting}
            >
              {isLineConnecting ? 'Disconnecting...' : 'Disconnect LINE Wallet'}
            </button>
          </div>
        ) : (
          <button
            onClick={connectLineWallet}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
            disabled={isLineConnecting || !isLineInitialized}
          >
            {isLineConnecting ? 'Connecting...' : 'Connect LINE Wallet'}
          </button>
        )}
      </div>
    );
  } else {
    return (
      <div className="mb-6">
        <ConnectButton />
      </div>
    );
  }
}

export default WalletConnector;
