import WalletConnector from "./components/WalletConnector";
import VaultDashboard from "./components/VaultDashboard";
import DepositWithdrawForm from "./components/DepositWithdrawForm";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-6">Kaiavault</h1>
      <WalletConnector />
      <VaultDashboard />
      <DepositWithdrawForm />
    </div>
  );
}
export default App;