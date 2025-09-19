/**
This file configures the core providers for the application using only LINE Mini Dapp SDK.

- The `Providers` component wraps the application in the WalletProvider context,
  ensuring wallet state is available throughout the component tree.
- No fallback to MetaMask or Kaikas.
*/
"use client";

import { WalletProvider } from "@/hooks/useWallet";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WalletProvider>{children}</WalletProvider>
  );
}
