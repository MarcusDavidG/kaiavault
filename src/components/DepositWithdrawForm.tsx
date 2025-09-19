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
import { parseUnits, formatUnits, maxUint256, encodeFunctionData } from "viem";
import { useWallet } from "@/hooks/useWallet";
import { usdtContractAddress, usdtVaultContractAddress } from "@/lib/contracts";
import { requestTransaction } from "@/lib/dapp-portal";
import KUSDTJson from "@/abi/KUSDT.json";
import USDTVaultJson from "@/abi/USDTVault.json";
import toast from 'react-hot-toast';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const KUSDT_DECIMALS = 6;

function DepositTab() {
  const { account } = useWallet();
  const [amount, setAmount] = useState("");
  const [lineTxState, setLineTxState] = useState<{ loading: boolean; error: string | null; success: string | null }>({ loading: false, error: null, success: null });

  const [balance, setBalance] = useState<bigint | null>(null);
  const [allowance, setAllowance] = useState<bigint | null>(null);

  useEffect(() => {
    const fetchBalanceAndAllowance = async () => {
      if (!account) return;
      try {
        const usdtContract = await import("@/lib/contracts").then(mod => mod.getUSDTContract());
        const bal = await usdtContract.balanceOf(account);
        const allow = await usdtContract.allowance(account, usdtVaultContractAddress);
        setBalance(bal);
        setAllowance(allow);
      } catch (e) {
        console.error("Failed to fetch balance or allowance", e);
      }
    };
    fetchBalanceAndAllowance();
  }, [account, lineTxState.success]);

  const needsApproval = !allowance || (amount && allowance < parseUnits(amount, KUSDT_DECIMALS));
  const amountInUnits = amount ? parseUnits(amount, KUSDT_DECIMALS) : BigInt(0);

  const handleApprove = async () => {
    setLineTxState({ loading: true, error: null, success: null });
    try {
      const approveData = encodeFunctionData({
        abi: KUSDTJson.abi,
        functionName: "approve",
        args: [usdtVaultContractAddress, maxUint256],
      });
      const result = await requestTransaction({ to: usdtContractAddress, data: approveData });
      setLineTxState({ loading: false, error: null, success: `Approval successful: ${result.txHash}` });
      toast.success('Approval successful!');
      // Refresh allowance
      const usdtContract = await import("@/lib/contracts").then(mod => mod.getUSDTContract());
      const allow = await usdtContract.allowance(account!, usdtVaultContractAddress);
      setAllowance(allow);
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : "Transaction rejected.";
      setLineTxState({ loading: false, error: errorMessage, success: null });
      toast.error(`Approval failed: ${errorMessage}`);
    }
  };

  const handleDeposit = async () => {
    setLineTxState({ loading: true, error: null, success: null });
    try {
      const depositData = encodeFunctionData({
        abi: USDTVaultJson.abi,
        functionName: "deposit",
        args: [amountInUnits],
      });
      const result = await requestTransaction({ to: usdtVaultContractAddress, data: depositData });
      setLineTxState({ loading: false, error: null, success: `Deposit successful: ${result.txHash}` });
      toast.success('Deposit successful!');
      setAmount("");
      // Refresh balance
      const usdtContract = await import("@/lib/contracts").then(mod => mod.getUSDTContract());
      const bal = await usdtContract.balanceOf(account!);
      setBalance(bal);
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : "Transaction rejected.";
      setLineTxState({ loading: false, error: errorMessage, success: null });
      toast.error(`Deposit failed: ${errorMessage}`);
    }
  };

  const isPending = lineTxState.loading;

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
      {lineTxState.success && <p className="text-green-500 text-sm mt-2 break-all">{lineTxState.success}</p>}
    </div>
  );
}

function WithdrawTab() {
  const { account } = useWallet();
  const [amount, setAmount] = useState("");
  const [lineTxState, setLineTxState] = useState<{ loading: boolean; error: string | null; success: string | null }>({ loading: false, error: null, success: null });

  const [balance, setBalance] = useState<bigint | null>(null);

  useEffect(() => {
    const fetchVaultBalance = async () => {
      if (!account) return;
      try {
        const vaultContract = await import("@/lib/contracts").then(mod => mod.getUSDTVaultContract());
        const bal = await vaultContract.getBalance(account);
        setBalance(bal);
      } catch (e) {
        console.error("Failed to fetch vault balance", e);
      }
    };
    fetchVaultBalance();
  }, [account, lineTxState.success]);

  const amountInUnits = amount ? parseUnits(amount, KUSDT_DECIMALS) : BigInt(0);

  const handleWithdraw = async () => {
    setLineTxState({ loading: true, error: null, success: null });
    try {
      const withdrawData = encodeFunctionData({
        abi: USDTVaultJson.abi,
        functionName: "withdraw",
        args: [amountInUnits],
      });
      const result = await requestTransaction({ to: usdtVaultContractAddress, data: withdrawData });
      setLineTxState({ loading: false, error: null, success: `Withdrawal successful: ${result.txHash}` });
      toast.success('Withdrawal successful!');
      setAmount("");
      // Refresh vault balance
      const vaultContract = await import("@/lib/contracts").then(mod => mod.getUSDTVaultContract());
      const bal = await vaultContract.getBalance(account!);
      setBalance(bal);
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : "Transaction rejected.";
      setLineTxState({ loading: false, error: errorMessage, success: null });
      toast.error(`Withdrawal failed: ${errorMessage}`);
    }
  };

  const isPending = lineTxState.loading;

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
