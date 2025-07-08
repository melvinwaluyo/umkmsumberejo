import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { v2 as cloudinary } from 'cloudinary';

// Konfigurasi Cloudinary (wajib ada di sini juga)
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    // 1. Dapatkan data UMKM saat ini untuk memeriksa public_id lama
    const existingUmkm = await db.umkm.findUnique({
      where: { id },
    });

    if (!existingUmkm) {
      return NextResponse.json({ message: "UMKM tidak ditemukan" }, { status: 404 });
    }

    // 2. Jika ada gambar baru (public_id berbeda), hapus gambar lama
    if (body.bannerPublicId && existingUmkm.bannerPublicId && body.bannerPublicId !== existingUmkm.bannerPublicId) {
      await cloudinary.uploader.destroy(existingUmkm.bannerPublicId);
    }

    // 3. Update data UMKM di database dengan field yang diizinkan
    const updatedUmkm = await db.umkm.update({
      where: { id },
      // Hanya sertakan field yang boleh diubah
      data: {
        name: body.name,
        slug: body.slug,
        category: body.category,
        description: body.description,
        address: body.address,
        whatsapp: body.whatsapp,
        bannerUrl: body.bannerUrl,
        bannerPublicId: body.bannerPublicId,
        latitude: parseFloat(body.latitude),
        longitude: parseFloat(body.longitude),
      },
    });

    return NextResponse.json(updatedUmkm);

  } catch (error) {
    console.error("Gagal mengupdate UMKM:", error);
    // Tambahkan detail error dari Prisma untuk debugging
    if (error.code) {
        console.error("Kode Error Prisma:", error.code);
        console.error("Meta Prisma:", error.meta);
    }
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server.", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    // 1. Cari data UMKM lengkap dengan semua produknya
    const umkmToDelete = await db.umkm.findUnique({
      where: { id },
      include: {
        products: { // Sertakan semua produk terkait
          select: {
            imagePublicId: true // Hanya butuh public_id gambarnya
          }
        }
      }
    });

    if (!umkmToDelete) {
      return NextResponse.json({ message: "UMKM tidak ditemukan" }, { status: 404 });
    }

    // --- LOGIKA BARU: KUMPULKAN SEMUA PUBLIC ID ---
    const publicIdsToDelete = [];

    // Tambahkan public_id dari banner UMKM
    if (umkmToDelete.bannerPublicId) {
      publicIdsToDelete.push(umkmToDelete.bannerPublicId);
    }

    // Tambahkan semua public_id dari produk-produknya
    umkmToDelete.products.forEach(product => {
      if (product.imagePublicId) {
        publicIdsToDelete.push(product.imagePublicId);
      }
    });

    // 2. Jika ada gambar yang perlu dihapus, panggil API Cloudinary
    if (publicIdsToDelete.length > 0) {
      console.log(`Mencoba menghapus ${publicIdsToDelete.length} gambar dari Cloudinary...`);
      try {
        // Gunakan delete_resources untuk menghapus banyak gambar sekaligus
        await cloudinary.api.delete_resources(publicIdsToDelete);
        console.log("Gambar berhasil dihapus dari Cloudinary.");
      } catch (cloudinaryError) {
        console.error("Gagal menghapus beberapa gambar di Cloudinary, proses tetap dilanjutkan:", cloudinaryError);
      }
    }

    // 3. Hapus semua produk yang terhubung dari database
    await db.product.deleteMany({
      where: { umkmId: id },
    });

    // 4. Baru hapus UMKM-nya dari database
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