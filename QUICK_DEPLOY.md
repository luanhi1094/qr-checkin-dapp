# 🚀 Quick Deploy Guide - QR Check-in DApp Iota

Ứng dụng của bạn **sẵn sàng deploy**! Hãy làm theo các bước dưới đây.

## ⚡ 5-Minute Quick Start

### 1️⃣ Cài Iota CLI (Windows)

```powershell
# Option A: Dùng Cargo (nếu đã cài Rust)
$env:USERPROFILE\.cargo\bin\cargo.exe install --git https://github.com/iotaledger/iota.git --branch develop iota-cli

# Option B: Download binary từ GitHub
# Visit: https://github.com/iotaledger/iota/releases
# Tìm: iota-v*-x86_64-pc-windows-msvc.zip
# Extract vào thư mục, add vào PATH
```

### 2️⃣ Tạo Ví & Setup

```bash
# Kiểm tra Iota CLI
iota --version

# Switch sang testnet
iota client switch --env testnet

# Kiểm tra wallet (hoặc tạo mới)
iota client addresses

# Lấy testnet tokens
iota client faucet
```

### 3️⃣ Deploy Contract

```bash
cd contracts/
iota client publish --gas-budget 100000000
```

### 4️⃣ Lưu Contract IDs

Output sẽ như này:
```
Published Objects:
  - ID: 0x1234... ← Đây là NEXT_PUBLIC_IOTA_CONTRACT_ID
  - ID: 0x5678... ← Đây là NEXT_PUBLIC_REGISTRY_OBJECT_ID
```

### 5️⃣ Update `.env.local`

```env
NEXT_PUBLIC_IOTA_CONTRACT_ID=0x1234...
NEXT_PUBLIC_REGISTRY_OBJECT_ID=0x5678...
```

### 6️⃣ Restart Dev Server

```bash
npm run dev
```

---

## 📋 Đã Chuẩn Bị

✅ Frontend - Next.js + Iota dApp Kit  
✅ Smart Contract - Move  (checkin_registry.move)  
✅ Fake Data - Để test UI  
✅ Deploy Script - Hướng dẫn chi tiết  

---

## 🎯 Sau Khi Deploy

1. Contract đã live trên Iota testnet
2. App sẽ dùng real blockchain calls (không còn fake data)
3. Cài Iota Firefly wallet để test
4. Tạo event, check-in, xem QR code

---

## 📚 Resources

- **Iota Docs**: https://docs.iota.org/
- **Iota Faucet**: https://faucet.testnet.iota.cafe/
- **Iota CLI GitHub**: https://github.com/iotaledger/iota
- **Firefly Wallet**: https://firefly.iota.org/

---

## 🆘 Troubleshooting

### Iota CLI không cài được
- Check Rust: `rustc --version`
- Try: `cargo install --git https://github.com/iotaledger/iota.git iota-cli`

### Gas budget error
- Tăng gas budget: `--gas-budget 200000000`
- Hoặc lấy thêm tokens từ faucet

### Cannot find contract files
- Ensure you're in project root: `d:\qr-checkin-dapp`
- Check `contracts/Move.toml` exists

---

**Ready?** Follow the 6 steps above! 🚀

Questions? Check DEPLOYMENT_GUIDE.md for details.
