#!/usr/bin/env node

/**
 * Iota Move Contract Deployment Script
 * Deploy checkin_registry.move to Iota testnet
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const TESTNET_RPC = 'https://api.testnet.iota.cafe';
const CONTRACT_DIR = path.join(process.cwd(), 'contracts');
const MOVE_PACKAGE = path.join(CONTRACT_DIR, 'Move.toml');

async function deploy() {
  try {
    console.log('🚀 Iota Move Contract Deployment');
    console.log('==================================\n');

    // Check if Move.toml exists
    if (!fs.existsSync(MOVE_PACKAGE)) {
      throw new Error(`Move.toml not found at ${MOVE_PACKAGE}`);
    }

    console.log('✓ Move.toml found');
    console.log(`📦 Contract directory: ${CONTRACT_DIR}`);
    console.log(`🌐 Network: Iota Testnet (${TESTNET_RPC})\n`);

    console.log('ℹ️  Note: To deploy this contract, you need:');
    console.log('   1. Iota CLI tools installed');
    console.log('   2. A wallet with IOTA tokens on testnet');
    console.log('   3. Run: iota client publish --gas-budget 100000000\n');

    console.log('📋 Manual Deployment Steps:');
    console.log('   1. Install Iota CLI from: https://docs.iota.org/');
    console.log('   2. Switch to testnet: iota client switch --env testnet');
    console.log('   3. Navigate to contracts folder: cd contracts');
    console.log('   4. Deploy: iota client publish --gas-budget 100000000');
    console.log('   5. Copy the Package ID from output');
    console.log('   6. Update .env.local with NEXT_PUBLIC_IOTA_CONTRACT_ID\n');

    console.log('Alternative: Use Iota Testnet Faucet');
    console.log('   https://faucet.testnet.iota.cafe/\n');

  } catch (error) {
    console.error('❌ Deployment Error:', error);
    process.exit(1);
  }
}

deploy();
