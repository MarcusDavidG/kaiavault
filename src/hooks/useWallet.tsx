/**
This file provides wallet state access using only LINE Mini Dapp SDK.
The `useWallet` hook abstracts the wallet state, providing a
single interface for interacting with the LINE Mini Dapp wallet.

- Uses the Dapp Portal SDK for all wallet operations.
- No fallback to MetaMask or Kaikas.
*/
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getDappPortalSDK } from '@/lib/dapp-portal';
import type DappPortalSDK from '@linenext/dapp-portal-sdk';
import toast from 'react-hot-toast';

// Define the shape of the context data
interface WalletContextType {
  sdk: DappPortalSDK | null;
  account: string | null;
  isLoading: boolean;
  error: Error | null;
}

// Create the context with a default value
const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Create the provider component
export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [sdk, setSdk] = useState<DappPortalSDK | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        const sdkInstance = await getDappPortalSDK();
        setSdk(sdkInstance);
        const walletProvider = sdkInstance.getWalletProvider();
        const accounts = await walletProvider.request({ method: 'kaia_requestAccounts' }) as string[];
        if (accounts && accounts.length > 0) {
          setAccount(accounts[0]);
          toast.success('Wallet connected successfully!');
        }
      } catch (e: unknown) {
        const error = e instanceof Error ? e : new Error('Failed to initialize wallet');
        setError(error);
        toast.error(`Wallet connection failed: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, []);

  const value = { sdk, account, isLoading, error };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

// Create the custom hook to use the context
export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
