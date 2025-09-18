"use client";

import { WalletConnector } from "@/components/WalletConnector";
import { VaultDashboard } from "@/components/VaultDashboard";
import { DepositWithdrawForm } from "@/components/DepositWithdrawForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="p-4 flex justify-between items-center border-b border-gray-700">
        <h1 className="text-2xl font-bold text-green-400">KaiaVault</h1>
        <WalletConnector />
      </header>

      <main className="p-4 md:p-8 lg:p-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-2">KUSDT Yield Vault</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Deposit your KUSDT and earn competitive yields. Simple, secure, and powered by the Kaia network.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <div className="lg:col-span-1">
            <VaultDashboard />
          </div>
          <div className="lg:col-span-1">
            <DepositWithdrawForm />
          </div>
        </div>
      </main>

      <footer className="text-center p-4 mt-12 border-t border-gray-700">
        <p className="text-gray-500">Powered by LINE NEXT</p>
      </footer>
    </div>
  );
}
