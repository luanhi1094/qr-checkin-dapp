# 🚀 Hướng Dẫn Deploy Smart Contract Iota

## 📋 Yêu Cầu

1. **Iota CLI** - Công cụ dòng lệnh Iota
2. **Ví Iota** - Để ký giao dịch
3. **IOTA Testnet tokens** - Để trả gas

---

## 🔧 Bước 1: Cài Iota CLI

### Trên macOS/Linux:
```bash
curl -sSLf https://github.com/iotaledger/iota/releases/download/iota-v1.0.0/iota-v1.0.0-x86_64-unknown-linux-gnu.tar.gz | tar -zxf - -C ~/.local/bin
```

### Trên Windows:
1. Download từ: https://github.com/iotaledger/iota/releases
2. Tìm bản `iota-v1.0.0-x86_64-pc-windows-msvc.zip`
3. Extract vào folder
4. Thêm vào PATH hoặc dùng full path

### Verify installation:
```bash
iota --version
```

---

## 🌐 Bước 2: Cấu Hình Ví & Network

### Tạo ví Iota (nếu chưa có):
```bash
iota client new-address ed25519
```

### Switch sang Testnet:
```bash
iota client switch --env testnet
```

### Kiểm tra ví hiện tại:
```bash
iota client active-address
iota client gas
```

### Lấy testnet tokens từ faucet:
```bash
iota client faucet
```

Hoặc truy cập: https://faucet.testnet.iota.cafe/

---

## 📦 Bước 3: Deploy Contract

### Vào folder contracts:
```bash
cd contracts
```

### Deploy Move package:
```bash
iota client publish --gas-budget 100000000
```

### Lưu output (sẽ có dạng):
```
Published Objects:
  - ID: 0x... (Package ID) ← LƯU CÁI NÀY
  - ID: 0x... (CheckinRegistry Object) ← LƯU CÁI NÀY
```

---

## ⚙️ Bước 4: Update Environment

Mở `.env.local` và thêm:
```env
NEXT_PUBLIC_IOTA_CONTRACT_ID=0x<package_id_từ_deploy>
NEXT_PUBLIC_REGISTRY_OBJECT_ID=0x<checkin_registry_id>
```

---

## ✅ Bước 5: Kiểm Tra Contract

Sau khi deploy, contract function names là:
- `create_event` - Tạo sự kiện
- `check_in` - Check-in vào sự kiện
- `get_event` - Lấy thông tin sự kiện
- `has_user_checked_in` - Kiểm tra đã check-in chưa

---

## 🐛 Troubleshooting

### Error: "Insufficient balance"
- Lấy thêm tokens từ faucet
- Wait ~30 seconds rồi thử lại

### Error: "Move compilation failed"
- Kiểm tra syntax trong `checkin_registry.move`
- Chắc chắn Iota version tương thích

### Gas budget too low
- Tăng `--gas-budget` (VD: `200000000`)

---

## 📝 Next Steps

1. Cài Iota CLI
2. Tạo ví & lấy tokens
3. Deploy contract
4. Update `.env.local`
5. Restart dev server
6. Test ứng dụng với Iota Firefly wallet

Happy deploying! 🎉
```env
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_KEY
SEPOLIA_PRIVATE_KEY=your_private_key_here
```

2. Lấy Alchemy API Key:
   - Vào: https://dashboard.alchemy.com/
   - Tạo app Sepolia
   - Copy RPC URL

### Bước 4: Deploy Contract

```bash
# Compile contract
npx hardhat compile

# Deploy trên Sepolia
npx hardhat run scripts/deploy.js --network sepolia

# Output sẽ hiển thị:
# ✅ CheckinRegistry deployed to: 0x...
# ✅ Updated .env.local with contract address
```

### Bước 5: Verify Contract (Optional)

```bash
# Verify trên Etherscan
npx hardhat verify --network sepolia CONTRACT_ADDRESS
```

---

## Hướng dẫn Lấy RPC URL

### Option A: Alchemy (Recommended)
1. Vào https://dashboard.alchemy.com/
2. Đăng ký free account
3. Create app Sepolia
4. Copy RPC URL: `https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY`

### Option B: Infura
1. Vào https://infura.io/
2. Đăng ký free account
3. Create Sepolia project
4. Copy RPC URL: `https://sepolia.infura.io/v3/YOUR_KEY`

### Option C: Public RPC (Free, no key needed)
```
https://eth-sepolia-public.unifra.io
https://rpc.sepolia.org
https://1rpc.io/sep
```

---

## Troubleshooting

### ❌ "Missing private key"
→ Thêm SEPOLIA_PRIVATE_KEY vào .env

### ❌ "Insufficient balance for gas"
→ Yêu cầu thêm Sepolia ETH từ faucet

### ❌ "Invalid RPC URL"
→ Kiểm tra SEPOLIA_RPC_URL đúng format

### ❌ "nonce too low"
→ Thường fix bằng cách: reset account trong MetaMask (Settings → Advanced → Reset Account)

---

## Sau khi Deploy

✅ `.env.local` sẽ tự động update với contract address
✅ Refresh browser để load contract
✅ Kết nối MetaMask (Sepolia testnet)
✅ Tạo event từ Admin page

---

## Checklist Deploy

- [ ] Lấy Sepolia ETH từ faucet
- [ ] Cấu hình .env với SEPOLIA_RPC_URL
- [ ] Thêm SEPOLIA_PRIVATE_KEY vào .env  
- [ ] Chạy: `npx hardhat compile`
- [ ] Chạy: `npx hardhat run scripts/deploy.js --network sepolia`
- [ ] Copy contract address từ output
- [ ] Xác nhận .env.local đã cập nhật
- [ ] Restart dev server
- [ ] Test tạo event & check-in

---

**Cần giúp đỡ?** Hỏi trong chat! 🚀
