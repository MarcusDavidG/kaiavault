/*
  DEV NOTE: Testing LINE Mini Dapp Flow
  - To test the `isInsideLineMiniDapp()` logic, you need to simulate the LINE Mini Dapp environment.
  - Use the LINE Mini Dapp emulator or register your dappId with LINE to get a test environment.
  - When running in the emulator, the user agent will contain "Line" and `isInsideLineMiniDapp` will return true.
  - The `requestTransaction` calls will then be routed through the LINE SDK proxy.
  - For local development, you can temporarily force `isInsideLineMiniDapp` to return true to test the UI flow,
    but actual transaction signing requires the emulator or a registered Mini Dapp.
*/
"use client";

import { useState, useEffect } from "react";
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseUnits, formatUnits, maxUint256, encodeFunctionData } from "viem";
import { useDappPortal } from "@/hooks/useDappPortal";
import { usdtContractAddress, usdtVaultContractAddress } from "@/lib/contracts";
import { isInsideLineMiniDapp, requestTransaction } from "@/lib/lineMiniDapp";
import KUSDTJson from "@/abi/KUSDT.json";
import USDTVaultJson from "@/abi/USDTVault.json";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const KUSDT_DECIMALS = 6;

function DepositTab() {
  const { account } = useDappPortal();
  const [amount, setAmount] = useState("");
  const [isLine, setIsLine] = useState(false);
  const [lineTxState, setLineTxState] = useState<{ loading: boolean; error: string | null; success: string | null }>({ loading: false, error: null, success: null });

  useEffect(() => {
    setIsLine(isInsideLineMiniDapp());
  }, []);

  const { data: balance, refetch: refetchBalance } = useReadContract({
    address: usdtContractAddress,
    abi: KUSDTJson.abi,
    functionName: "balanceOf",
    args: [account!],
    query: { enabled: !!account },
  });

  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: usdtContractAddress,
    abi: KUSDTJson.abi,
    functionName: "allowance",
    args: [account!, usdtVaultContractAddress],
    query: { enabled: !!account },
  });

  const { data: approveHash, writeContract: approve, isPending: isApprovingWagmi } = useWriteContract();
  const { data: depositHash, writeContract: deposit, isPending: isDepositingWagmi } = useWriteContract();

  const { isSuccess: isApproved } = useWaitForTransactionReceipt({ hash: approveHash });
  const { isSuccess: isDeposited, isError: isDepositError } = useWaitForTransactionReceipt({ hash: depositHash });

  const needsApproval = !allowance || (amount && allowance < parseUnits(amount, KUSDT_DECIMALS));
  const amountInUnits = amount ? parseUnits(amount, KUSDT_DECIMALS) : 0n;

  const handleApprove = async () => {
    setLineTxState({ loading: true, error: null, success: null });
    if (isLine) {
      try {
        const approveData = encodeFunctionData({
          abi: KUSDTJson.abi,
          functionName: "approve",
          args: [usdtVaultContractAddress, maxUint256],
        });
        const result = await requestTransaction({ to: usdtContractAddress, data: approveData });
        setLineTxState({ loading: false, error: null, success: `Approval successful: ${result.txHash}` });
        refetchAllowance();
      } catch (e: any) {
        setLineTxState({ loading: false, error: e.message || "Transaction rejected.", success: null });
      }
    } else {
      approve({ address: usdtContractAddress, abi: KUSDTJson.abi, functionName: "approve", args: [usdtVaultContractAddress, maxUint256] });
    }
  };

  const handleDeposit = async () => {
    setLineTxState({ loading: true, error: null, success: null });
    if (isLine) {
      try {
        const depositData = encodeFunctionData({
          abi: USDTVaultJson.abi,
          functionName: "deposit",
          args: [amountInUnits],
        });
        const result = await requestTransaction({ to: usdtVaultContractAddress, data: depositData });
        setLineTxState({ loading: false, error: null, success: `Deposit successful: ${result.txHash}` });
        setAmount("");
        refetchBalance();
        // Also refetch vault balance if displayed elsewhere
      } catch (e: any) {
        setLineTxState({ loading: false, error: e.message || "Transaction rejected.", success: null });
      }
    } else {
      deposit({ address: usdtVaultContractAddress, abi: USDTVaultJson.abi, functionName: "deposit", args: [amountInUnits] });
    }
  };

  if (isApproved) refetchAllowance();
  if (isDeposited) {
    setAmount("");
    refetchBalance();
  }

  const isPending = isApprovingWagmi || isDepositingWagmi || lineTxState.loading;

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm">
        <span>Your KUSDT Balance</span>
        <span>{balance ? formatUnits(balance, KUSDT_DECIMALS) : "0.00"}</span>
      </div>
      <Input
        type="number"
        placeholder="0.00"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="bg-gray-800 border-gray-600"
        disabled={isPending}
      />
      {needsApproval ? (
        <Button onClick={handleApprove} disabled={isPending} className="w-full bg-blue-600 hover:bg-blue-700">
          {isPending ? "Approving..." : "Approve KUSDT"}
        </Button>
      ) : (
        <Button onClick={handleDeposit} disabled={isPending || !amount} className="w-full bg-green-600 hover:bg-green-700">
          {isPending ? "Depositing..." : "Deposit"}
        </Button>
      )}
      {lineTxState.error && <p className="text-red-500 text-sm mt-2">{lineTxState.error}</p>}
      {isDepositError && <p className="text-red-500 text-sm mt-2">Deposit failed. Please check your balance.</p>}
      {lineTxState.success && <p className="text-green-500 text-sm mt-2 break-all">{lineTxState.success}</p>}
    </div>
  );
}

function WithdrawTab() {
  const { account } = useDappPortal();
  const [amount, setAmount] = useState("");
  const [isLine, setIsLine] = useState(false);
  const [lineTxState, setLineTxState] = useState<{ loading: boolean; error: string | null; success: string | null }>({ loading: false, error: null, success: null });

  useEffect(() => {
    setIsLine(isInsideLineMiniDapp());
  }, []);

  const { data: balance, refetch: refetchVaultBalance } = useReadContract({
    address: usdtVaultContractAddress,
    abi: USDTVaultJson.abi,
    functionName: "getBalance",
    args: [account!],
    query: { enabled: !!account },
  });

  const { writeContract: withdraw, isPending: isWithdrawingWagmi, data: withdrawHash } = useWriteContract();
  const { isSuccess: isWithdrawn, isError: isWithdrawError } = useWaitForTransactionReceipt({ hash: withdrawHash });

  const amountInUnits = amount ? parseUnits(amount, KUSDT_DECIMALS) : 0n;

  const handleWithdraw = async () => {
    setLineTxState({ loading: true, error: null, success: null });
    if (isLine) {
      try {
        const withdrawData = encodeFunctionData({
          abi: USDTVaultJson.abi,
          functionName: "withdraw",
          args: [amountInUnits],
        });
        const result = await requestTransaction({ to: usdtVaultContractAddress, data: withdrawData });
        setLineTxState({ loading: false, error: null, success: `Withdrawal successful: ${result.txHash}` });
        setAmount("");
        refetchVaultBalance();
      } catch (e: any) {
        setLineTxState({ loading: false, error: e.message || "Transaction rejected.", success: null });
      }
    } else {
      withdraw({ address: usdtVaultContractAddress, abi: USDTVaultJson.abi, functionName: "withdraw", args: [amountInUnits] });
    }
  };

  if (isWithdrawn) {
    setAmount("");
    refetchVaultBalance();
  }

  const isPending = isWithdrawingWagmi || lineTxState.loading;

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm">
        <span>Your Deposited Balance</span>
        <span>{balance ? formatUnits(balance, KUSDT_DECIMALS) : "0.00"} KUSDT</span>
      </div>
      <Input
        type="number"
        placeholder="0.00"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="bg-gray-800 border-gray-600"
        disabled={isPending}
      />
      <Button onClick={handleWithdraw} disabled={isPending || !amount} className="w-full">
        {isPending ? "Withdrawing..." : "Withdraw"}
      </Button>
      {lineTxState.error && <p className="text-red-500 text-sm mt-2">{lineTxState.error}</p>}
      {isWithdrawError && <p className="text-red-500 text-sm mt-2">Withdrawal failed. Check amount and balance.</p>}
      {lineTxState.success && <p className="text-green-500 text-sm mt-2 break-all">{lineTxState.success}</p>}
    </div>
  );
}

export function DepositWithdrawForm() {
  return (
    <Card className="bg-gray-800 border-gray-700 text-white">
      <CardHeader>
        <CardTitle>Actions</CardTitle>
        <CardDescription>Deposit KUSDT to earn yield or withdraw your principal.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="deposit" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-700">
            <TabsTrigger value="deposit">Deposit</TabsTrigger>
            <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
          </TabsList>
          <TabsContent value="deposit" className="mt-4">
            <DepositTab />
          </TabsContent>
          <TabsContent value="withdraw" className="mt-4">
            <WithdrawTab />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
