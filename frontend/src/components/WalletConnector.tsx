import { useAccount, useConnect, useDisconnect } from 'wagmi'

export function WalletConnector() {
  const { isConnected } = useAccount()
  const { connect, connectors, error } = useConnect()
  const { disconnect } = useDisconnect()

  return (
    <div className="mb-6">
      {isConnected ? (
        <button
          onClick={() => disconnect()}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
        >
          Disconnect Wallet
        </button>
      ) : (
        <div className="flex space-x-2">
          {connectors.map((connector) => (
            <button
              disabled={!connector.ready}
              key={connector.id}
              onClick={() => connect({ connector })}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white disabled:opacity-50"
            >
              Connect {connector.name}
              {!connector.ready && ' (unsupported)'}
            </button>
          ))}
        </div>
      )}
      {error && <div className="text-red-500 mt-2">{error.message}</div>}
    </div>
  )
}

export default WalletConnector
