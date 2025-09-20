'use client'

import { useState } from 'react'
import LandingPage from '../components/LandingPage'
import Header from '../components/Header'
import Footer from '../components/Footer'
import WalletConnector from '../components/WalletConnector'
import VaultDashboard from '../components/VaultDashboard'
import DepositWithdrawForm from '../components/DepositWithdrawForm'

export default function Home() {
  const [showApp, setShowApp] = useState(false)

  if (!showApp) {
    return <LandingPage onEnterApp={() => setShowApp(true)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white flex flex-col">
      <Header />

      <main className="flex-1 py-8 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-2">Kaiavault</h1>
            <p className="text-lg text-gray-300">LINE Mini Dapp USDT Vault</p>
          </div>

          <div className="flex justify-center">
            <WalletConnector />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <VaultDashboard />
            <DepositWithdrawForm />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
