import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Konfigurasi Cloudinary dengan kredensial dari .env
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Fungsi untuk menangani upload stream ke Cloudinary
const handleUpload = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder, // Gunakan folder yang diterima dari parameter
        resource_type: 'auto',
      },
      (error, result) => {
        if (error) {
          // Jika ada error dari Cloudinary, tolak promise
          console.error("Cloudinary Upload Stream Error:", error);
          reject(error);
        } else {
          // Jika berhasil, selesaikan promise dengan hasilnya
          resolve(result);
        }
      }
    );
    // Kirim buffer ke stream
    uploadStream.end(fileBuffer);
  });
};

export async function POST(request) {
  try {
    // 1. Ambil form data dari request
    const formData = await request.formData();
    const file = formData.get('file');
    // 2. Ambil nama folder dari form data, atau gunakan folder default jika tidak ada
    const folder = formData.get('folder') || 'umkmsumberejo/lainnya';

    // 3. Validasi apakah file ada
    if (!file) {
      return NextResponse.json({ message: 'No file uploaded.' }, { status: 400 });
    }

    // 4. Ubah file menjadi Buffer
    const fileBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(fileBuffer);
    
    // 5. Panggil fungsi handleUpload dan kirim buffer beserta nama folder
    const result = await handleUpload(buffer, folder);

    // 6. Kembalikan URL gambar yang aman dan public_id
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