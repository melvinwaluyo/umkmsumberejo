import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Konfigurasi Cloudinary dengan kredensial dari .env
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, // Pastikan URL yang dihasilkan adalah https
});

export async function POST(request) {
  // --- LANGKAH DEBUGGING ---
  // Cek apakah kredensial terbaca dengan benar di server.
  // Anda akan melihat ini di log terminal Anda.
  console.log("CLOUDINARY_CLOUD_NAME:", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ? "Loaded" : "NOT LOADED");
  console.log("CLOUDINARY_API_KEY:", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY ? "Loaded" : "NOT LOADED");
  console.log("CLOUDINARY_API_SECRET:", process.env.CLOUDINARY_API_SECRET ? "Loaded" : "NOT LOADED");
  // --- AKHIR LANGKAH DEBUGGING ---

  const formData = await request.formData();
  const file = formData.get('file');

  if (!file) {
    return NextResponse.json({ message: 'No file uploaded.' }, { status: 400 });
  }

  try {
    // Ubah file menjadi buffer
    const fileBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(fileBuffer);

    // Konversi buffer menjadi base64 Data URI
    const base64String = `data:${file.type};base64,${buffer.toString('base64')}`;

    // Upload menggunakan base64 string, ini metode yang sangat andal
    const result = await cloudinary.uploader.upload(base64String, {
      folder: 'umkmsumberejo', // Folder tujuan
      resource_type: 'auto',
    });

    // Kembalikan URL yang aman jika berhasil
    return NextResponse.json({
      imageUrl: result.secure_url,
      public_id: result.public_id,
    });

  } catch (error) {
    console.error('API Upload Error:', error);
    return NextResponse.json(
      { message: 'Error uploading file', details: error.message },
      { status: 500 }
    );
  }
}