# Website UMKM Sumberejo

Selamat datang di repositori proyek Website UMKM Sumberejo. Proyek ini bertujuan untuk membuat portal digital yang menampilkan dan mempromosikan Usaha Mikro, Kecil, dan Menengah (UMKM) yang ada di Kelurahan Sumberejo, Semin, Gunungkidul.

Website ini berfungsi sebagai etalase digital, menyediakan pemetaan lokasi, katalog produk, dan artikel yang relevan untuk meningkatkan visibilitas dan jangkauan pasar bagi para pelaku usaha lokal.

## Fitur Utama

- **Pemetaan UMKM**: Peta interaktif yang menunjukkan lokasi setiap UMKM untuk memudahkan pencarian geografis.

- **Profil Detail UMKM**: Setiap UMKM memiliki halaman profil sendiri yang menampilkan deskripsi, informasi kontak, galeri produk, dan tautan media sosial.

- **Katalog Produk**: Pengunjung dapat menjelajahi produk-produk yang ditawarkan oleh setiap UMKM.

- **Pencarian & Filter**: Pengguna dapat dengan mudah mencari UMKM berdasarkan nama atau memfilternya berdasarkan kategori (contoh: Kuliner, Kerajinan).

- **Sistem Artikel**: Halaman artikel yang dikelola melalui Sanity CMS untuk membagikan berita, tips, atau wawasan seputar dunia UMKM.

- **Dashboard Admin**: Panel administrasi yang dilindungi dengan sistem login untuk mengelola data UMKM, produk, dan konten lainnya (CRUD).

## Teknologi yang Digunakan

Proyek ini dibangun menggunakan tumpukan teknologi modern yang berfokus pada performa dan pengalaman pengembang.

- **Framework**: Next.js (React Framework)
- **Styling**: Tailwind CSS
- **Database**: MongoDB dengan Prisma sebagai ORM
- **Autentikasi**: NextAuth.js
- **Manajemen Konten (CMS)**: Sanity.io untuk halaman artikel
- **Peta**: Google Maps Platform dengan @vis.gl/react-google-maps
- **Upload Gambar**: Cloudinary
- **Deployment**: Vercel

## Cara Menjalankan Proyek Secara Lokal

Untuk menjalankan proyek ini di lingkungan lokal Anda, ikuti langkah-langkah berikut:

### 1. Kloning Repositori

```bash
git clone https://github.com/melvinwaluyo/umkmsumberejo.git
cd umkmsumberejo
```

### 2. Instalasi Dependensi

```bash
npm install
```

### 3. Konfigurasi Environment Variables

Buat file baru bernama `.env` di direktori root proyek dan isi dengan kredensial yang diperlukan. Salin contoh dari `.env.example`, atau isi dengan format berikut:

```env
# MongoDB
DATABASE_URL="mongodb+srv://..."

# NextAuth
NEXTAUTH_SECRET="your-super-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Google Maps API
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="your-google-maps-api-key"

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
NEXT_PUBLIC_CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID="your-sanity-project-id"
NEXT_PUBLIC_SANITY_STUDIO_URL="https://your-project.sanity.studio/"

# Google Form
NEXT_PUBLIC_GOOGLE_FORM_URL="your-google-form-link"
```

### 4. Sinkronisasi Database Prisma

Jalankan perintah berikut untuk memastikan klien Prisma Anda sinkron dengan skema:

```bash
npx prisma generate
```

### 5. Jalankan Server Pengembangan

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda untuk melihat hasilnya.

## Sanity Studio (CMS)

Proyek ini menggunakan Sanity untuk manajemen konten artikel. Studio (CMS) berada di dalam sub-folder `sanity-studio`. Untuk menjalankannya:

1. Masuk ke direktori studio:

   ```bash
   cd sanity-studio
   ```

2. Instal dependensi:

   ```bash
   npm install
   ```

3. Jalankan studio secara lokal:
   ```bash
   sanity start
   ```

Studio akan berjalan di [http://localhost:3333](http://localhost:3333).
