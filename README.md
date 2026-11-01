# Express.js Automated CI/CD Pipeline

![GitHub Actions Status](https://img.shields.io/github/actions/workflow/status/Kevin-2603/GitHub-Actions-Render-Pipeline/deploy.yml?branch=main&label=CI%2FCD%20Build)
![Node.js Version](https://img.shields.io/badge/Node.js-v20-brightgreen)
![Runner Environment](https://img.shields.io/badge/Runner-WSL2%20Ubuntu-orange)
![License](https://img.shields.io/badge/License-MIT-blue)

Proyek ini mendemonstrasikan implementasi **Continuous Integration & Continuous Deployment (CI/CD)** secara penuh untuk aplikasi web Node.js/Express.js. Pipeline dibangun menggunakan **GitHub Actions** yang terintegrasi dengan **Self-Hosted Runner** pada WSL2 (Windows Subsystem for Linux), memberikan solusi deployment otomatis yang 100% gratis, aman, dan tanpa keterbatasan cloud.

---

## Arsitektur Pipeline

```text
[ Developer Workspace ]
   └── Edit Code (WSL2 / Ubuntu)
            │
            ▼ (git push)
[ GitHub Repository ]
            │
            ▼ (Trigger Workflow)
[ GitHub Actions CI Pipeline ]
   ├── 1. Checkout Codebase
   ├── 2. Setup Node.js Environment
   ├── 3. Install Dependencies (`npm ci`)
   └── 4. Execute Unit Tests (Jest & Supertest)
            │
            ▼ (If Tests Pass)
[ Self-Hosted Runner (WSL2 On-Premise) ]
   ├── 1. Receive Deployment Job
   ├── 2. Pull Latest Code Changes
   └── 3. Restart Application Service via pm2 (`pm2 reload`)
            │
            ▼
[ Live Web Application ] ──> http://localhost:3000
```
## ech Stack & Tools
* **Backend Framework:** Node.js & Express.js
* **Testing Framework:** Jest & Supertest
* **CI/CD Orchestration:** GitHub Actions
* **Target Deployment:** Self-Hosted Runner (Ubuntu via WSL2)
* **Local OS Environment:** Windows 11 / WSL2

## Struktur Proyek
```text
GitHub-Actions-Render-Pipeline/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Konfigurasi pipeline GitHub Actions
├── public/
│   └── index.html              # Frontend landing page
├── src/
│   ├── app.js                  # Inisialisasi Express app
│   └── server.js               # Entry point server
├── tests/
│   └── app.test.js             # Unit test Jest
├── package.json
└── README.md
```
## Cara Menjalankan Secara Lokal
1. Clone Repository
```bash
git clone https://github.com/Kevin-2603/GitHub-Actions-Pipeline.git
cd GitHub-Actions-Pipeline
```
2. Install Dependensi
```bash
npm install
```
3. Menjalankan Unit Test
```bash
npm test
```
4. Menjalankan Server Aplikasi
* Opsi 1: Menjalankan di latar belakang dengan PM2
```bash
npm install -g pm2
pm2 start src/server.js --name "express-app"
```
* Opsi 2: Menjalankan secara reguler
```bash
npm start
```
**Buka browser di http://localhost:3000 untuk melihat aplikasi web yang berjalan.**

## Detail Konfigurasi CI/CD Pipeline
1. **Automated Testing (CI Job):**
   * Berjalan di lingkungan ubuntu-latest bawaan GitHub.
   * Mengisolasi dependensi dengan npm ci.
   * Menjalankan unit test dengan Jest. Jika ada test yang gagal (fail), proses deployment akan dibatalkan secara otomatis.
2. Self-Hosted Deployment (CD Job):
   * Mengeksekusi instruksi langsung di server lokal menggunakan label `runs-on: self-hosted`.
   * **Zero-Downtime Deployment via PM2:** Menggunakan PM2 Process Manager untuk melakukan otomatisasi update kode tanpa menghentikan aplikasi secara total.
   * **Persistence & Auto-Recovery:** Menjamin aplikasi Node.js tetap menyala di latar belakang dan otomatis aktif kembali jika server mengalami crash atau *restart*.

