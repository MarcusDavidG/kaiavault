/**
This component provides the user interface for wallet connection using only LINE Mini Dapp SDK.

- It defers rendering of wallet-dependent UI until the client has mounted
  to prevent React hydration errors.
- It displays the user's connected address, loading states, and any
  connection errors.
- It also checks if the user is connected to the correct network (Kaia Testnet)
  and displays a warning if they are not.
- The address is truncated for better display.
- Uses only LINE SDK for wallet operations, no MetaMask/Kaikas fallback.
*/
"use client";

import { useState, useEffect } from 'react';
import { useWallet } from "@/hooks/useWallet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { KAIA_TESTNET_CHAIN_ID } from "@/lib/constants";

// Helper function to truncate the address
const truncateAddress = (address: string) => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export function WalletConnector() {
  const { sdk, account, isLoading, error } = useWallet();
  const [isClient, setIsClient] = useState(false);
  const [chainId, setChainId] = useState<number | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const getChainId = async () => {
      if (sdk && account) {
        try {
          const walletProvider = sdk.getWalletProvider();
          const chain = await walletProvider.request({ method: 'kaia_chainId' }) as string;
          setChainId(parseInt(chain, 16));
        } catch (e) {
          console.error('Failed to get chain ID:', e);
        }
      }
    };
    getChainId();
  }, [sdk, account]);

  const isWrongNetwork = account && chainId !== KAIA_TESTNET_CHAIN_ID;

  const handleConnect = async () => {
    if (!sdk) return;
    try {
      const walletProvider = sdk.getWalletProvider();
      await walletProvider.request({ method: 'kaia_requestAccounts' });
      // The account will be updated via the useWallet hook
    } catch (e) {
      console.error('Failed to connect wallet:', e);
    }
  };

  return (
    <Card className="bg-gray-800 border-gray-700 text-white">
      <CardHeader>
        <CardTitle>Wallet Status</CardTitle>
      </CardHeader>
      <CardContent>
        {!isClient ? null : (
          <>
            {isLoading && <p>Connecting to wallet...</p>}
            {error && <p className="text-red-500">Error: {error.message}</p>}
            {account && (
              <div>
                <p className="text-green-500 font-bold">Connected</p>
                <p className="font-mono text-sm mt-1">{truncateAddress(account)}</p>
                {isWrongNetwork && (
                  <p className="text-yellow-500 text-sm mt-2">Please switch to Kaia Testnet.</p>
                )}
              </div>
            )}
            {!isLoading && !account && !error && (
              <Button onClick={handleConnect}>
                Connect Wallet
              </Button>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
