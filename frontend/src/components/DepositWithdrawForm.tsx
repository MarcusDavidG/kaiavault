import { useState } from 'react'
import { useAccount, useWriteContract } from 'wagmi'
import { VAULT_CONTRACT_ADDRESS, USDTVaultABI } from '../abi'

export function DepositWithdrawForm() {
  const [depositAmount, setDepositAmount] = useState('')
  const { address, chain } = useAccount()
  const { writeContract, isPending, error } = useWriteContract()

  const handleDeposit = () => {
    if (depositAmount) {
      writeContract({
        address: VAULT_CONTRACT_ADDRESS,
        abi: USDTVaultABI,
        functionName: 'deposit',
        args: [BigInt(depositAmount)],
        account: address,
        chain: chain,
      })
    }
  }

  const handleWithdraw = () => {
    if (depositAmount) {
      writeContract({
        address: VAULT_CONTRACT_ADDRESS,
        abi: USDTVaultABI,
        functionName: 'withdraw',
        args: [BigInt(depositAmount)],
        account: address,
        chain: chain,
      })
    }
  }

  return (
    <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-white">Deposit/Withdraw</h2>
      <div className="mb-4">
        <label htmlFor="depositAmount" className="block mb-1 text-white">
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
          className="flex-1 bg-green-600 hover:bg-green-700 py-2 rounded text-white disabled:opacity-50"
          disabled={isPending}
        >
          {isPending ? 'Depositing...' : 'Deposit'}
        </button>
        <button
          onClick={handleWithdraw}
          className="flex-1 bg-red-600 hover:bg-red-700 py-2 rounded text-white disabled:opacity-50"
          disabled={isPending}
        >
          {isPending ? 'Withdrawing...' : 'Withdraw'}
        </button>
      </div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error.message}</span>
        </div>
      )}
    </div>
  )
}

export default DepositWithdrawForm
