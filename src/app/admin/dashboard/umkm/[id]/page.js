import db from '@/lib/db';
import { notFound } from 'next/navigation';
import ManageUmkmClient from '@/components/admin/ManageUmkmClient';

// Fungsi untuk memeriksa apakah sebuah string adalah format ObjectID yang valid
function isValidObjectId(id) {
  // ObjectID adalah 24 karakter hex string
  return /^[0-9a-fA-F]{24}$/.test(id);
}

// Fungsi untuk mengambil data UMKM spesifik
async function getUmkmDetails(id) {
    // --- PENAMBAHAN VALIDASI DI SINI ---
    if (!isValidObjectId(id)) {
        // Jika ID tidak valid, langsung tampilkan halaman Not Found
        // tanpa perlu query ke database.
        return null;
    }
    if (!isValidObjectId(id)) {
        // Jika ID tidak valid, langsung tampilkan halaman Not Found
        // tanpa perlu query ke database.
        return null;
    }

    const umkm = await db.umkm.findUnique({
        where: { id },
        include: {
            products: {
                orderBy: {
                    createdAt: 'desc'
                }
            }
        }
    });

    return umkm;
}

// Halaman ini adalah Server Component
export default async function ManageUmkmPage({ params }) {
    const umkm = await getUmkmDetails((await params).id);

    // Jika getUmkmDetails mengembalikan null (karena ID tidak valid atau tidak ditemukan),
    // tampilkan halaman 404.
    if (!umkm) {
        notFound();
    }

    // Render Client Component dan kirim data sebagai props
    return <ManageUmkmClient initialUmkm={umkm} />;
}