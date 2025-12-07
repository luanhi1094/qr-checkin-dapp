'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Web3 providers to avoid SSR issues
const Web3Providers = dynamic(() => import('./web3-providers'), { ssr: false });

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Web3Providers>
      {children}
    </Web3Providers>
  );
}
