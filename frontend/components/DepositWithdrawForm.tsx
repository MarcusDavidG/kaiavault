'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { useWallet } from '../hooks/useWallet'
import { ArrowDown, ArrowUp, DollarSign } from 'lucide-react'

export default function DepositWithdrawForm() {
  const { isConnected } = useWallet()
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'failed'>('idle')
  const [error, setError] = useState('')

  const validateAmount = (value: string) => {
    const num = parseFloat(value)
    if (isNaN(num) || num <= 0) {
      return 'Please enter a valid positive amount'
    }
    return null
  }

  const handleDeposit = async () => {
    const validationError = validateAmount(amount)
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)
    setStatus('pending')
    setError('')

    try {
      // Placeholder for deposit transaction
      // In a real implementation, this would call the contract's deposit method
      await new Promise(resolve => setTimeout(resolve, 2000))
      setStatus('success')
      setAmount('')
    } catch (err) {
      setStatus('failed')
      setError('Deposit failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleWithdraw = async () => {
    const validationError = validateAmount(amount)
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)
    setStatus('pending')
    setError('')

    try {
      // Placeholder for withdraw transaction
      // In a real implementation, this would call the contract's withdraw method
      await new Promise(resolve => setTimeout(resolve, 2000))
      setStatus('success')
      setAmount('')
    } catch (err) {
      setStatus('failed')
      setError('Withdrawal failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!isConnected) {
    return (
      <Card className="max-w-md mx-auto bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 text-white shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="w-6 h-6 text-cyan-400" />
            <span>Deposit/Withdraw</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300">Please connect your wallet to deposit or withdraw.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-md mx-auto bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 text-white shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <DollarSign className="w-6 h-6 text-cyan-400" />
          <span>Deposit/Withdraw USDT</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium mb-2 text-gray-200">
            Amount (USDT)
          </label>
          <Input
            id="amount"
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={loading}
            className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
          />
        </div>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <div className="flex space-x-2">
          <Button
            onClick={handleDeposit}
            disabled={loading || !amount}
            className="flex-1 bg-green-600 hover:bg-green-700 flex items-center space-x-2"
          >
            <ArrowDown className="w-4 h-4" />
            <span>{loading && status === 'pending' ? 'Depositing...' : 'Deposit'}</span>
          </Button>
          <Button
            variant="outline"
            onClick={handleWithdraw}
            disabled={loading || !amount}
            className="flex-1 border-red-500 text-red-400 hover:bg-red-900 hover:text-red-300 flex items-center space-x-2"
          >
            <ArrowUp className="w-4 h-4" />
            <span>{loading && status === 'pending' ? 'Withdrawing...' : 'Withdraw'}</span>
          </Button>
        </div>
        {status === 'success' && (
          <div className="bg-green-900 border border-green-500 text-green-300 px-4 py-3 rounded flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Transaction completed successfully!</span>
          </div>
        )}
        {status === 'failed' && (
          <div className="bg-red-900 border border-red-500 text-red-300 px-4 py-3 rounded flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
            <span>Transaction failed. Please try again.</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
