# 🔧 Cách Cài Đặt Iota CLI

## Windows - 3 Cách (Chọn 1)

### **Cách 1: Download Binary (Dễ nhất) ⭐**

1. **Truy cập GitHub Releases:**
   - Link: https://github.com/iotaledger/iota/releases
   
2. **Tìm release mới nhất** (ví dụ: `v1.37.0` hoặc `develop`)

3. **Download file Windows:**
   - Tên: `iota-v*-x86_64-pc-windows-msvc.zip`
   - Ví dụ: `iota-v1.37.0-x86_64-pc-windows-msvc.zip`

4. **Extract vào thư mục:**
   ```powershell
   # Ví dụ extract vào C:\iota
   mkdir C:\iota
   # Extract zip file vào đó
   ```

5. **Thêm vào PATH (tùy chọn):**
   - Mở: `System Properties → Environment Variables`
   - Thêm `C:\iota` vào PATH
   - Hoặc dùng full path: `C:\iota\iota.exe`

6. **Test cài đặt:**
   ```powershell
   iota --version
   # hoặc
   C:\iota\iota.exe --version
   ```

---

### **Cách 2: Dùng Cargo (Nếu có Rust)**

```powershell
# Kiểm tra có cargo chưa
cargo --version

# Cài từ source (mất 5-10 phút)
cargo install --git https://github.com/iotaledger/iota.git --branch develop iota-cli

# Test
iota --version
```

---

### **Cách 3: Dùng Installer Script (Auto)**

```powershell
# Chạy script tự động (nếu có)
PowerShell -Command "& { iex ((New-Object System.Net.WebClient).DownloadString('https://raw.githubusercontent.com/iotaledger/iota/develop/scripts/windows-install.ps1')) }"
```

---

## macOS / Linux

```bash
# Download binary
curl -sSLf https://github.com/iotaledger/iota/releases/download/iota-v1.37.0/iota-v1.37.0-x86_64-unknown-linux-gnu.tar.gz | tar -zxf - -C ~/.local/bin

# hoặc dùng cargo
cargo install --git https://github.com/iotaledger/iota.git --branch develop iota-cli

# Test
iota --version
```

---

## ✅ Verify Installation

```powershell
# Kiểm tra phiên bản
iota --version

# Xem help
iota --help

# Kiểm tra ví
iota client addresses
```

---

## 🐛 Troubleshooting

### Error: `iota: The term 'iota' is not recognized`
- **Giải pháp:** Thêm thư mục Iota vào PATH
- Hoặc dùng full path: `C:\iota\iota.exe --version`

### Error: `Could not find prebuilt binary for your system`
- **Giải pháp:** Dùng Cargo cài từ source
- `cargo install --git https://github.com/iotaledger/iota.git iota-cli`

### Error: `Connection timeout` khi download
- **Giải pháp:** 
  - Thử lại sau vài phút
  - Hoặc download zip từ browser rồi extract

---

## 📋 Next Steps

1. ✅ Cài Iota CLI
2. ✅ Verify: `iota --version`
3. ✅ Switch testnet: `iota client switch --env testnet`
4. ✅ Lấy tokens: `iota client faucet`
5. ✅ Deploy: `iota client publish --gas-budget 100000000`

---

## 📚 Resources

- **Iota Docs:** https://docs.iota.org/
- **GitHub:** https://github.com/iotaledger/iota
- **Releases:** https://github.com/iotaledger/iota/releases

---

**Cần giúp?** Hãy nói lỗi bạn gặp! 🆘
