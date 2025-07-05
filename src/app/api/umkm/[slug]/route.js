import { NextResponse } from 'next/server';
import db from '../../../../lib/db';
/**
 * @param {Request} request
 * @param {{ params: { slug: string } }} context
 */
export async function GET(request, context) {
  try {
    const { slug } = await context.params;

    const umkm = await db.umkm.findUnique({
      where: { slug },
      // Sertakan juga data produk yang terhubung dengan UMKM ini
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
    console.error("Gagal mengambil data UMKM:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server.", error: error.message },
      { status: 500 }
    );
  }
}