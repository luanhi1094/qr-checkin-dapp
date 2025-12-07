'use client';

import React, { useState } from 'react';
import { useCurrentAccount, useWallets, useConnectWallet } from '@iota/dapp-kit';

export function IotaConnectButton() {
  const currentAccount = useCurrentAccount();
  const wallets = useWallets();
  const { mutate: connectWallet } = useConnectWallet();
  const [isOpen, setIsOpen] = useState(false);

  const handleConnect = (wallet: any) => {
    connectWallet({ wallet });
    setIsOpen(false);
  };

  if (currentAccount) {
    return (
      <div className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium">
        ✓ {currentAccount.address.slice(0, 6)}...{currentAccount.address.slice(-4)}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium"
      >
        Kết nối Ví
      </button>
      
      {isOpen && wallets.length > 0 && (
        <div className="absolute top-full right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
          {wallets.map(wallet => (
            <button
              key={wallet.name}
              onClick={() => handleConnect(wallet)}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-800 first:rounded-t-lg last:rounded-b-lg"
            >
              {wallet.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
