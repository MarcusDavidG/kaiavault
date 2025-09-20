'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { useLine } from '../lib/line-context'
import { TrendingUp, TrendingDown, Wallet, ArrowDown, ArrowUp } from 'lucide-react'

export default function VaultDashboard() {
  const { isConnected, wallet } = useLine()
  const [vaultData, setVaultData] = useState({
    totalDeposits: '0',
    totalWithdrawals: '0',
    userBalance: '0',
  })

  useEffect(() => {
    if (isConnected && wallet) {
      // Placeholder for fetching vault data from contracts
      // In a real implementation, this would call contract methods
      setVaultData({
        totalDeposits: '5000',
        totalWithdrawals: '2000',
        userBalance: '3000',
      })
    }
  }, [isConnected, wallet])

  if (!isConnected) {
    return (
      <Card className="max-w-2xl mx-auto bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 text-white shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Wallet className="w-6 h-6 text-cyan-400" />
            <span>Vault Dashboard</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300">Please connect your wallet to view vault data.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="relative min-h-screen">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-60 h-60 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-indigo-900/30 to-blue-900/30"></div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-6 py-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white flex items-center justify-center space-x-2">
          <Wallet className="w-8 h-8 text-cyan-500" />
          <span>Vault Dashboard</span>
        </h2>
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-800">
          <TabsTrigger value="overview" className="data-[state=active]:bg-cyan-600">Overview</TabsTrigger>
          <TabsTrigger value="deposits" className="data-[state=active]:bg-cyan-600">Deposits</TabsTrigger>
          <TabsTrigger value="withdrawals" className="data-[state=active]:bg-cyan-600">Withdrawals</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-r from-green-900 to-green-800 text-white shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span>Total Deposits</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-300">{vaultData.totalDeposits} USDT</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-red-900 to-red-800 text-white shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium flex items-center space-x-2">
                  <TrendingDown className="w-4 h-4 text-red-400" />
                  <span>Total Withdrawals</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-300">{vaultData.totalWithdrawals} USDT</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-cyan-900 to-cyan-800 text-white shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium flex items-center space-x-2">
                  <Wallet className="w-4 h-4 text-cyan-400" />
                  <span>Your Balance</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-cyan-300">{vaultData.userBalance} USDT</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="deposits">
        <Card className="bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 text-white shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ArrowDown className="w-6 h-6 text-green-400" />
              <span>Deposit History</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">Deposit history will be displayed here.</p>
          </CardContent>
        </Card>
        </TabsContent>
        <TabsContent value="withdrawals">
          <Card className="bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 text-white shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
              <ArrowUp className="w-6 h-6 text-red-400" />
                <span>Withdrawal History</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">Withdrawal history will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </div>
    </div>
  )
}
