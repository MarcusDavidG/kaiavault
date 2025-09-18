"use client";

import { useDappPortal } from "@/hooks/useDappPortal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Helper function to truncate the address
const truncateAddress = (address: string) => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export function WalletConnector() {
  const { account, isLoading, error } = useDappPortal();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Wallet Status</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && <p>Connecting to wallet...</p>}
        {error && <p className="text-red-500">Error: {error.message}</p>}
        {account && (
          <div>
            <p className="text-green-600">Connected</p>
            <p className="font-mono text-sm">{truncateAddress(account)}</p>
          </div>
        )}
        {!isLoading && !account && !error && (
          <p>Wallet not connected or not found.</p>
        )}
      </CardContent>
    </Card>
  );
}
