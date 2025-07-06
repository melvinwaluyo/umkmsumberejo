import db from '@/lib/db';
import { notFound } from 'next/navigation';
import ManageUmkmClient from '@/components/admin/ManageUmkmClient';

// Fungsi untuk mengambil data UMKM spesifik
async function getUmkmDetails(id) {
    const umkm = await db.umkm.findUnique({
        where: { id },
        include: {
            // Sertakan semua produk yang terhubung dengan UMKM ini
            products: {
                orderBy: {
                    createdAt: 'desc'
                }
            }
        }
    });

    if (!umkm) {
        notFound(); // Tampilkan halaman 404 jika ID tidak ditemukan
    }
    return umkm;
}

// Halaman ini adalah Server Component
export default async function ManageUmkmPage({ params }) {
    // 1. Ambil data di server
    const awaitedParams = await params;
    const umkm = await getUmkmDetails(awaitedParams.id);

    // 2. Render Client Component dan kirim data sebagai props
    return <ManageUmkmClient initialUmkm={umkm} />;
}