import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { v2 as cloudinary } from 'cloudinary';

// Konfigurasi Cloudinary (wajib ada di sini juga)
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


export async function DELETE(request, { params }) {
  try {
    // --- PERBAIKAN 1: Await params ---
    const { id } = await params;

    // 1. Cari data UMKM terlebih dahulu untuk mendapatkan public_id
    const umkmToDelete = await db.umkm.findUnique({
      where: { id },
    });

    if (!umkmToDelete) {
      return NextResponse.json({ message: "UMKM tidak ditemukan" }, { status: 404 });
    }

    // 2. Hapus gambar di Cloudinary jika public_id ada
    if (umkmToDelete.bannerPublicId) {
      console.log(`Mencoba menghapus gambar dengan public_id: ${umkmToDelete.bannerPublicId}`);
      try {
        // --- PERBAIKAN 2: Logika Penghapusan Cloudinary ---
        const deleteResult = await cloudinary.uploader.destroy(umkmToDelete.bannerPublicId);
        
        // Log hasil dari Cloudinary untuk debugging
        console.log("Hasil penghapusan Cloudinary:", deleteResult);

        if (deleteResult.result !== 'ok') {
            // Jika hasilnya bukan 'ok', catat sebagai peringatan tapi jangan hentikan proses
            console.warn(`Peringatan: Gagal menghapus gambar di Cloudinary, respons: ${deleteResult.result}`);
        }

      } catch (cloudinaryError) {
        console.error("Error saat menghubungi API Cloudinary:", cloudinaryError);
      }
    }

    // 3. Hapus dulu semua produk yang terhubung dengan UMKM ini
    await db.product.deleteMany({
      where: { umkmId: id },
    });

    // 4. Baru hapus UMKM-nya dari database
    await db.umkm.delete({
      where: { id },
    });

    // Berhasil
    return new NextResponse(null, { status: 204 }); 

  } catch (error) {
    console.error("Gagal menghapus UMKM:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server.", error: error.message },
      { status: 500 }
    );
  }
}