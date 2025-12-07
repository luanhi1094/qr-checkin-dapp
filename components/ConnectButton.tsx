'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';

export function ConnectButton() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected && address) {
    return (
      <button
        onClick={() => disconnect()}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium"
      >
        ✓ {address.slice(0, 6)}...{address.slice(-4)}
      </button>
    );
  }

  const metaMaskConnector = connectors.find((c) => c.id === 'metaMask');

  return (
    <button
      onClick={() => {
        if (metaMaskConnector) {
          connect({ connector: metaMaskConnector });
        }
      }}
      disabled={isPending}
      className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-400 transition font-medium"
    >
      {isPending ? '⏳ Connecting...' : '🦊 Connect MetaMask'}
    </button>
  );
}
