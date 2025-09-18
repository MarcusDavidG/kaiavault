"use client";

import { useReadContract } from "wagmi";
import { formatUnits } from "viem";
import { useDappPortal } from "@/hooks/useDappPortal";
import { usdtVaultContractAddress } from "@/lib/contracts";
import USDTVaultJson from "@/abi/USDTVault.json";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Helper component for each metric card
function MetricCard({ title, value, isLoading, unit = "" }: { title: string; value: string; isLoading: boolean; unit?: string }) {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-gray-400">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-8 w-3/4 bg-gray-700 animate-pulse rounded-md"></div>
        ) : (
          <p className="text-3xl font-bold">{value} <span className="text-lg font-medium text-gray-300">{unit}</span></p>
        )}
      </CardContent>
    </Card>
  );
}

export function VaultDashboard() {
  const { account } = useDappPortal();

  // Assume KUSDT has 6 decimals, which is standard for USDT
  const KUSDT_DECIMALS = 6;

  const { data: userBalance, isLoading: isUserBalanceLoading } = useReadContract({
    address: usdtVaultContractAddress,
    abi: USDTVaultJson.abi,
    functionName: "getBalance",
    args: [account!],
    query: {
      enabled: !!account, // Only run query if account is available
    },
  });

  const { data: tvl, isLoading: isTvlLoading } = useReadContract({
    address: usdtVaultContractAddress,
    abi: USDTVaultJson.abi,
    functionName: "totalVaultBalance",
  });

  const formattedUserBalance = userBalance ? formatUnits(userBalance, KUSDT_DECIMALS) : "0.00";
  const formattedTvl = tvl ? formatUnits(tvl, KUSDT_DECIMALS) : "0.00";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <MetricCard 
        title="Total Value Locked" 
        value={`${parseFloat(formattedTvl).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} 
        isLoading={isTvlLoading} 
      />
      <MetricCard 
        title="Your Deposit" 
        value={parseFloat(formattedUserBalance).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        isLoading={isUserBalanceLoading} 
        unit="KUSDT"
      />
      {/* Mock data for APY and Rewards as they are not in the ABI */}
      <MetricCard 
        title="Estimated APY" 
        value="5.25%" 
        isLoading={false} 
      />
      <MetricCard 
        title="Claimable Rewards" 
        value="0.00" 
        isLoading={false} 
        unit="KUSDT"
      />
    </div>
  );
}
