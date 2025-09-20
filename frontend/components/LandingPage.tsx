'use client'

import { Button } from './ui/button'
import { ArrowRight, Shield, Zap, TrendingUp } from 'lucide-react'
import Header from './Header'
import Footer from './Footer'

interface LandingPageProps {
  onEnterApp: () => void
}

export default function LandingPage({ onEnterApp }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white">
      <Header />

      {/* Hero Section */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* Logo/Brand */}
          <div className="mb-12">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
              Kaiavault
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-2">
              Secure USDT Vault on LINE Mini Dapp
            </p>
            <p className="text-lg text-gray-400">
              Earn yields, deposit, and withdraw with confidence
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-400 to-cyan-500 rounded-lg mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">High Yields</h3>
              <p className="text-gray-300">Maximize your USDT returns with our optimized vault strategies</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Bank-Grade Security</h3>
              <p className="text-gray-300">Your assets are protected by audited smart contracts and LINE&apos;s infrastructure</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-gray-300">Instant deposits and withdrawals with minimal gas fees</p>
            </div>
          </div>

          {/* CTA Button */}
          <Button
            onClick={onEnterApp}
            size="lg"
            className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-full text-lg"
          >
            Enter Vault
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  )
}
