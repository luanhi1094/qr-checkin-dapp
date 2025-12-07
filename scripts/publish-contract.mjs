#!/usr/bin/env node

/**
 * Iota Move Contract Publisher
 * Helper to publish Move contract to Iota testnet
 * 
 * Note: This is a guide - actual deployment requires Iota CLI
 */

import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, '..');
const CONTRACTS_DIR = path.join(ROOT_DIR, 'contracts');
const MOVE_TOML = path.join(CONTRACTS_DIR, 'Move.toml');
const CHECKIN_MOVE = path.join(CONTRACTS_DIR, 'checkin_registry.move');

console.clear();
console.log(chalk.cyan.bold('\n🚀 Iota Move Contract Publisher\n'));

// Validate contract files
const files = [
  { path: MOVE_TOML, name: 'Move.toml' },
  { path: CHECKIN_MOVE, name: 'checkin_registry.move' }
];

console.log(chalk.yellow('📋 Checking contract files...\n'));

let allValid = true;
for (const file of files) {
  if (fs.existsSync(file.path)) {
    console.log(chalk.green(`✅ ${file.name}`));
  } else {
    console.log(chalk.red(`❌ ${file.name} - NOT FOUND`));
    allValid = false;
  }
}

if (!allValid) {
  console.log(chalk.red('\n❌ Some files are missing!\n'));
  process.exit(1);
}

console.log(chalk.green('\n✅ All contract files found!\n'));

// Display deployment guide
console.log(chalk.cyan.bold('═══════════════════════════════════════════════════\n'));
console.log(chalk.yellow('📖 STEP-BY-STEP DEPLOYMENT GUIDE\n'));

const steps = [
  {
    num: 1,
    title: 'Check Iota CLI Installation',
    commands: ['iota --version']
  },
  {
    num: 2,
    title: 'Switch to Testnet',
    commands: ['iota client switch --env testnet']
  },
  {
    num: 3,
    title: 'Check Active Wallet',
    commands: ['iota client active-address']
  },
  {
    num: 4,
    title: 'Get Testnet Tokens',
    commands: [
      'iota client faucet',
      'OR visit: https://faucet.testnet.iota.cafe/'
    ]
  },
  {
    num: 5,
    title: 'Navigate to Contract Directory',
    commands: [`cd "${CONTRACTS_DIR}"`]
  },
  {
    num: 6,
    title: 'Publish Contract',
    commands: ['iota client publish --gas-budget 100000000']
  },
  {
    num: 7,
    title: 'Save Contract IDs',
    commands: [
      'Copy Package ID → NEXT_PUBLIC_IOTA_CONTRACT_ID',
      'Copy Registry Object ID → NEXT_PUBLIC_REGISTRY_OBJECT_ID'
    ]
  }
];

for (const step of steps) {
  console.log(chalk.cyan(`\n📌 Step ${step.num}: ${step.title}`));
  for (const cmd of step.commands) {
    if (cmd.startsWith('OR') || cmd.includes('→') || cmd.includes('Copy')) {
      console.log(chalk.gray(`   ${cmd}`));
    } else if (cmd.includes('://')) {
      console.log(chalk.blue(`   ${cmd}`));
    } else {
      console.log(chalk.white.bold(`   $ ${cmd}`));
    }
  }
}

console.log(chalk.cyan.bold('\n═══════════════════════════════════════════════════\n'));

console.log(chalk.green('💡 Important Tips:\n'));
console.log(chalk.white('  1. Make sure you have enough IOTA testnet tokens'));
console.log(chalk.white('  2. Keep your wallet address and private key safe'));
console.log(chalk.white('  3. Save the contract IDs for future reference'));
console.log(chalk.white('  4. Update .env.local with the contract IDs'));
console.log(chalk.white('  5. Restart dev server after updating .env\n'));

console.log(chalk.cyan('Contract Details:'));
console.log(chalk.white(`  📁 Location: ${CONTRACTS_DIR}`));
console.log(chalk.white(`  📄 Move Package: Move.toml`));
console.log(chalk.white(`  📜 Contract Source: checkin_registry.move\n`));

console.log(chalk.yellow('⚠️  Next Steps:'));
console.log(chalk.white('  1. Install Iota CLI if not already done'));
console.log(chalk.white('  2. Complete steps 1-7 above'));
console.log(chalk.white('  3. Update .env.local with contract IDs'));
console.log(chalk.white('  4. Run: npm run dev\n'));

console.log(chalk.green('Ready to deploy? Follow the steps above! 🚀\n'));
