# Kaiavault Project Restructuring TODO

## Contract Restructuring
- [ ] Move USDTVault.sol from contracts/ to contracts/src/
- [ ] Create placeholder KUSDT.sol in contracts/src/
- [ ] Move Deploy.s.sol from script/ to contracts/script/
- [ ] Move USDTVault.t.sol from test/ to contracts/test/
- [ ] Move foundry.toml from root to contracts/
- [ ] Move foundry.lock from root to contracts/
- [ ] Move forge-std/ from lib/ to contracts/
- [ ] Move out/ from root to contracts/
- [ ] Move lib/ from root to contracts/
- [ ] Move solidity-files-cache.json from cache/ to contracts/cache/
- [ ] Remove old contracts/abi/ folder after moving ABIs

## Frontend Creation
- [ ] Create frontend/ directory
- [ ] Scaffold Next.js 15 project with TypeScript, TailwindCSS, and shadcn/ui
- [ ] Configure shadcn/ui with Button, Card, Input, Tabs components
- [ ] Create app/ folder structure with layout.tsx, page.tsx, providers.tsx, globals.css
- [ ] Create components/ folder with WalletConnector.tsx, VaultDashboard.tsx, DepositWithdrawForm.tsx, ui/ (shadcn components)
- [ ] Create hooks/ folder with useDappPortal.tsx, useWallet.tsx
- [ ] Create lib/ folder with dapp-portal.ts, wallet-context.tsx, contracts.ts, constants.ts, abi/ (move ABIs here)
- [ ] Create public/ folder
- [ ] Create .env.local with specified environment variables
- [ ] Update next.config.ts to allow reading env vars
- [ ] Create package.json, tailwind.config.ts, tsconfig.json

## File Movements and Updates
- [ ] Move KUSDT.json and USDTVault.json from contracts/abi/ to frontend/lib/abi/
- [ ] Update any import paths in frontend files for ABIs and constants

## Verification
- [ ] Verify forge test works inside contracts/
- [ ] Verify npm run dev works inside frontend/
