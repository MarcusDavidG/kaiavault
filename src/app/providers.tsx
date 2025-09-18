"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig } from "wagmi";
import { DappPortalProvider, useDappPortal } from "@/hooks/useDappPortal";
import { defineChain } from "viem";
import { ReactNode, useMemo } from "react";

const queryClient = new QueryClient();

// Define the Kaia Testnet chain configuration
const kaiaTestnet = defineChain({
  id: 1001,
  name: 'Kaia Testnet',
  nativeCurrency: { name: 'KAIA', symbol: 'KAIA', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://public-en-kairos.node.kaia.io'] },
  },
  blockExplorers: {
    default: { name: 'Kaiascope', url: 'https://kairos.kaiascope.com' },
  },
});

/**
 * A wrapper component that initializes Wagmi config only after the
 * Dapp Portal provider is available.
 */
function WagmiInitializer({ children }: { children: ReactNode }) {
  const { provider, isLoading, error } = useDappPortal();

  // Create the Wagmi config only when the provider is ready
  const config = useMemo(() => {
    if (!provider) return null;

    return createConfig({
      chains: [kaiaTestnet],
      transports: {
        // Use a custom transport that points to the LINE Mini Dapp provider
        [kaiaTestnet.id]: (params) => ({
          ...provider,
          // Add any other properties required by the transport if necessary
        }),
      },
    });
  }, [provider]);

  // Render WagmiProvider only when the config is created
  if (error) {
    return <div className="text-red-500">Error initializing wallet: {error.message}</div>;
  }

  if (isLoading || !config) {
    // You can render a loading spinner here if needed
    return <div>Loading Wallet Provider...</div>;
  }

  return <WagmiProvider config={config}>{children}</WagmiProvider>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <DappPortalProvider>
      <WagmiInitializer>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </WagmiInitializer>
    </DappPortalProvider>
  );
}
