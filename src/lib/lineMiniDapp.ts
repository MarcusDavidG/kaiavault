const dappId = 'N68c79df536f5a3565ea5cfe7';
const clientId = '6c9c2556-901d-4c3a-9b2f-4c027f28d75d';
const clientSecret = 'ea58c679-66c8-4c16-9f19-8133d6d1194f';

let dappPortalSDK: any;

export const initDappPortalSDK = async () => {
  if (!dappPortalSDK) {
    const { default: DappPortalSDK } = await import('@linenext/dapp-portal-sdk');
    dappPortalSDK = new DappPortalSDK(dappId, clientId, clientSecret);
  }
  return dappPortalSDK;
};

export const getAccount = async () => {
  const sdk = await initDappPortalSDK();
  const account = await sdk.getAccount();
  return account;
};

export const requestTransaction = async (tx: any) => {
  const sdk = await initDappPortalSDK();
  const result = await sdk.requestTransaction(tx);
  return result;
};

export const isInsideLineMiniDapp = () => {
  // This is a simplified check. In a real-world scenario, you might want to use a more robust method.
  return /Line/i.test(navigator.userAgent);
};
