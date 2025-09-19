'use client'

import { useWallet } from './useWallet'

export function useDappPortal() {
  // For now, just return the wallet hook as the dapp portal interface
  const wallet = useWallet()
  return wallet
}
