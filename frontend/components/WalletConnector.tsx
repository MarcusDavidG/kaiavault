'use client'

import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { useLine } from '../lib/line-context'
import { Wallet, AlertCircle, ExternalLink } from 'lucide-react'

function shortenAddress(address: string) {
  return address.slice(0, 6) + '...' + address.slice(-4)
}

export default function WalletConnector() {
  const { connect, disconnect, isConnected, wallet } = useLine()
  const [loading, setLoading] = useState(false)
  const [lineError, setLineError] = useState(false)

  const handleConnect = async () => {
    setLoading(true)
    setLineError(false)
    try {
      await connect()
    } catch (error) {
      setLineError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="max-w-sm mx-auto p-6 bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 text-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-6 flex items-center space-x-2">
        <Wallet className="w-6 h-6 text-cyan-400" />
        <span>Wallet Connector</span>
      </h2>

      {lineError && (
        <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded-lg flex items-start space-x-2">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold text-red-300">LINE Connection Issue</p>
            <p className="text-red-200">LINE wallet connection failed. Try:</p>
            <ul className="text-red-200 mt-1 space-y-1">
              <li>• Install MetaMask or Kaikas browser extension</li>
              <li>• Use browser wallet instead</li>
            </ul>
          </div>
        </div>
      )}

      {isConnected && wallet ? (
        <div className="space-y-3">
          <p>
            Connected: <span className="font-mono bg-cyan-900 px-2 py-1 rounded">{shortenAddress(wallet.address || '')}</span>
          </p>
          <p>Balance: <span className="font-semibold text-cyan-300">{wallet.balance ?? '0'} USDT</span></p>
          <Button variant="destructive" onClick={disconnect} disabled={loading} className="w-full">
            {loading ? 'Disconnecting...' : 'Disconnect Wallet'}
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          <Button onClick={handleConnect} disabled={loading} className="w-full bg-cyan-600 hover:bg-cyan-700">
            {loading ? 'Connecting...' : 'Connect LINE Wallet'}
          </Button>

          <div className="text-center">
            <p className="text-sm text-gray-300 mb-2">Alternative Wallets:</p>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700"
                onClick={() => window.open('https://metamask.io/download/', '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                MetaMask
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700"
                onClick={() => window.open('https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi', '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                Kaikas
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}
