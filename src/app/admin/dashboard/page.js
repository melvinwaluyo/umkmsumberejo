import DashboardClient from '@/components/admin/DashboardClient';
import db from '@/lib/db';

// Fungsi untuk mengambil data yang dibutuhkan di server dengan penanganan error
async function getDashboardData() {
  try {
    // Jalankan kedua promise secara paralel
    const [umkmResult, statsResult] = await Promise.allSettled([
      // Promise untuk mengambil data UMKM
      db.umkm.findMany({
        orderBy: { name: 'asc' },
        include: {
          products: {
            select: { id: true } // Hanya butuh count, jadi ambil id saja
          }
        }
      }),
      // Promise untuk mengambil data statistik
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stats`, {
        cache: 'no-store'
      }).then(res => {
        if (!res.ok) {
          // Jika API stats gagal, lempar error agar ditangkap oleh Promise.allSettled
          throw new Error(`API stats gagal dengan status: ${res.status}`);
        }
        return res.json();
      })
    ]);

    // Proses hasil dari Promise.allSettled
    const initialUmkmData = umkmResult.status === 'fulfilled' ? umkmResult.value : [];
    const summaryData = statsResult.status === 'fulfilled' ? statsResult.value : { totalUmkm: 0, totalProducts: 0 };
    
    // Fallback jika summaryData tidak memiliki properti yang diharapkan
    if (!summaryData.totalUmkm) summaryData.totalUmkm = 0;
    if (!summaryData.totalProducts) summaryData.totalProducts = 0;


    return { initialUmkmData, summaryData };

  } catch (error) {
    // Fallback jika terjadi error tak terduga
    console.error("Error fatal di getDashboardData:", error);
    return {
      initialUmkmData: [],
      summaryData: { totalUmkm: 0, totalProducts: 0 }
    };
  }
}

export default async function AdminDashboardPage() {
  const { initialUmkmData, summaryData } = await getDashboardData();
  
  // Render komponen client dan teruskan data yang dijamin aman sebagai props
  return (
      <DashboardClient initialUmkmData={initialUmkmData} summaryData={summaryData}/>
  );  
}