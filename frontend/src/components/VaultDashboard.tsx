import { useAccount, useReadContract } from 'wagmi'
import { VAULT_CONTRACT_ADDRESS, USDTVaultABI } from '../abi'

export function VaultDashboard() {
  const { isConnected, address } = useAccount()

  const { data: userBalance, isLoading: isUserBalanceLoading } = useReadContract({
    address: VAULT_CONTRACT_ADDRESS,
    abi: USDTVaultABI,
    functionName: 'getBalance',
    args: [address!],
  })

  const { data: tvl, isLoading: isTvlLoading } = useReadContract({
    address: VAULT_CONTRACT_ADDRESS,
    abi: USDTVaultABI,
    functionName: 'totalDeposits',
  })

  return (
    <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-lg text-white mb-6">
      <h2 className="text-xl font-semibold mb-4">Vault Dashboard</h2>
      <div>
        <p>
          User Vault Balance:{' '}
          <span className="font-mono">
            {isUserBalanceLoading && 'Loading...'}
            {isConnected && userBalance !== undefined ? `${userBalance.toString()} USDT` : '0 USDT'}
          </span>
        </p>
        <p>
          Total Value Locked (TVL):{' '}
          <span className="font-mono">
            {isTvlLoading && 'Loading...'}
            {isConnected && tvl !== undefined ? `${tvl.toString()} USDT` : '0 USDT'}
          </span>
        </p>
      </div>
    </div>
  )
}

export default VaultDashboard
