import { ethers } from "ethers";
import { USDT_CONTRACT_ADDRESS, USDT_VAULT_CONTRACT_ADDRESS } from "./constants";
import KUSDTJson from "@/abi/KUSDT.json";
import USDTVaultJson from "@/abi/USDTVault.json";
import { getDappPortalSDK } from "./dapp-portal";

export const usdtContractAddress = USDT_CONTRACT_ADDRESS;
export const usdtVaultContractAddress = USDT_VAULT_CONTRACT_ADDRESS;

/**
 * Get signer from LINE Dapp Portal SDK
 */
export async function getSigner(): Promise<ethers.Signer> {
  const sdk = await getDappPortalSDK();
  const walletProvider = sdk.getWalletProvider();
  const provider = new ethers.BrowserProvider(walletProvider);
  const signer = await provider.getSigner();
  return signer;
}

/**
 * Get USDT contract instance connected with LINE signer
 */
export async function getUSDTContract(): Promise<ethers.Contract> {
  const signer = await getSigner();
  return new ethers.Contract(USDT_CONTRACT_ADDRESS, KUSDTJson.abi, signer);
}

/**
 * Get USDT Vault contract instance connected with LINE signer
 */
export async function getUSDTVaultContract(): Promise<ethers.Contract> {
  const signer = await getSigner();
  return new ethers.Contract(USDT_VAULT_CONTRACT_ADDRESS, USDTVaultJson.abi, signer);
}
