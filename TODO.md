# Kaiavault LINE-Only Refactor TODO

## Completed Tasks
- [x] Analyze codebase and create refactor plan
- [x] Get user approval for plan
- [x] Create lib/constants.ts with contract addresses and IDs
- [x] Update lib/contracts.ts to add utilities using LINE signer
- [x] Refactor hooks/useWallet.tsx to remove Wagmi fallback
- [x] Refactor components/WalletConnector.tsx to remove Wagmi connect

## Pending Tasks
- [x] Refactor components/DepositWithdrawForm.tsx to remove Wagmi read/write
- [x] Refactor components/VaultDashboard.tsx to replace Wagmi reads with ethers
- [x] Refactor providers.tsx to remove WagmiProvider
- [x] Remove lib/mock-wallet.ts
- [x] Remove lib/lineMiniDapp.ts
- [x] Add error handling and toast notifications
- [ ] Test wallet connection and transactions
- [ ] Verify UI components remain unchanged
