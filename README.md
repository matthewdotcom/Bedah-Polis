# WealthResilience & Policy Gap Auditor

Dua modul konsultasi & edukasi perencanaan finansial bergaya Apple Cupertino dalam satu repositori siap deploy ke **GitHub** dan **Vercel**:

1. **`/` — Cek Ketahanan Finansial Keluarga (`WealthResilience`)**: Kalkulator skor ketahanan finansial real-time (0–100), simulasi dana darurat, proyeksi inflasi medis 13%/tahun, dan lead-capture gate 3 pilar proteksi.
2. **`/auditor` — Policy Gap & Risk Auditor (`Policy Auditor`)**: Audit celah polis eksisting vs kebutuhan ideal, grafik proyeksi inflasi medis 5 tahun interaktif, preset skenario klien, salin ringkasan WhatsApp, dan mode cetak/PDF.

## Jalankan Secara Lokal

```bash
npm install
npm run dev
```

## Deploy ke GitHub & Vercel

```bash
git init
git add .
git commit -m "feat: combine WealthResilience and Policy Gap Auditor"
git branch -M main
git remote add origin <URL_REPO_GITHUB_ANDA>
git push -u origin main
```

Lalu buka [vercel.com](https://vercel.com), klik **Add New Project**, pilih repositori GitHub Anda, dan klik **Deploy** (Framework Preset: **Vite**).
