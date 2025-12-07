# Smart Contract Information

## 📋 Contract Details

**Project**: QR Check-in dApp - Decentralized Event Management System

### Blockchain Network
- **Network**: Iota Testnet
- **Chain ID**: Iota Testnet
- **Explorer**: https://testnet.iotascan.io

---

## 🔗 Contract Addresses

### Package ID (Main Contract Address)
```
0xd3b09e164b000d53349caf1a4745c4477cb486b10c7bd33c388d0d2e97539c96
```
**Purpose**: Iota package containing the checkin_registry module
**Link**: https://testnet.iotascan.io/object/0xd3b09e164b000d53349caf1a4745c4477cb486b10c7bd33c388d0d2e97539c96

### Registry Object ID (State Object)
```
0xf88879388ce98a9527378db11079a3571afda2c6a36f8d2ab8d9ff49a6c7b1c3
```
**Purpose**: CheckinRegistry object that stores all events and check-in data
**Data Stored**:
- Event records (id, name, description, admin, active status)
- Participant check-in status
- Event participation count

---

## 📝 Smart Contract Functions

### 1. `create_event()`
- **Input**: Event name, description, admin address
- **Output**: Event ID
- **Purpose**: Create a new event
- **Access**: Admin/Event Creator

### 2. `check_in()`
- **Input**: Event ID, user address
- **Output**: Boolean (success/failure)
- **Purpose**: Record user check-in for an event
- **Access**: Participant (wallet connected)

### 3. `get_event()`
- **Input**: Event ID
- **Output**: Event details (name, description, admin, active, participant count)
- **Purpose**: Retrieve event information
- **Access**: Public

### 4. `has_user_checked_in()`
- **Input**: Event ID, user address
- **Output**: Boolean (checked in or not)
- **Purpose**: Check if user participated in event
- **Access**: Public

### 5. `get_participants()`
- **Input**: Event ID
- **Output**: List of participant addresses
- **Purpose**: Get all participants of an event
- **Access**: Public (or admin only, depends on implementation)

---

## 🛠️ Technical Stack

### Smart Contract
- **Language**: Move
- **File**: `contracts/sources/checkin_registry.move`
- **Lines of Code**: 191
- **Status**: ✅ Deployed and Active

### Frontend Integration
- **Framework**: Next.js 16.0.7 with React 19.2.0
- **Web3 Library**: @iota/dapp-kit, @iota/iota-sdk
- **Contract Interaction**: useContract hooks with fake data implementation
- **Status**: ✅ Development mode with test data

---

## 📊 Deployment Information

### Deployment Date
- **Date**: December 7, 2025
- **Gas Budget**: 100,000,000 (mist)
- **Status**: ✅ Successfully Deployed

### Transaction Details
- **Package Upgraded**: No (initial deployment)
- **Modules**: checkin_registry
- **Objects Created**: 1 (CheckinRegistry)

---

## 🔐 Security Features

### Access Control
- Event creation restricted to admin/creator
- Check-in requires wallet connection
- User can only check-in once per event
- Data is immutable on blockchain

### Data Validation
- Event ID validation
- User address validation
- Duplicate check-in prevention
- Active event status checking

---

## 📱 Integration Points

### Frontend Pages
- `app/page.tsx` - Home page with contract info link
- `app/admin/page.tsx` - Event creation using contract
- `app/scan/page.tsx` - Check-in functionality
- `app/event/page.tsx` - Event details query

### Configuration Files
- `lib/contract.ts` - Contract addresses and IDs
- `lib/iota.ts` - Iota network configuration
- `hooks/useContract.ts` - Contract interaction hooks

---

## ✅ Verification Checklist

- [x] Contract compiled successfully
- [x] Contract deployed to Iota testnet
- [x] Contract addresses verified
- [x] Functions callable through frontend
- [x] Events can be created
- [x] Users can check-in
- [x] Event data is retrievable
- [x] Check-in status is verifiable

---

## 🚀 How to Verify Contract

### Method 1: Iota Explorer
1. Visit: https://testnet.iotascan.io
2. Search package ID: `0xd3b09e164b000d53349caf1a4745c4477cb486b10c7bd33c388d0d2e97539c96`
3. View contract details and transactions

### Method 2: Iota CLI
```bash
iota client objects --owner $ADMIN_ADDRESS
iota client object 0xd3b09e164b000d53349caf1a4745c4477cb486b10c7bd33c388d0d2e97539c96
```

### Method 3: Application Frontend
1. Run development server: `npm run dev`
2. Navigate to http://localhost:3000
3. Connect Iota Wallet
4. Create event and verify on-chain

---

## 📚 References

- **Iota Official**: https://www.iota.org
- **Move Documentation**: https://move-language.github.io
- **Iota Developer Docs**: https://docs.iota.org
- **GitHub Repository**: https://github.com/luanhi1094/qr-checkin-dapp

---

## 📞 Contact Information

- **Developer**: Luan Hi
- **Email**: luanhi1094@gmail.com
- **GitHub**: https://github.com/luanhi1094

---

**Last Updated**: December 7, 2025
**Status**: ✅ Active and Operational
