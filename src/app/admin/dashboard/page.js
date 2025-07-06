import DashboardClient from "@/components/admin/DashboardClient";
import db from '@/lib/db';

// Fungsi untuk mengambil data yang dibutuhkan di server
async function getDashboardData() {
  const umkmPromise = db.umkm.findMany({
    orderBy: { name: 'asc' },
    include: {
      products: {
        select: { id: true } // Hanya butuh count, jadi ambil id saja
      }
    }
  });

  const statsPromise = fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stats`, {
    cache: 'no-store'
  }).then(res => res.json());

  // Jalankan kedua promise secara paralel untuk efisiensi
  const [initialUmkmData, summaryData] = await Promise.all([umkmPromise, statsPromise]);
  
  return { initialUmkmData, summaryData };
}

export default async function AdminDashboardPage() {
  const { initialUmkmData, summaryData } = await getDashboardData();
  
  // Render komponen client dan teruskan data sebagai props
  return <DashboardClient initialUmkmData={initialUmkmData} summaryData={summaryData} />;
}