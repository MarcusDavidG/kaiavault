'use client'

import { ReactNode } from 'react'
import { WalletProvider } from '../lib/wallet-context'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WalletProvider>
      {children}
    </WalletProvider>
  )
}
