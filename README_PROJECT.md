# QR Check-in dApp - Decentralized Event Management System

## 🎯 Project Overview

**QR Check-in dApp** là một ứng dụng phi tập trung (decentralized) dùng để quản lý sự kiện và kiểm tra sự hiện diện (check-in) của người tham gia thông qua mã QR code trên blockchain Iota.

### Đặc điểm chính:
- ✅ **Phi tập trung**: Dữ liệu được lưu trên blockchain Iota
- ✅ **An toàn**: Sử dụng ví kết nối (Iota Wallet/Firefly) để xác thực
- ✅ **Dễ sử dụng**: Giao diện người dùng thân thiện với tiếng Việt
- ✅ **QR Code**: Tạo và quét mã QR để check-in sự kiện
- ✅ **Web3**: Tích hợp công nghệ blockchain và smart contracts

---

## 🏗️ Kiến trúc Dự Án

```
qr-checkin-dapp/
├── app/                          # Next.js App Router
│   ├── page.tsx                 # Trang chủ
│   ├── admin/page.tsx           # Trang quản lý sự kiện
│   ├── scan/page.tsx            # Trang quét QR code
│   ├── event/page.tsx           # Trang chi tiết sự kiện
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles
│   ├── providers.tsx            # App providers wrapper
│   └── web3-providers.tsx       # Iota blockchain providers
│
├── components/                   # React Components
│   ├── IotaConnectButton.tsx    # Nút kết nối ví
│   ├── QRGenerator.tsx          # Tạo QR code
│   ├── QRScanner.tsx            # Quét QR code
│   ├── ManualEventIdInput.tsx   # Nhập Event ID thủ công
│   └── ConnectButton.tsx        # Component kết nối cũ
│
├── hooks/                        # Custom React Hooks
│   └── useContract.ts           # Hook tương tác smart contract
│
├── lib/                          # Utilities
│   ├── iota.ts                  # Iota configuration
│   ├── contract.ts              # Contract IDs & config
│   └── wagmi.ts                 # Web3 config (cũ)
│
├── contracts/                    # Smart Contracts
│   ├── sources/
│   │   └── checkin_registry.move # Move smart contract
│   └── Move.toml                # Move package config
│
├── public/                       # Static files
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
├── next.config.js               # Next.js config
└── tailwind.config.ts           # Tailwind CSS config
```

---

## 🚀 Công Nghệ Sử Dụng

### Frontend
- **Next.js 16.0.7** - React framework với Turbopack
- **React 19.2.0** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **Iota dApp Kit** - Web3 integration

### Blockchain
- **Iota Testnet** - Layer 1 blockchain
- **Move Language** - Smart contract programming
- **@iota/iota-sdk** - Iota SDK for JS/TS

### Additional Libraries
- **qrcode.react** - QR code generation
- **jsqr** - QR code scanning
- **html5-qrcode** - Camera QR scanning
- **@tanstack/react-query** - Data fetching

---

## 📋 Tính Năng Chính

### 1. **Trang Chủ (Home)**
- Giới thiệu về dự án
- Các tính năng chính
- Link đến admin, scan, event pages
- Trạng thái kết nối ví

### 2. **Admin Dashboard**
- **Tạo sự kiện mới**
  - Nhập tên sự kiện (required)
  - Nhập mô tả (optional)
  - Submit để tạo

- **Xem danh sách sự kiện**
  - Hiển thị các sự kiện đã tạo
  - Thông tin: ID, tên, mô tả, thời gian tạo

- **QR Code Generator**
  - Tự động tạo QR code từ event ID
  - Download QR code dưới dạng ảnh PNG
  - Chia sẻ QR code cho người tham gia

### 3. **Trang Quét QR (Scan)**
- **Quét QR Code**
  - Sử dụng camera thiết bị
  - Tự động nhận diện mã QR
  - Lấy Event ID từ QR

- **Nhập Manual**
  - Nhập Event ID thủ công
  - Fallback khi không quét được QR

- **Check-in**
  - Xác nhận check-in cho sự kiện
  - Hiển thị kết quả (thành công/lỗi)

### 4. **Trang Chi Tiết Sự Kiện**
- Tìm kiếm sự kiện theo Event ID
- Hiển thị:
  - Tên sự kiện
  - Mô tả
  - Số lượng người tham gia
  - Trạng thái check-in của ví hiện tại
- Thông tin ví (wallet address)

---

## 🔗 Smart Contract - Move

### Contract Features
```move
module checkin_registry::checkin_registry {
    // Objects
    struct Event {}           // Sự kiện
    struct CheckinRegistry {} // Registry check-in
    struct Participant {}     // Người tham gia
    
    // Functions
    fun create_event()        // Tạo sự kiện mới
    fun check_in()            // Check-in vào sự kiện
    fun get_event()           // Lấy thông tin sự kiện
    fun has_user_checked_in() // Kiểm tra check-in
    fun get_participants()    // Lấy danh sách người tham gia
}
```

### Deployment Info
- **Network**: Iota Testnet
- **Package ID**: `0xd3b09e164b000d53349caf1a4745c4477cb486b10c7bd33c388d0d2e97539c96`
- **Registry Object ID**: `0xf88879388ce98a9527378db11079a3571afda2c6a36f8d2ab8d9ff49a6c7b1c3`

---

## 🔌 Wallet Integration

### Hỗ trợ Ví
- ✅ **Iota Wallet** - Extension chính thức
- ✅ **Firefly** - Wallet Iota cũ (nếu cần)

### Kết nối Ví
1. Nhấn button **"Kết nối Ví"** ở góc phải trên
2. Chọn ví muốn kết nối
3. Approve trong extension
4. Địa chỉ ví sẽ hiển thị trên trang

### Yêu Cầu Testnet
- Cần **10 IOTA testnet** tokens để test
- Nhận testnet tokens tại [Iota Faucet](https://faucet.testnet.iota.cafe)

---

## 🛠️ Cài Đặt & Chạy Dự Án

### Prerequisites
- Node.js 18+ 
- npm hoặc yarn
- Iota Wallet extension (hoặc Firefly)
- Iota CLI (tuỳ chọn)

### 1. Clone Repository
```bash
git clone https://github.com/luanhi1094/qr-checkin-dapp.git
cd qr-checkin-dapp
```

### 2. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 3. Run Development Server
```bash
npm run dev
```
Truy cập: **http://localhost:3000**

### 4. Build Production
```bash
npm run build
npm run start
```

---

## 📝 Hướng Dẫn Sử Dụng

### Workflow: Admin tạo event
1. Vào `/admin`
2. Nhập tên sự kiện (VD: "Hội thảo Web3")
3. Nhập mô tả (VD: "Sự kiện blockchain")
4. Bấm "Tạo Sự Kiện"
5. QR code sẽ được tạo tự động
6. Download QR code
7. Chia sẻ QR code cho người tham gia

### Workflow: Người tham gia check-in
1. Vào `/scan`
2. Chọn "Quét QR Code"
3. Cấp quyền camera
4. Quét QR code từ sự kiện
5. Hoặc nhập Event ID thủ công
6. Bấm "Check-in"
7. Xác nhận thành công

### Workflow: Kiểm tra status
1. Vào `/event`
2. Nhập Event ID
3. Xem chi tiết sự kiện
4. Kiểm tra trạng thái check-in của mình

---

## 🔐 Bảo Mật

### Xác Thực
- Sử dụng ví blockchain để xác thực
- Không cần username/password
- Mỗi giao dịch được ký bởi private key

### Data
- Dữ liệu check-in lưu trên blockchain
- Không thể chỉnh sửa hoặc xóa (immutable)
- Công khai và có thể kiểm chứng

---

## 📊 Current Status

### ✅ Hoàn Thành
- Cấu trúc dự án
- Smart contract Move
- Tích hợp Iota dApp Kit
- Giao diện người dùng
- QR code generation
- QR code scanning
- Connect wallet functionality
- Fake data system cho testing

### 🔄 Đang Phát Triển
- Real blockchain transaction execution
- Database persistence
- User authentication system
- Event management dashboard
- Analytics & reporting

### ⏳ Kế Hoạch Tương Lai
- Mobile app (React Native)
- NFT badges cho participants
- Voting system
- Event analytics
- Multi-language support (EN, VN, CN)
- Dark mode

---

## 📚 File Quan Trọng

### Pages
- `app/page.tsx` - Trang chủ
- `app/admin/page.tsx` - Admin dashboard
- `app/scan/page.tsx` - QR scanner
- `app/event/page.tsx` - Event details

### Components
- `components/IotaConnectButton.tsx` - Wallet connection
- `components/QRGenerator.tsx` - QR code generator
- `components/QRScanner.tsx` - QR code scanner

### Hooks
- `hooks/useContract.ts` - Smart contract interactions (4 hooks)

### Smart Contract
- `contracts/sources/checkin_registry.move` - Move contract (191 lines)

---

## 🐛 Troubleshooting

### Lỗi: "Kết nối ví Iota" không có button
**Giải pháp**: 
- Refresh page (F5)
- Kiểm tra Iota Wallet extension đã cài
- Restart dev server

### Lỗi: "address is not defined"
**Giải pháp**: 
- Đã fix ở commit 14
- Sử dụng `account?.address` thay vì `address`

### Lỗi: Text mờ khi gõ
**Giải pháp**: 
- Đã fix ở commit 13
- Input đã có `text-gray-900` color

### QR Code không quét được
**Giải pháp**: 
- Kiểm tra ánh sáng
- Cấp quyền camera cho browser
- Thử nhập Event ID thủ công

---

## 📞 Support

### Links
- GitHub Repo: https://github.com/luanhi1094/qr-checkin-dapp
- Iota Official: https://www.iota.org
- Move Language: https://move-language.github.io
- Iota Documentation: https://docs.iota.org

### Contact
- Author: Luan Hi (luanhi1094@gmail.com)
- Issues: GitHub Issues

---

## 📄 License

MIT License - feel free to use for learning and development

---

## 🙏 Acknowledgments

- Iota Team cho blockchain infrastructure
- Move Language community
- React & Next.js teams
- Open source contributors

---

## 📈 Git Commits

Dự án có **15 commits** track lịch sử phát triển:

1. Initial project setup
2. Iota blockchain integration
3. Move smart contract
4. Contract deployment
5. Connect button
6. Admin dashboard
7. Event page
8. Scan page
9. Home page
10. QR generator
11. QR scanner
12. Contract hooks
13. UI styling
14. Fix errors
15. Final configuration

Xem chi tiết tại: https://github.com/luanhi1094/qr-checkin-dapp/commits/main

---

**Cảm ơn bạn đã sử dụng QR Check-in dApp!** 🚀
