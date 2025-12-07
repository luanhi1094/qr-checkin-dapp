# QR Check-in DApp 📍

Hệ thống check-in phi tập trung sử dụng Blockchain, Next.js, và QR code.

## Features ✨

- ✅ **Admin Dashboard** - Tạo sự kiện và nhận QR code
- ✅ **QR Scanner** - Quét QR code hoặc nhập Event ID thủ công
- ✅ **Check-in on Blockchain** - Check-in được lưu trên blockchain Sepolia
- ✅ **Wallet Connection** - Kết nối MetaMask qua Rainbow Kit
- ✅ **Status Tracking** - Kiểm tra trạng thái check-in của bạn

## Công Nghệ 🔧

### Frontend
- **Next.js 16** - React framework
- **TypeScript** - Type-safe code
- **Tailwind CSS** - Styling
- **Wagmi** - React hooks for Web3
- **Viem** - TypeScript Ethereum library
- **Rainbow Kit** - Wallet connection UI
- **QR Code** - QR generation & scanning

### Blockchain
- **Solidity ^0.8.19** - Smart contract language
- **Hardhat** - Development framework
- **Sepolia Testnet** - Test network

## Cài Đặt 📦

### 1. Clone & Install Dependencies
```bash
cd d:\qr-checkin-dapp
npm install --legacy-peer-deps
```

### 2. Cấu Hình Environment Variables
```bash
cp .env.example .env.local
```

Cập nhật `.env.local`:
```env
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_walletconnect_project_id
NEXT_PUBLIC_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000
```

**Hướng dẫn lấy WalletConnect Project ID:**
1. Vào https://cloud.walletconnect.com/
2. Đăng ký & tạo project mới
3. Copy Project ID vào `.env.local`

### 3. Deploy Smart Contract

#### Option A: Deploy lên Sepolia (Recommended)
```bash
# Cài đặt Hardhat
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox dotenv

# Khởi tạo Hardhat project
npx hardhat

# Copy contract vào hardhat/contracts/
cp contracts/CheckinRegistry.sol hardhat/contracts/

# Cấu hình private key trong .env
echo "SEPOLIA_PRIVATE_KEY=your_private_key" >> hardhat/.env

# Deploy contract
npx hardhat run scripts/deploy.js --network sepolia

# Copy contract address vào .env.local
```

#### Option B: Deploy lên Local Hardhat Network (Dev)
```bash
# Terminal 1: Start Hardhat node
npx hardhat node

# Terminal 2: Deploy contract
npx hardhat run scripts/deploy.js --network localhost

# Copy contract address vào .env.local
```

### 4. Chạy Development Server
```bash
npm run dev
```

Mở http://localhost:3000 trong trình duyệt.

## Hướng Dẫn Sử Dụng 🚀

### Bước 1: Kết Nối MetaMask
1. Nhấn **"Connect Wallet"** ở top-right
2. Chọn **MetaMask**
3. Chọn **Sepolia Testnet** (trong MetaMask)

### Bước 2: Tạo Sự Kiện (Admin)
1. Truy cập trang **Admin Dashboard** (`/admin`)
2. Nhập **Tên Sự Kiện** và **Mô Tả**
3. Nhấn **"✨ Tạo Sự Kiện"**
4. Ký giao dịch trong MetaMask
5. Download **QR Code** hoặc chia sẻ Event ID

### Bước 3: Check-in (User)
1. Truy cập trang **Quét QR Code** (`/scan`)
2. **Option A:** Quét QR code từ camera
3. **Option B:** Nhập Event ID thủ công
4. Nhấn **"✅ Check-in Ngay"**
5. Ký giao dịch trong MetaMask
6. ✅ Check-in thành công!

### Bước 4: Kiểm Tra Trạng Thái (Optional)
1. Truy cập trang **Kiểm Tra Check-in** (`/event`)
2. Nhập Event ID
3. Xem trạng thái check-in của bạn

## Cấu Trúc Project 📁

```
qr-checkin-dapp/
├── app/
│   ├── page.tsx                 # Trang chủ
│   ├── admin/
│   │   └── page.tsx             # Admin dashboard
│   ├── scan/
│   │   └── page.tsx             # QR Scanner
│   ├── event/
│   │   └── page.tsx             # Event status
│   ├── layout.tsx               # Root layout
│   ├── providers.tsx            # Wagmi providers
│   └── globals.css              # Global styles
├── components/
│   ├── QRGenerator.tsx          # QR code generator
│   ├── QRScanner.tsx            # QR code scanner
│   └── ManualEventIdInput.tsx   # Manual input form
├── lib/
│   ├── wagmi.ts                 # Wagmi configuration
│   └── contract.ts              # Contract ABI & address
├── hooks/
│   └── useContract.ts           # Custom contract hooks
├── contracts/
│   └── CheckinRegistry.sol      # Smart contract
├── public/
│   └── qr-codes/                # Generated QR codes storage
├── .env.example                 # Environment template
└── package.json                 # Dependencies
```

## Smart Contract Functions 📋

### `createEvent(name, description)`
Tạo sự kiện mới. Chỉ admin có thể gọi.
- **Args:** name (string), description (string)
- **Returns:** Event ID
- **Emits:** EventCreated

### `checkIn(eventId)`
Check-in vào sự kiện.
- **Args:** eventId (uint256)
- **Returns:** Success
- **Emits:** CheckinSuccess
- **Constraints:** Chỉ check-in một lần, sự kiện phải active

### `getEvent(eventId)`
Lấy thông tin sự kiện.
- **Returns:** Event struct (name, description, admin, createdAt, checkinsCount, active)

### `hasUserCheckedIn(eventId, user)`
Kiểm tra nếu user đã check-in.
- **Returns:** boolean

### `getParticipants(eventId)`
Lấy danh sách người đã check-in. (Admin-only)
- **Returns:** address[]

## Hardhat Scripts 🔧

### Deploy Script (`scripts/deploy.js`)
```javascript
const CheckinRegistry = await ethers.getContractFactory('CheckinRegistry');
const contract = await CheckinRegistry.deploy();
await contract.deployed();
console.log(`Contract deployed to ${contract.address}`);
```

### Test Script
```bash
npx hardhat test
```

## Troubleshooting 🐛

### "Contract address is not set"
→ Kiểm tra `.env.local` có `NEXT_PUBLIC_CONTRACT_ADDRESS` không

### "MetaMask not connected"
→ Nhấn "Connect Wallet" và chọn MetaMask

### "Wrong network"
→ Đảm bảo MetaMask đang dùng **Sepolia Testnet**

### "Insufficient balance for gas"
→ Yêu cầu testnet ETH từ https://sepoliafaucet.com

### QR Scanner không hoạt động
→ Kiểm tra quyền camera trên trình duyệt

## Deploy lên Production 🚀

### Vercel
```bash
# Push to GitHub
git push origin main

# Connect GitHub repo to Vercel
# → Auto deploy on push
```

### Environment Variables trên Vercel
1. Vào Vercel Dashboard → Settings → Environment Variables
2. Thêm:
   - `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID`
   - `NEXT_PUBLIC_CONTRACT_ADDRESS`

### Smart Contract trên Mainnet (Optional)
1. Thay `SEPOLIA_PRIVATE_KEY` bằng mainnet private key
2. Cập nhật RPC URL trong `hardhat.config.js`
3. Deploy: `npx hardhat run scripts/deploy.js --network ethereum`
4. Cập nhật `NEXT_PUBLIC_CONTRACT_ADDRESS` trong Vercel

## Security ⚠️

⚠️ **NEVER** commit `.env.local` hoặc private keys vào Git!

```bash
# Add to .gitignore
echo ".env.local" >> .gitignore
echo ".env" >> .gitignore
echo "hardhat/.env" >> .gitignore
```

## Development Tips 💡

### Watch Mode
```bash
npm run dev
```

### Build for Production
```bash
npm run build
npm start
```

### Lint & Format
```bash
npm run lint
npm run format
```

## License 📄

MIT License - Feel free to use this project for learning & development

## Support 🤝

- GitHub Issues: Report bugs & feature requests
- Discussions: Ask questions & share ideas

---

**Happy building! 🚀**
