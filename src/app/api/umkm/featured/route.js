import { NextResponse } from 'next/server';
import db from '../../../../lib/db'; // Sesuaikan path relatif

/**
 * Mengambil 3 data UMKM yang terakhir di-update.
 * @param {Request} request
 */
export async function GET(request) {
  try {
    const featuredUmkms = await db.umkm.findMany({
      // Mengurutkan berdasarkan field 'updatedAt' secara descending (terbaru dulu)
      orderBy: {
        updatedAt: 'desc',
      },
      // Mengambil hanya 3 data teratas
      take: 3,
    });

    return NextResponse.json(featuredUmkms);
    
  } catch (error) {
    console.error("Gagal mengambil data UMKM unggulan:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server.", error: error.message },
      { status: 500 }
    );
  }
}