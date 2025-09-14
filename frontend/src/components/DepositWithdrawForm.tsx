import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import { VAULT_CONTRACT_ADDRESS, USDTVaultABI } from '../abi';
import { isRunningInLineMiniDapp, getLineMiniDappSDK, encodeFunctionData } from '../lib/lineMiniDapp';

export function DepositWithdrawForm() {
  const [depositAmount, setDepositAmount] = useState('');
  const { address, chain } = useAccount();
  const { writeContract, isPending: isWagmiPending, error: wagmiError } = useWriteContract();

  const [isLineTxPending, setIsLineTxPending] = useState(false);
  const [lineTxError, setLineTxError] = useState<string | null>(null);

  const isInLine = isRunningInLineMiniDapp();

  const handleDeposit = async () => {
    if (!depositAmount) return;

    if (isInLine) {
      setIsLineTxPending(true);
      setLineTxError(null);
      try {
        const sdk = getLineMiniDappSDK();
        const encodedData = encodeFunctionData({
            abi: USDTVaultABI,
            functionName: 'deposit',
            args: [BigInt(depositAmount)],
          });
        const txResult = await sdk.requestTransaction({
          to: VAULT_CONTRACT_ADDRESS,
          data: encodedData,
          // value: '0x0', // Assuming no native token transfer for USDT deposit
        });
        console.log('LINE Deposit Tx Result:', txResult);
        // Handle success, e.g., show a success message or refetch balances
      } catch (err: any) {
        setLineTxError(err.message);
        console.error('LINE Deposit failed:', err);
      } finally {
        setIsLineTxPending(false);
      }
    } else {
      writeContract({
        address: VAULT_CONTRACT_ADDRESS,
        abi: USDTVaultABI,
        functionName: 'deposit',
        args: [BigInt(depositAmount)],
        account: address,
        chain: chain,
      });
    }
  };

  const handleWithdraw = async () => {
    if (!depositAmount) return;

    if (isInLine) {
      setIsLineTxPending(true);
      setLineTxError(null);
      try {
        const sdk = getLineMiniDappSDK();
        const encodedData = encodeFunctionData({
            abi: USDTVaultABI,
            functionName: 'withdraw',
            args: [BigInt(depositAmount)],
          });
        const txResult = await sdk.requestTransaction({
          to: VAULT_CONTRACT_ADDRESS,
          data: encodedData,
          // value: '0x0', // Assuming no native token transfer for USDT withdrawal
        });
        console.log('LINE Withdraw Tx Result:', txResult);
        // Handle success
      } catch (err: any) {
        setLineTxError(err.message);
        console.error('LINE Withdraw failed:', err);
      } finally {
        setIsLineTxPending(false);
      }
    } else {
      writeContract({
        address: VAULT_CONTRACT_ADDRESS,
        abi: USDTVaultABI,
        functionName: 'withdraw',
        args: [BigInt(depositAmount)],
        account: address,
        chain: chain,
      });
    }
  };

  const isPending = isInLine ? isLineTxPending : isWagmiPending;
  const error = isInLine ? lineTxError : wagmiError?.message;

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
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
    </div>
  );
}

export default DepositWithdrawForm;
