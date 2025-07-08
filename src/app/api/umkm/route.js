import { NextResponse } from 'next/server';
import db from '@/lib/db';

/**
 * Mengambil semua data UMKM
 * @param {Request} request
 */
export async function GET(request) {
  try {
    // Ambil parameter dari URL
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const category = searchParams.get('category');

    // Bangun klausa 'where' secara dinamis untuk query Prisma
    const whereClause = {};

    if (category && category !== 'Semua') {
      whereClause.category = category;
    }

    if (query) {
      // Cari di nama atau deskripsi, tidak case-sensitive
      whereClause.OR = [
        { name: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ];
    }

    const umkms = await db.umkm.findMany({
      where: whereClause,
      orderBy: {
        updatedAt: 'desc',
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
      whatsapp, bannerUrl, bannerPublicId, latitude, longitude, linktreeUrl
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
        bannerUrl: bannerUrl || "",
        bannerPublicId: bannerPublicId || null,
        linktreeUrl: linktreeUrl || null, // Linktree URL opsional
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