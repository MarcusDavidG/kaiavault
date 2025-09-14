import DappPortalSDK from '@linenext/dapp-portal-sdk';
import { encodeFunctionData } from 'viem';

// Replace with your actual Client ID obtained from Dapp Portal team
const LINE_MINIDAPP_CLIENT_ID = 'YOUR_LINE_MINIDAPP_CLIENT_ID'; 
const KAIA_KAIROS_CHAIN_ID = '1001'; // Kaia Kairos Testnet Chain ID

let lineDappSDK: DappPortalSDK | null = null;

export async function initializeLineMiniDappSDK(): Promise<DappPortalSDK> {
  if (lineDappSDK) {
    return lineDappSDK;
  }

  try {
    lineDappSDK = await DappPortalSDK.init({
      clientId: LINE_MINIDAPP_CLIENT_ID,
      chainId: KAIA_KAIROS_CHAIN_ID,
    });
    console.log('LINE Mini Dapp SDK initialized successfully.', lineDappSDK);
    return lineDappSDK;
  } catch (error) {
    console.error('Failed to initialize LINE Mini Dapp SDK:', error);
    throw error;
  }
}

export function getLineMiniDappSDK(): DappPortalSDK {
  if (!lineDappSDK) {
    throw new Error('LINE Mini Dapp SDK not initialized. Call initializeLineMiniDappSDK first.');
  }
  return lineDappSDK;
}

export function isRunningInLineMiniDapp(): boolean {
  return DappPortalSDK.isInAppBrowser();
}

export { encodeFunctionData };