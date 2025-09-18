"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getDappPortalSDK } from '@/lib/dapp-portal';
import type DappPortalSDK from '@linenext/dapp-portal-sdk';
import { ethers } from 'ethers';

// Define the shape of the context data
interface DappPortalContextType {
  sdk: DappPortalSDK | null;
  provider: ethers.BrowserProvider | null;
  account: string | null;
  isLoading: boolean;
  error: Error | null;
}

// Create the context with a default value
const DappPortalContext = createContext<DappPortalContextType | undefined>(undefined);

// Create the provider component
export const DappPortalProvider = ({ children }: { children: ReactNode }) => {
  const [sdk, setSdk] = useState<DappPortalSDK | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        const sdkInstance = await getDappPortalSDK();
        setSdk(sdkInstance);

        const walletProvider = sdkInstance.getWalletProvider();
        if (walletProvider) {
          const ethersProvider = new ethers.BrowserProvider(walletProvider);
          setProvider(ethersProvider);

          const signer = await ethersProvider.getSigner();
          const userAccount = await signer.getAddress();
          setAccount(userAccount);
        } else {
          throw new Error("Failed to get wallet provider from Dapp Portal SDK.");
        }
      } catch (e) {
        setError(e as Error);
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, []);

  const value = { sdk, provider, account, isLoading, error };

  return (
    <DappPortalContext.Provider value={value}>
      {children}
    </DappPortalContext.Provider>
  );
};

// Create the custom hook to use the context
export const useDappPortal = (): DappPortalContextType => {
  const context = useContext(DappPortalContext);
  if (context === undefined) {
    throw new Error('useDappPortal must be used within a DappPortalProvider');
  }
  return context;
};
