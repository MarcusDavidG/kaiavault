import { createConfig, http } from 'wagmi'
import { kaia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [kaia],
  connectors: [
    injected(),
  ],
  transports: {
    [kaia.id]: http(),
  },
})
