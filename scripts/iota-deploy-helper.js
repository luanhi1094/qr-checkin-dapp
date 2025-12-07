#!/usr/bin/env node

/**
 * Quick Iota Deployment Helper Script
 * Usage: node scripts/iota-deploy-helper.js
 */

import fs from 'fs';
import path from 'path';

const ENV_FILE = '.env.local';
const ENV_EXAMPLE = '.env.example';

function printDeploymentSteps() {
  console.log('\n🚀 QR Check-in DApp - Iota Deployment Guide\n');
  console.log('═════════════════════════════════════════════\n');

  console.log('📋 STEP 1: Verify Iota CLI');
  console.log('   Run: iota --version\n');

  console.log('📋 STEP 2: Setup Wallet');
  console.log('   Commands:');
  console.log('   - List wallets: iota client addresses');
  console.log('   - Active address: iota client active-address');
  console.log('   - Switch to testnet: iota client switch --env testnet\n');

  console.log('📋 STEP 3: Get Testnet Tokens');
  console.log('   Run: iota client faucet');
  console.log('   Or visit: https://faucet.testnet.iota.cafe/\n');

  console.log('📋 STEP 4: Deploy Contract');
  console.log('   Commands:');
  console.log('   1. cd contracts');
  console.log('   2. iota client publish --gas-budget 100000000\n');

  console.log('📋 STEP 5: Update Environment');
  console.log('   After deployment, you\'ll get output like:');
  console.log('   Published Objects:');
  console.log('     - ID: 0x... ← Copy this as NEXT_PUBLIC_IOTA_CONTRACT_ID');
  console.log('     - ID: 0x... ← Copy this as NEXT_PUBLIC_REGISTRY_OBJECT_ID\n');

  console.log('   Update .env.local with these values\n');

  console.log('📋 STEP 6: Restart Dev Server');
  console.log('   Run: npm run dev\n');

  console.log('═════════════════════════════════════════════\n');

  // Check if .env.local exists
  if (fs.existsSync(ENV_FILE)) {
    console.log('✅ .env.local exists');
    const content = fs.readFileSync(ENV_FILE, 'utf-8');
    if (content.includes('0x0')) {
      console.log('⚠️  But contract IDs are still 0x0 (placeholder)');
      console.log('    Update with real contract IDs after deployment\n');
    } else {
      console.log('✅ Contract IDs appear to be set\n');
    }
  } else {
    console.log('⚠️  .env.local not found');
    console.log('   Creating from .env.example...\n');
    if (fs.existsSync(ENV_EXAMPLE)) {
      fs.copyFileSync(ENV_EXAMPLE, ENV_FILE);
      console.log('✅ Created .env.local\n');
    }
  }

  console.log('💡 Tips:');
  console.log('   - Keep your wallet address safe');
  console.log('   - Don\'t share private keys');
  console.log('   - Save contract IDs for later reference');
  console.log('   - Test on testnet before mainnet\n');
}

printDeploymentSteps();
