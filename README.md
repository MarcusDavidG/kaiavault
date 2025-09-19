# Kaiavault

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)](https://kaiavault.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC)](https://tailwindcss.com/)

A modern, secure decentralized application (dApp) for USDT savings vault on the Kaia blockchain, featuring seamless LINE Mini Dapp integration and MetaMask/Kaikas wallet connectivity.

## 🌐 Live Demo

**Production URL:** [https://kaiavault.vercel.app/](https://kaiavault.vercel.app/)

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Development](#development)
- [Deployment](#deployment)
- [Usage](#usage)
- [Smart Contracts](#smart-contracts)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### 🔐 Wallet Integration
- **LINE Mini Dapp**: Native integration with LINE's ecosystem for seamless user experience
- **Browser Wallets**: Support for MetaMask and Kaikas extensions
- **Auto-detection**: Automatically detects LINE environment and switches wallet providers

### 💰 Vault Operations
- **Deposit USDT**: Secure deposit functionality with real-time balance updates
- **Withdraw USDT**: Flexible withdrawal with transaction confirmation
- **Balance Tracking**: Live vault balance and user position monitoring
- **Transaction History**: Comprehensive transaction logging and status tracking

### 🎨 User Experience
- **Responsive Design**: Optimized for desktop and mobile devices
- **Dark/Light Theme**: Modern UI with Tailwind CSS styling
- **Real-time Updates**: Live data synchronization using React Query
- **Error Handling**: Comprehensive error states and user feedback

### 🔒 Security
- **TypeScript**: Full type safety throughout the application
- **Input Validation**: Client-side and contract-level validation
- **Secure Transactions**: Encrypted transaction handling via wallet providers

## 🛠 Technology Stack

### Frontend
- **Framework**: [Next.js 15.5.3](https://nextjs.org/) - React framework with App Router
- **Language**: [TypeScript 5.0](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/) - Utility-first CSS framework
- **State Management**: React Context + React Query for server state

### Blockchain Integration
- **Kaia Network**: Mainnet and testnet support
- **ethers.js**: Ethereum-compatible library for blockchain interaction
- **wagmi**: React hooks for Ethereum
- **viem**: Lightweight Ethereum library

### LINE Integration
- **@linenext/dapp-portal-sdk**: Official LINE Mini Dapp SDK
- **Client ID**: Configurable for different environments

### Development Tools
- **ESLint**: Code linting and formatting
- **PostCSS**: CSS processing with Tailwind
- **TypeScript Compiler**: Type checking and compilation

## 📋 Prerequisites

- **Node.js**: Version 18.0 or higher
- **npm**: Version 8.0 or higher (comes with Node.js)
- **Git**: For version control
- **Wallet**: MetaMask or Kaikas browser extension (for browser fallback)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kaiavault
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (see [Environment Setup](#environment-setup))

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - The application will automatically reload on code changes

## 🔧 Environment Setup

Create a `.env.local` file in the root directory:

```env
# LINE Mini Dapp Configuration
NEXT_PUBLIC_CLIENT_ID=your_client_id_here

# Optional: Additional environment variables
NEXT_PUBLIC_DAPP_ID=your_dapp_id_here
NEXT_PUBLIC_DAPP_NAME=Kaiavault
```

### Environment Variables Description

- `NEXT_PUBLIC_CLIENT_ID`: Required for LINE Mini Dapp integration
- `NEXT_PUBLIC_DAPP_ID`: Optional dApp identifier
- `NEXT_PUBLIC_DAPP_NAME`: Optional dApp display name

## 💻 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

### Development Workflow

1. **Feature Development**
   - Create feature branches from `main`
   - Follow TypeScript best practices
   - Use ESLint for code quality

2. **Testing**
   - Test wallet connections in both LINE and browser environments
   - Verify transactions on Kaia testnet before mainnet deployment

3. **Code Quality**
   - Run `npm run lint` before committing
   - Ensure TypeScript compilation passes
   - Follow React and Next.js best practices

## 🌍 Deployment

### Vercel (Recommended)

1. **Connect Repository**
   - Push code to GitHub
   - Connect repository to Vercel
   - Vercel will auto-detect Next.js configuration

2. **Environment Variables**
   - Set `NEXT_PUBLIC_CLIENT_ID` in Vercel dashboard
   - Configure for Production environment

3. **Deploy**
   - Automatic deployments on push to main branch
   - Manual deployments via Vercel CLI: `vercel --prod`

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 📖 Usage

### For Users

1. **Access the Application**
   - Visit [https://kaiavault.vercel.app/](https://kaiavault.vercel.app/)
   - Or run locally: `npm run dev`

2. **Connect Wallet**
   - **LINE Mini Dapp**: Open in LINE app - wallet connects automatically
   - **Browser**: Click "Connect Wallet" and select MetaMask/Kaikas

3. **Use Vault**
   - **Deposit**: Enter USDT amount and confirm transaction
   - **Withdraw**: Select amount to withdraw and confirm
   - **Monitor**: View real-time balance and transaction history

### For Developers

```typescript
// Example: Connect wallet programmatically
import { useWallet } from '@/lib/wallet-context';

function MyComponent() {
  const { account, connectWallet, disconnectWallet } = useWallet();

  const handleConnect = async () => {
    const success = await connectWallet();
    if (success) {
      console.log('Wallet connected:', account);
    }
  };

  return (
    <button onClick={handleConnect}>
      {account ? 'Disconnect' : 'Connect Wallet'}
    </button>
  );
}
```

## 📄 Smart Contracts

### Deployed Contracts (Kaia Testnet)

- **KUSDT Token**: `0x5b73C5498c1E3b4dbA84de0F1833c4a029d90519`
- **USDTVault**: `0x7FA9385bE102ac3EAc297483Dd6233D62b3e1496`

### Contract Features

- **KUSDT**: ERC-20 compatible stablecoin
- **USDTVault**: Secure vault for USDT deposits and withdrawals
- **Access Control**: Owner-only administrative functions
- **Event Logging**: Comprehensive transaction events

## 📁 Project Structure

```
kaiavault/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Home page
│   │   └── providers.tsx   # Context providers
│   ├── components/         # React components
│   │   ├── ui/            # Reusable UI components
│   │   ├── VaultDashboard.tsx
│   │   ├── WalletConnector.tsx
│   │   └── DepositWithdrawForm.tsx
│   ├── hooks/             # Custom React hooks
│   │   ├── useWallet.tsx
│   │   └── useDappPortal.tsx
│   ├── lib/               # Utility libraries
│   │   ├── constants.ts   # Contract addresses & config
│   │   ├── contracts.ts   # Contract ABIs
│   │   ├── dapp-portal.ts # LINE integration
│   │   └── wallet-context.tsx # Wallet state management
│   └── abi/               # Contract ABIs
├── public/                # Static assets
├── .env.local            # Environment variables (gitignored)
├── next.config.ts        # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Run tests and linting**
   ```bash
   npm run lint
   npm run build
   ```
5. **Commit your changes**
   ```bash
   git commit -m "Add: Brief description of changes"
   ```
6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Create a Pull Request**

### Guidelines

- Follow TypeScript and React best practices
- Write clear, concise commit messages
- Test wallet integrations thoroughly
- Update documentation for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Include browser console logs for debugging
4. Specify your environment (LINE Mini Dapp vs Browser)

## 🙏 Acknowledgments

- [Kaia Network](https://kaia.io/) for blockchain infrastructure
- [LINE](https://line.me/) for Mini Dapp platform
- [Vercel](https://vercel.com/) for hosting platform
- Open source community for amazing tools and libraries

---

**Built with ❤️ for the decentralized future**
