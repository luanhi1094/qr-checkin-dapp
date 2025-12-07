'use client';

import React from 'react';
import { IotaClientProvider, WalletProvider } from '@iota/dapp-kit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function Web3Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <IotaClientProvider 
        networks={{ 
          testnet: { url: 'https://testnet.iota.cafe/api' }
        }} 
        defaultNetwork="testnet"
        preferredWallets={['Iota Wallet', 'Firefly']}
      >
        <WalletProvider>
          {children}
        </WalletProvider>
      </IotaClientProvider>
    </QueryClientProvider>
  );
}
