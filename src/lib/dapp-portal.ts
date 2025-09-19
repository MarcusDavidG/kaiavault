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

/**
 * Request a transaction using the LINE Dapp Portal SDK.
 * @param tx The transaction object with 'to' and 'data' fields.
 * @returns A promise that resolves to the transaction result.
 */
export const requestTransaction = async (tx: { to: string; data: string }): Promise<{ txHash: string }> => {
  const sdk = await getDappPortalSDK();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return await (sdk as any).requestTransaction(tx);
};

/**
 * Check if the app is running inside LINE Mini Dapp environment.
 * @returns True if inside LINE Mini Dapp, false otherwise.
 */
export const isInsideLineMiniDapp = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }
  return /Line/i.test(navigator.userAgent);
};
