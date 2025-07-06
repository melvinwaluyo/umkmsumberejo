import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(request) {
  try {
    // Hanya menghitung total UMKM dan total Produk
    const totalUmkmPromise = db.umkm.count();
    const totalProductsPromise = db.product.count();

    // Jalankan kedua promise secara paralel
    const [totalUmkm, totalProducts] = await Promise.all([
      totalUmkmPromise,
      totalProductsPromise,
    ]);

    return NextResponse.json({
      totalUmkm,
      totalProducts,
    });

  } catch (error) {
    console.error("Gagal mengambil data statistik:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server.", error: error.message },
      { status: 500 }
    );
  }
}