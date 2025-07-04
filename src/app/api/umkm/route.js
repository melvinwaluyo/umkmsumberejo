import { NextResponse } from 'next/server';
import db from '../../lib/db';

/**
 * Mengambil semua data UMKM
 * @param {Request} request
 */
export async function GET(request) {
  try {
    const umkms = await db.umkm.findMany({
      // Urutkan berdasarkan data terbaru
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(umkms);
  } catch (error) {
    console.error("Gagal mengambil data UMKM:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server.", error: error.message },
      { status: 500 }
    );
  }
}

// Fungsi untuk membuat 'slug' dari nama UMKM
// Contoh: "Keripik Singkong Bu Yuni" -> "keripik-singkong-bu-yuni"
function createSlug(name) {
  return name
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}

/**
 * @param {Request} request
 */
export async function POST(request) {
  try {
    // 1. Ambil data JSON dari body request
    const data = await request.json();

    // 2. Validasi data yang masuk (contoh sederhana)
    const { 
      name, category, description, address, 
      whatsapp, bannerUrl, latitude, longitude 
    } = data;

    if (!name || !category || !description || !address || !whatsapp || !latitude || !longitude) {
      return NextResponse.json(
        { message: "Data tidak lengkap. Semua field wajib diisi." },
        { status: 400 } // 400 Bad Request
      );
    }

    // 3. Buat slug secara otomatis dari nama
    const slug = createSlug(name);

    // 4. Cek apakah slug sudah ada di database untuk menghindari duplikasi
    const existingUmkm = await db.umkm.findUnique({
      where: { slug },
    });

    if (existingUmkm) {
      return NextResponse.json(
        { message: "Nama UMKM sudah ada. Silakan gunakan nama lain." },
        { status: 409 } // 409 Conflict
      );
    }

    // 5. Simpan data UMKM baru ke database menggunakan Prisma
    const newUmkm = await db.umkm.create({
      data: {
        name,
        slug, // Gunakan slug yang sudah dibuat
        category,
        description,
        address,
        whatsapp,
        bannerUrl: bannerUrl || "", // Beri nilai default jika bannerUrl tidak ada
        latitude: parseFloat(latitude), // Pastikan tipe data adalah angka
        longitude: parseFloat(longitude),
      },
    });

    // 6. Kembalikan data yang baru dibuat dengan status 201 Created
    return NextResponse.json(newUmkm, { status: 201 });

  } catch (error) {
    console.error("Gagal membuat UMKM:", error);
    // Kembalikan pesan error jika terjadi masalah
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server.", error: error.message },
      { status: 500 } // 500 Internal Server Error
    );
  }
}