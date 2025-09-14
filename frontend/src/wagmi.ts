import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { defineChain } from 'viem';

const kaiaKairosTestnet = defineChain({
  id: 1001,
  name: 'Kaia Kairos Testnet',
  network: 'kaia-kairos-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Kaia',
    symbol: 'KAIA',
  },
  rpcUrls: {
    default: {
      http: ['https://public-en-cypress.klaytn.net'],
    },
  },
  blockExplorers: {
    default: {
      name: 'KlaytnScope',
      url: 'https://baobab.klaytnscope.com/',
    },
  },
  testnet: true,
});

export const config = getDefaultConfig({
  appName: 'Kaiavault',
  projectId: 'BPLBigIilwcsv6bd5UJsXmyS9SeEDBH3EwkdYICO-kMAhP69wOHiM02UvW_CUOKJKX6kh0kLi6phu1QO-FtB7rA',
  chains: [kaiaKairosTestnet],
  ssr: true,
});
