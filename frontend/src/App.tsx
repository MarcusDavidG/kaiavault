import React, { useState } from 'react'
import { WagmiConfig, useAccount, useConnect, useDisconnect, useContractRead, useContractWrite } from 'wagmi'
import { config } from './wagmi'
import { USDTVaultABI } from './abi'

function VaultDashboard() {
  const [depositAmount, setDepositAmount] = useState('')
  const { isConnected, address } = useAccount()

  const contractAddress = '0x...' // Placeholder for deployed contract address

  const { data: userBalance } = useContractRead({
    address: contractAddress,
    abi: USDTVaultABI,
    functionName: 'getBalance',
    args: [address!],
    watch: !!address,
  })

  const { data: tvl } = useContractRead({
    address: contractAddress,
    abi: USDTVaultABI,
    functionName: 'totalDeposits',
  })

  const { writeContract: deposit } = useContractWrite()
  const { writeContract: withdraw } = useContractWrite()

  const handleDeposit = () => {
    if (depositAmount) {
      deposit({
        address: contractAddress,
        abi: USDTVaultABI,
        functionName: 'deposit',
        args: [BigInt(depositAmount)],
      })
    }
  }

  const handleWithdraw = () => {
    if (depositAmount) {
      withdraw({
        address: contractAddress,
        abi: USDTVaultABI,
        functionName: 'withdraw',
        args: [BigInt(depositAmount)],
      })
    }
  }

  return (
    <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Vault Dashboard</h2>
      <div className="mb-4">
        <label htmlFor="depositAmount" className="block mb-1">
          Amount (USDT)
        </label>
        <input
          id="depositAmount"
          type="number"
          min="0"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
      </div>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={handleDeposit}
          className="flex-1 bg-green-600 hover:bg-green-700 py-2 rounded"
        >
          Deposit
        </button>
        <button
          onClick={handleWithdraw}
          className="flex-1 bg-red-600 hover:bg-red-700 py-2 rounded"
        >
          Withdraw
        </button>
      </div>
      <div>
        <p>
          User Vault Balance:{' '}
          <span className="font-mono">
            {isConnected ? (userBalance ? userBalance.toString() : '...') : '0'} USDT
          </span>
        </p>
        <p>
          Total Value Locked (TVL):{' '}
          <span className="font-mono">
            {isConnected ? (tvl ? tvl.toString() : '...') : '0'} USDT
          </span>
        </p>
      </div>
    </div>
  )
}

function App() {
  const { isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  return (
    <WagmiConfig config={config}>
      <div className="min-h-screen bg-gray-900 text-white p-4">
        <nav className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Kaiavault</h1>
          {isConnected ? (
            <button
              onClick={() => disconnect()}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
            >
              Disconnect Wallet
            </button>
          ) : (
            connectors.map((connector) => (
              <button
                disabled={!connector.ready}
                key={connector.id}
                onClick={() => connect({ connector })}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
              >
                Connect {connector.name}
                {!connector.ready && ' (unsupported)'}
              </button>
            ))
          )}
        </nav>
        <main>
          <VaultDashboard />
        </main>
      </div>
    </WagmiConfig>
  )
}

export default App
