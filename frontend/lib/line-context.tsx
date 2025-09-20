'use client'

import { createContext, ReactNode, useContext, useState, useEffect, useCallback } from 'react'
import DAppPortalSDK from '@linenext/dapp-portal-sdk'

export interface TransactionRequest {
  to: string;
  from: string;
  data?: string;
  value?: string;
}

export interface LineWallet {
  address: string;
  balance: string;
}

export interface LineContextState {
  sdk: DAppPortalSDK | null;
  isConnected: boolean;
  wallet: LineWallet | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  requestTransaction: (tx: TransactionRequest) => Promise<unknown>;
}

export const LineContext = createContext<LineContextState | undefined>(
  undefined
)

export const useLine = () => {
  const context = useContext(LineContext)
  if (context === undefined) {
    throw new Error('useLine must be used within a LineProvider')
  }
  return context
}

export const LineProvider = ({ children }: { children: ReactNode }) => {
  const [sdk, setSdk] = useState<DAppPortalSDK | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [wallet, setWallet] = useState<LineWallet | null>(null);

  useEffect(() => {
    const initSdk = async () => {
      const dappId = process.env.NEXT_PUBLIC_DAPP_ID;
      if (!dappId) {
        console.warn('NEXT_PUBLIC_DAPP_ID not found. LINE wallet integration disabled.');
        return;
      }

      try {
        // Use the static init method with proper configuration
        const lineSdk = await DAppPortalSDK.init({
          clientId: dappId,
        });
        setSdk(lineSdk);
      } catch (error: unknown) {
        console.error('Failed to initialize LINE SDK:', error);
      }
    }
    initSdk();
  }, []);

  const connect = useCallback(async () => {
    if (!sdk) {
      console.warn('LINE SDK not initialized. Please check your NEXT_PUBLIC_DAPP_ID configuration.');
      return;
    }

    try {
      const walletProvider = sdk.getWalletProvider();
      const addresses = await walletProvider.request({ method: 'eth_requestAccounts' }) as string[];
      if (addresses.length > 0) {
        setWallet({ address: addresses[0], balance: '0' }); // Balance can be fetched separately
        setIsConnected(true);
      }
    } catch (error: unknown) {
      console.error('Failed to connect LINE wallet:', error);
      // Show user-friendly error message
      alert('LINE wallet connection failed. Please check your LINE app configuration or try using MetaMask/Kaikas instead.');
    }
  }, [sdk]);

  const disconnect = () => {
    setIsConnected(false);
    setWallet(null);
  };

  const requestTransaction = async (tx: TransactionRequest) => {
    if (!sdk) throw new Error('SDK not initialized');
    const walletProvider = sdk.getWalletProvider();
    return await walletProvider.request({
      method: 'eth_sendTransaction',
      params: [tx],
    });
  };

  return (
    <LineContext.Provider
      value={{
        sdk,
        isConnected,
        wallet,
        connect,
        disconnect,
        requestTransaction,
      }}
    >
      {children}
    </LineContext.Provider>
  );
};
