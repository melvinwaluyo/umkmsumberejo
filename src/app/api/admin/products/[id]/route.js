import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { v2 as cloudinary } from 'cloudinary';

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// --- FUNGSI PUT YANG SUDAH DIPERBARUI ---
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    // 1. Ambil data produk yang ada saat ini dari database
    const existingProduct = await db.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json({ message: "Produk tidak ditemukan" }, { status: 404 });
    }

    // 2. Logika untuk menghapus gambar lama
    // Cek jika ada gambar baru (imagePublicId baru) DAN ada gambar lama,
    // DAN keduanya tidak sama.
    if (body.imagePublicId && existingProduct.imagePublicId && body.imagePublicId !== existingProduct.imagePublicId) {
      console.log(`Menghapus gambar lama: ${existingProduct.imagePublicId}`);
      await cloudinary.uploader.destroy(existingProduct.imagePublicId);
    }

    // 3. Update data produk di database dengan data baru
    const updatedProduct = await db.product.update({
      where: { id },
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        imageUrl: body.imageUrl,
        imagePublicId: body.imagePublicId,
      },
    });

    return NextResponse.json(updatedProduct);

  } catch (error) {
    console.error("Gagal mengupdate produk:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server.", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    // 1. Cari data produk untuk mendapatkan public_id gambarnya
    const productToDelete = await db.product.findUnique({
      where: { id },
    });

    if (!productToDelete) {
      return NextResponse.json({ message: "Produk tidak ditemukan" }, { status: 404 });
    }

    // 2. Hapus gambar di Cloudinary jika ada
    if (productToDelete.imagePublicId) {
      await cloudinary.uploader.destroy(productToDelete.imagePublicId);
    }

    // 3. Hapus produk dari database
    await db.product.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 }); // 204 No Content

  } catch (error) {
    console.error("Gagal menghapus produk:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server.", error: error.message },
      { status: 500 }
    );
  }
}