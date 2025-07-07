import { NextResponse } from 'next/server';
import db from '@/lib/db'; // Pastikan path ini benar

/**
 * Mengambil satu data UMKM berdasarkan SLUG-nya
 * @param {Request} request
 * @param {{ params: { slug: string } }} context
 */
export async function GET(request, { params }) {
  try {
    
    const { slug } = await params;

    // Cari UMKM berdasarkan field 'slug' yang unik
    const umkm = await db.umkm.findUnique({
      where: { slug },
      // Sertakan juga semua produk yang terhubung
      include: {
        products: true,
      },
    });

    if (!umkm) {
      return NextResponse.json(
        { message: "UMKM tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(umkm);

  } catch (error) {
    console.error("Gagal mengambil data UMKM by slug:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server.", error: error.message },
      { status: 500 }
    );
  }
}