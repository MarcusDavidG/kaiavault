# Kaiavault

This is a [Next.js](https://nextjs.org) project for a Kaia-based USDT savings vault with LINE Mini Dapp integration.

## Deployed Contracts (Kaia Testnet)

- **KUSDT**: `0x5b73C5498c1E3b4dbA84de0F1833c4a029d90519`
- **USDTVault**: `0x7FA9385bE102ac3EAc297483Dd6233D62b3e1496`

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Wallet Connection

This application supports two ways to connect a wallet:

### 1. LINE Mini Dapp

- To test the LINE Mini Dapp integration, you must run the application inside a LINE Mini Dapp emulator or a registered Mini Dapp environment.
- The application will automatically detect the LINE environment and connect to the user's wallet via the Dapp Portal SDK.

### 2. MetaMask / Kaikas (Browser Fallback)

- If you open the application in a standard web browser, it will provide a "Connect Wallet" button.
- Clicking this button will open the browser's wallet extension (e.g., MetaMask or Kaikas), allowing you to connect your wallet.
- Ensure your wallet is connected to the **Kaia Testnet**.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.