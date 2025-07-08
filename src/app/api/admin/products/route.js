import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, description, price, imageUrl, imagePublicId, umkmId } = data;

    // Validasi data input
    if (!name || !price || !umkmId) {
      return NextResponse.json({ message: "Nama, harga, dan ID UMKM wajib diisi." }, { status: 400 });
    }

    const newProduct = await db.product.create({
      data: {
        name,
        description,
        price,
        imageUrl,
        imagePublicId,
        umkmId,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });

  } catch (error) {
    console.error("Gagal menambah produk:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server.", error: error.message },
      { status: 500 }
    );
  }
}