import type DappPortalSDK from '@linenext/dapp-portal-sdk';

let sdkInstance: DappPortalSDK | null = null;

/**
 * Initializes the Dapp Portal SDK as a singleton.
 * This ensures the SDK is initialized only once.
 * @returns A promise that resolves to the SDK instance.
 */
export const getDappPortalSDK = async (): Promise<DappPortalSDK> => {
  // The SDK should only be initialized on the client-side
  if (typeof window === 'undefined') {
    // This is a server-side render, return a mock or throw an error
    // For this purpose, we throw an error as it should not be called server-side
    throw new Error('Dapp Portal SDK can only be initialized on the client side');
  }

  if (sdkInstance) {
    return sdkInstance;
  }

  // Use dynamic import to ensure the module is only loaded on the client
  const DappPortalSDKModule = (await import('@linenext/dapp-portal-sdk')).default;
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;

  if (!clientId) {
    throw new Error('NEXT_PUBLIC_CLIENT_ID is not configured in .env.local');
  }

  // Initialize the SDK with clientId and chainId for Kaia Testnet (Baobab)
  sdkInstance = await DappPortalSDKModule.init({
    clientId,
    chainId: '1001',
  });

  return sdkInstance;
};
