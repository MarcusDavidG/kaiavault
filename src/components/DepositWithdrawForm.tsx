"use client";

import { useState } from "react";
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseUnits, formatUnits, maxUint256 } from "viem";
import { useDappPortal } from "@/hooks/useDappPortal";
import { usdtContractAddress, usdtVaultContractAddress } from "@/lib/contracts";
import { abi as KUSDTAbi } from "@/abi/KUSDT.json";
import { abi as USDTVaultAbi } from "@/abi/USDTVault.json";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Assume KUSDT has 6 decimals
const KUSDT_DECIMALS = 6;

function DepositTab() {
  const { account } = useDappPortal();
  const [amount, setAmount] = useState("");

  const { data: balance } = useReadContract({
    address: usdtContractAddress,
    abi: KUSDTAbi,
    functionName: "balanceOf",
    args: [account!],
    query: { enabled: !!account },
  });

  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: usdtContractAddress,
    abi: KUSDTAbi,
    functionName: "allowance",
    args: [account!, usdtVaultContractAddress],
    query: { enabled: !!account },
  });

  const { data: approveHash, writeContract: approve, isPending: isApproving } = useWriteContract();
  const { data: depositHash, writeContract: deposit, isPending: isDepositing } = useWriteContract();

  const { isSuccess: isApproved } = useWaitForTransactionReceipt({ hash: approveHash });
  const { isSuccess: isDeposited } = useWaitForTransactionReceipt({ hash: depositHash });

  const needsApproval = !allowance || (amount && allowance < parseUnits(amount, KUSDT_DECIMALS));

  const handleApprove = () => {
    approve({ address: usdtContractAddress, abi: KUSDTAbi, functionName: "approve", args: [usdtVaultContractAddress, maxUint256] });
  };

  const handleDeposit = () => {
    deposit({ address: usdtVaultContractAddress, abi: USDTVaultAbi, functionName: "deposit", args: [parseUnits(amount, KUSDT_DECIMALS)] });
  };

  if (isApproved) refetchAllowance();
  if (isDeposited) setAmount(""); // Reset amount after successful deposit

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
      />
      {needsApproval ? (
        <Button onClick={handleApprove} disabled={isApproving} className="w-full bg-blue-600 hover:bg-blue-700">
          {isApproving ? "Approving..." : "Approve KUSDT"}
        </Button>
      ) : (
        <Button onClick={handleDeposit} disabled={isDepositing || !amount} className="w-full bg-green-600 hover:bg-green-700">
          {isDepositing ? "Depositing..." : "Deposit"}
        </Button>
      )}
    </div>
  );
}

function WithdrawTab() {
  const { account } = useDappPortal();
  const [amount, setAmount] = useState("");

  const { data: balance } = useReadContract({
    address: usdtVaultContractAddress,
    abi: USDTVaultAbi,
    functionName: "getBalance",
    args: [account!],
    query: { enabled: !!account },
  });

  const { writeContract: withdraw, isPending: isWithdrawing } = useWriteContract();

  const handleWithdraw = () => {
    withdraw({ address: usdtVaultContractAddress, abi: USDTVaultAbi, functionName: "withdraw", args: [parseUnits(amount, KUSDT_DECIMALS)] });
  };

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
      />
      <Button onClick={handleWithdraw} disabled={isWithdrawing || !amount} className="w-full">
        {isWithdrawing ? "Withdrawing..." : "Withdraw"}
      </Button>
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
