# Perbandingan Berbalik Nilai — Media Pembelajaran Interaktif SMA

[![Deploy to GitHub Pages](https://github.com/fakhri24/perbandingan-berbalik-nilai/actions/workflows/deploy.yml/badge.svg)](https://github.com/fakhri24/perbandingan-berbalik-nilai/actions/workflows/deploy.yml)

Portal media pembelajaran matematika digital berbasis web interaktif untuk materi **Perbandingan Berbalik Nilai (*Inverse Proportion*) & Laju Kerja Simultan (*Work Rate*)**, dirancang sesuai standar **Kurikulum Merdeka (Fase E / Kelas X SMA)**.

🌐 **Demo Langsung (Live Website):**  
[https://fakhri24.github.io/perbandingan-berbalik-nilai/](https://fakhri24.github.io/perbandingan-berbalik-nilai/)

---

## 📚 Fitur-Fitur Utama

### 1. Modul Teori Formal SMA
- Definisi matematis baku relasi berbalik nilai: $x \cdot y = k$ atau $y = \frac{k}{x}$.
- Formulasi perbandingan dua kondisi: $\frac{a_1}{a_2} = \frac{b_2}{b_1} \iff a_1 \cdot b_1 = a_2 \cdot b_2$.
- Tabel perbandingan komprehensif antara **Perbandingan Senilai** vs **Perbandingan Berbalik Nilai**.
- Telaah sifat asimtotik kurva hiperbola siku-siku kuadran I.

### 2. Laboratorium Visual Kurva Hiperbola
- Slider interaktif untuk mengubah nilai konstanta ($k$) dan variabel bebas ($x$).
- Visualisasi grafik dinamis SVG dengan titik koordinat acuan (A, B, C) seperti pada buku materi.
- Demonstrasi invariansi hasil kali $x \cdot y = k$ secara *real-time*.

### 3. Studi Kasus Fisis: Contoh Soal 6 (Mobil di Tol)
- Simulasi hubungan kecepatan rata-rata ($v$) terhadap waktu tempuh ($t$) pada jarak tetap $60\text{ km}$.
- Pilihan ganda interaktif dengan pembahasan langkah demi langkah formal SMA.
- Kalkulator dinamis untuk menguji kecepatan kendaraan apa pun.

### 4. Latihan Mandiri: Soal Nomor 9–12 (Padang Rumput Pak Burhan)
- Pemecahan masalah laju kerja (*work rate*) gabungan (Sapi, Kerbau, Kambing).
- Sistem penilaian skor otomatis dengan umpan balik visual (*confetti* & indikator warna).
- Pembahasan lengkap dengan penalaran matematis terstruktur.

### 5. Fasilitas Pedagogis Guru (Mode Guru)
- **Toggle Kunci Jawaban**: Membuka/menyembunyikan solusi matematis saat presentasi kelas.
- **Cetak LKPD**: Cetak Lembar Kerja Peserta Didik format standar A4 lengkap dengan kop, petunjuk pengerjaan, ruang uraian jawaban siswa, dan kolom paraf guru.

---

## 🛠️ Teknologi yang Digunakan
- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Notasi Rumus Matematika**: KaTeX
- **Ikon**: Lucide React
- **Efek Interaktif**: Canvas Confetti
- **Hosting & CI/CD**: GitHub Actions & GitHub Pages

---

## 🚀 Menjalankan Proyek Secara Lokal

1. **Clone Repositori:**
   ```bash
   git clone https://github.com/fakhri24/perbandingan-berbalik-nilai.git
   cd perbandingan-berbalik-nilai
   ```

2. **Pasang Dependensi:**
   ```bash
   npm install
   ```

3. **Jalankan Server Pengembangan:**
   ```bash
   npm run dev
   ```
   Buka `http://localhost:5173` di browser Anda.

4. **Kompilasi Versi Produksi:**
   ```bash
   npm run build
   ```
