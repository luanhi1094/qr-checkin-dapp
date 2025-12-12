# 🔗 QR Check-in dApp - Iota Blockchain

> A decentralized QR code check-in system powered by Iota blockchain, Node.js backend, and MongoDB database

[![Iota](https://img.shields.io/badge/Blockchain-Iota_Testnet-blue?logo=iota)](https://iota.org)
[![Next.js](https://img.shields.io/badge/Framework-Next.js_16-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Backend-Node.js_Express-68A063?logo=node.js)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-13AA52?logo=mongodb)](https://www.mongodb.com)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

## Tech Stack 🛠️

- **Frontend**: Next.js 16 + React 19 + TypeScript + Turbopack
- **Backend**: Node.js + Express + MongoDB Atlas
- **Blockchain**: Iota L1 + Firefly Wallet
- **Database**: MongoDB (cloud-hosted)
- **Styling**: Tailwind CSS

## 🌟 Features

- ✅ **Web3 Wallet Integration** - Connect with Iota Wallet or Firefly
- ✅ **Event Management** - Create and manage check-in events (backend-powered)
- ✅ **QR Code Scanning** - Scan QR codes for instant check-in
- ✅ **Real-time Participant Tracking** - View event attendance with backend sync
- ✅ **Database Persistence** - All events and check-ins stored in MongoDB
- ✅ **REST API Backend** - Node.js/Express API for event management
- ✅ **Responsive Design** - Works on desktop and mobile devices
- ✅ **TypeScript Support** - Full type safety throughout the application

## 🔗 Backend Integration

This dApp is **fully connected** to a Node.js backend with MongoDB:

### API Endpoints Used
```
GET    /api/events                       # Get all events
GET    /api/events/:eventId              # Get event details
POST   /api/events                       # Create new event
POST   /api/events/:eventId/checkin      # Record participant check-in
GET    /api/events/:eventId/participants # Get event participants
DELETE /api/events/:eventId              # Delete event
```

### Data Persistence
- Events are **stored in MongoDB Atlas**
- Participants automatically recorded on check-in
- Real-time participant list synced from backend
- All data persists across sessions

### API Service
**File**: `lib/api.ts`
- Type-safe API calls with TypeScript
- Handles all event and check-in operations
- Error handling and loading states

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- Browser with Iota Wallet or Firefly extension
- Backend server running on http://localhost:5000
- 10+ IOTA testnet tokens (get from [faucet](https://faucet.testnet.iota.cafe))

### Installation

```bash
# Clone the repository
git clone https://github.com/luanhi1094/qr-checkin-dapp.git
cd qr-checkin-dapp

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 How to Use

### For Admins
1. Connect your Iota wallet by clicking "Kết nối Ví" (Connect Wallet)
2. Go to **Admin Page**
3. Create a new event with:
   - Event name (e.g., "Web3 Hội Thảo 2025")
   - Event description
   - Location
   - Start date & time
4. Get the event QR code link
5. Share with participants

### For Participants
1. Connect your Iota wallet
2. Go to **Scan QR** page
3. Scan the event QR code
4. Click "Check In" button
5. Confirm transaction in your wallet
6. Your attendance is recorded on blockchain!

### View Results
- Click **Event** to see all participants who checked in
- View wallet addresses and check-in timestamps
- Access transaction details on Iota blockchain explorer

## 📁 Project Structure

```
qr-checkin-dapp/
├── app/
│   ├── page.tsx              # Home page
│   ├── admin/
│   │   └── page.tsx          # Event management
│   ├── scan/
│   │   └── page.tsx          # QR code scanner
│   ├── event/
│   │   └── page.tsx          # Participant list
│   └── web3-providers.tsx    # Iota dApp Kit provider
├── components/
│   ├── IotaConnectButton.tsx # Wallet connection
│   └── QRScanner.tsx         # QR code scanner component
├── hooks/
│   └── useContract.ts        # Smart contract hooks
├── lib/
│   ├── iota.ts              # Iota config
│   └── contract.ts          # Contract addresses
├── contracts/
│   └── sources/
│       └── checkin_registry.move  # Move smart contract
└── public/                   # Static assets
```

## 🔗 Smart Contract Details

### Deployment Info
- **Network**: Iota Testnet
- **Language**: Move
- **Status**: ✅ Deployed & Verified

### Contract Addresses
```
Package ID: 0xd3b09e164b000d53349caf1a4745c4477cb486b10c7bd33c388d0d2e97539c96
Registry ID: 0xf88879388ce98a9527378db11079a3571afda2c6a36f8d2ab8d9ff49a6c7b1c3
```

### Functions
| Function | Purpose | Parameters |
|----------|---------|-----------|
| `create_event` | Create new check-in event | event_name, description, location |
| `check_in` | Record participant check-in | event_id, user_address |
| `get_event` | Retrieve event details | event_id |
| `has_user_checked_in` | Verify check-in status | event_id, user_address |
| `get_participants` | List all participants | event_id |

*See [CONTRACT_INFO.md](./CONTRACT_INFO.md) for complete technical documentation*

## 🌐 Deployment

### Deploy on Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Import on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New..." → "Project"
   - Import from GitHub
   - Select `luanhi1094/qr-checkin-dapp`
   - Click "Deploy"

3. **Configure Environment** (if needed)
   - Vercel will auto-detect Next.js
   - Deployment completes in 2-5 minutes
   - Your live URL will be shown

### Deploy Locally with PM2

```bash
npm run build
npx pm2 start npm -- start
npx pm2 save
```

### Deploy with Docker

```bash
docker build -t qr-checkin-dapp .
docker run -p 3000:3000 qr-checkin-dapp
```

### Deploy with Railway

1. Connect GitHub account
2. Create new project
3. Select this repository
4. Auto-deploys on each push

## 🛠 Technology Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Next.js** | 16.0.7 | React framework with Turbopack |
| **React** | 19.2.0 | UI library |
| **TypeScript** | Latest | Type safety |
| **Tailwind CSS** | 4.0 | Styling |
| **@iota/dapp-kit** | Latest | Wallet integration |
| **@iota/iota-sdk** | Latest | Blockchain interaction |
| **Move** | Latest | Smart contracts |

## 🔐 Security Features

- ✅ **Immutable Records** - All check-ins recorded permanently on blockchain
- ✅ **Wallet Verification** - Only wallet owners can check in
- ✅ **Smart Contract Auditing** - Code reviewed before deployment
- ✅ **No Private Keys Stored** - Uses browser-based wallet extension
- ✅ **Testnet Only** - Safe testing environment with no real funds

## ❓ Troubleshooting

### Wallet Not Connecting
- **Solution**: Ensure Iota Wallet extension is installed and enabled
- **Check**: Verify testnet is selected in wallet settings
- **Tokens**: Confirm you have IOTA testnet tokens (minimum 1)

### QR Scanner Not Working
- **Solution**: Allow camera permission in browser
- **Check**: Verify QR code is properly generated
- **Alt**: Use mobile device for better scanning

### Contract Calls Failing
- **Solution**: Ensure wallet is connected and has IOTA tokens
- **Check**: Verify contract addresses in `lib/contract.ts`
- **View**: Check transaction status on [Iota Explorer](https://explorer.iota.cafe)

### Deployment Issues
- **Clear Cache**: `npm run build` with `--clean` flag
- **Reinstall**: Remove `node_modules` and run `npm install`
- **Env Vars**: Verify all environment variables are set correctly

## 📚 Learning Resources

- [Iota Documentation](https://docs.iota.org)
- [Move Language Guide](https://move-language.github.io)
- [Next.js 16 Docs](https://nextjs.org/docs)
- [Iota dApp Kit](https://github.com/iotaledger/dapp-kit)
- [Blockchain Basics](https://en.wikipedia.org/wiki/Blockchain)

## 📊 Project Statistics

- **Smart Contract Size**: 191 lines of Move code
- **Frontend Pages**: 4 (Home, Admin, Scan, Event)
- **Git Commits**: 16+ meaningful commits
- **TypeScript Files**: 20+
- **Development Time**: ~2 weeks

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Luan Hi** - [GitHub](https://github.com/luanhi1094)

- 📧 Email: [your-email@example.com](mailto:your-email@example.com)
- 🔗 LinkedIn: [Your Profile](https://linkedin.com)
- 🐦 Twitter: [@YourHandle](https://twitter.com)

## 🆘 Support & Contact

For questions, issues, or feature requests:
- **Open an Issue**: [GitHub Issues](https://github.com/luanhi1094/qr-checkin-dapp/issues)
- **Email**: your-email@example.com
- **Discord**: [Join our server](#)

## 📡 Live Demo

- **GitHub Repository**: [luanhi1094/qr-checkin-dapp](https://github.com/luanhi1094/qr-checkin-dapp)
- **Vercel Deployment**: [Coming Soon]
- **Contract Explorer**: [View on Iota Explorer](https://explorer.iota.cafe)

---

<div align="center">

**⭐ If this project helped you, please consider giving it a star!**

Made with ❤️ by [Your Name]

</div>
