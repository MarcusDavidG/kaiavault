'use client'

import { createContext } from 'react'

export const WalletContext = createContext({})

export function WalletProvider({ children }: { children: React.ReactNode }) {
  return <WalletContext.Provider value={{}}>{children}</WalletContext.Provider>
}
