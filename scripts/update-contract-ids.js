#!/usr/bin/env node

/**
 * Update .env.local with Iota Contract IDs
 * Usage: node scripts/update-contract-ids.js <package-id> <registry-id>
 */

import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);

if (args.length < 2) {
  console.log('📝 Update Contract IDs Script\n');
  console.log('Usage:');
  console.log('  node scripts/update-contract-ids.js <package-id> <registry-id>\n');
  console.log('Example:');
  console.log('  node scripts/update-contract-ids.js 0x1234abc 0x5678def\n');
  process.exit(1);
}

const [packageId, registryId] = args;

// Validate format
if (!packageId.startsWith('0x') || !registryId.startsWith('0x')) {
  console.error('❌ Error: IDs must start with 0x\n');
  console.error('Example: 0x1234abc\n');
  process.exit(1);
}

const envFile = '.env.local';

try {
  // Read current .env.local
  let content = fs.readFileSync(envFile, 'utf-8');

  // Update values
  content = content.replace(
    /NEXT_PUBLIC_IOTA_CONTRACT_ID=.*/,
    `NEXT_PUBLIC_IOTA_CONTRACT_ID=${packageId}`
  );
  content = content.replace(
    /NEXT_PUBLIC_REGISTRY_OBJECT_ID=.*/,
    `NEXT_PUBLIC_REGISTRY_OBJECT_ID=${registryId}`
  );

  // Write back
  fs.writeFileSync(envFile, content);

  console.log('✅ Contract IDs updated!\n');
  console.log(`  Package ID:  ${packageId}`);
  console.log(`  Registry ID: ${registryId}\n`);
  console.log('📌 Next steps:');
  console.log('  1. Verify .env.local looks correct');
  console.log('  2. Restart dev server: npm run dev\n');

} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
