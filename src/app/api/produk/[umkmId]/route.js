import { NextResponse } from 'next/server';
import db from '../../../lib/db'; 

/**
 * @param {Request} request
 * @param {{ params: { umkmId: string } }} context
 */
export async function POST(request, context) {
  try {
    // 1. Ambil umkmId dari parameter URL
    const { umkmId } = context.params;

    // 2. Ambil data produk dari body request
    const data = await request.json();
    const { name, price, description, imageUrl } = data;

    // 3. Validasi data
    if (!name || !price || !description) {
      return NextResponse.json(
        { message: "Nama, harga, dan deskripsi produk wajib diisi." },
        { status: 400 } // Bad Request
      );
    }

    // 4. Buat produk baru dan hubungkan dengan UMKM yang ada
    const newProduct = await db.product.create({
      data: {
        name,
        price,
        description,
        imageUrl: imageUrl || "", // Beri nilai default
        umkmId: umkmId, // Hubungkan ke UMKM berdasarkan ID dari URL
      },
    });

    // 5. Kembalikan produk yang baru dibuat
    return NextResponse.json(newProduct, { status: 201 });

  } catch (error) {
    console.error("Gagal menambah produk:", error);

    // Penanganan jika umkmId tidak valid atau error lainnya
    if (error.code === 'P2025') { // Kode error Prisma jika relasi tidak ditemukan
        return NextResponse.json(
            { message: "UMKM dengan ID tersebut tidak ditemukan." },
            { status: 404 } // Not Found
        );
    }

    return NextResponse.json(
      { message: "Terjadi kesalahan pada server.", error: error.message },
      { status: 500 } // Internal Server Error
    );
  }
}