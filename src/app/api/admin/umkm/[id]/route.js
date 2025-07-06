import { NextResponse } from 'next/server';
import db from '@/lib/db';
/**
 * @param {Request} request
 * @param {{ params: { slug: string } }} context
 */
export async function GET(request, context) {
  try {
    const { id } = await context.params;

    const umkm = await db.umkm.findUnique({
      where: { id },
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

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    // Hapus dulu semua produk yang terhubung dengan UMKM ini
    await db.product.deleteMany({
      where: { umkmId: id },
    });

    // Baru hapus UMKM-nya
    await db.umkm.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 }); // 204 No Content

  } catch (error) {
    console.error("Gagal menghapus UMKM:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server.", error: error.message },
      { status: 500 }
    );
  }
}