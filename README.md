# Kaiavault

A simple USDT savings vault built on the Kaia blockchain for the **Kaia Wave Stablecoin Summer Hackathon 2025**.
Kaiavault enables users to deposit Kaia-native USDT, track balances, and withdraw at any time — laying the foundation for secure, yield-generating DeFi experiences inside the Kaia × LINE ecosystem.

## Features
- Deposit and withdraw Kaia-native USDT
- Track balances per user
- Transparent TVL tracking
- Ready for LINE Mini-dApp integration

## Tech Stack
- Smart Contracts: Solidity + Foundry
- Chain: Kaia testnet
- Analytics: Dune dashboard (coming soon)
- UI: React (Day 2 plan)

## Deploy
```bash
forge script script/Deploy.s.sol \
  --rpc-url <KAIA_TESTNET_RPC> \
  --private-key $PRIVATE_KEY \
  --broadcast
```

## Hackathon Submission

* Protocol: Kaiavault smart contracts (GitHub repo)
* Mini-Dapp: LINE integration (in progress)
* Analytics: Dune dashboard (in progress)
* Pitch Deck: (coming soon)

```

# Commands
```

forge build
forge test
forge script script/Deploy.s.sol \
--rpc-url https://kaia-testnet.rpc.url \
--private-key $PRIVATE_KEY \
--broadcast

```

# Notes
- Replace the Kaia testnet USDT contract address in `Deploy.s.sol`.
- Replace `https://kaia-testnet.rpc.url` with the actual Kaia testnet RPC.
- Use your private key for deployment.
