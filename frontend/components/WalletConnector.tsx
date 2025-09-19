'use client'

import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { useDappPortal } from '../hooks/useDappPortal'
import { useWallet } from '../hooks/useWallet'
import { Wallet } from 'lucide-react'

function shortenAddress(address: string) {
  return address.slice(0, 6) + '...' + address.slice(-4)
}

export default function WalletConnector() {
  const { connect, disconnect, isConnected, address, balance, status, error } = useWallet()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (status === 'loading') {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [status])

  return (
    <Card className="max-w-sm mx-auto p-6 bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 text-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-6 flex items-center space-x-2">
        <Wallet className="w-6 h-6 text-cyan-400" />
        <span>Wallet Connector</span>
      </h2>
      {isConnected ? (
        <div className="space-y-3">
          <p>
            Connected: <span className="font-mono bg-cyan-900 px-2 py-1 rounded">{shortenAddress(address || '')}</span>
          </p>
          <p>Balance: <span className="font-semibold text-cyan-300">{balance ?? '0'} USDT</span></p>
          <Button variant="destructive" onClick={disconnect} disabled={loading} className="w-full">
            {loading ? 'Disconnecting...' : 'Disconnect Wallet'}
          </Button>
        </div>
      ) : (
        <div>
          <Button onClick={connect} disabled={loading} className="w-full bg-cyan-600 hover:bg-cyan-700">
            {loading ? 'Connecting...' : 'Connect Wallet'}
          </Button>
          {error && <p className="text-red-400 mt-2">{error}</p>}
        </div>
      )}
    </Card>
  )
}
