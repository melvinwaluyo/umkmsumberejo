import Link from 'next/link';
import { FaPlus, FaUsers, FaBoxOpen, FaMapMarkedAlt } from 'react-icons/fa';

const AdminDashboardPage = () => {
  // Data dummy untuk ringkasan
  const summaryData = {
    totalUmkm: 6,
    totalProducts: 25,
    categories: 4,
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <Link href="/">
            <span className="text-sm text-green-700 hover:underline">← Kembali ke Situs Utama</span>
        </Link>
      </div>
      
      {/* Bagian Ringkasan */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-white rounded-lg shadow-md flex items-center gap-4">
          <FaUsers className="w-10 h-10 text-blue-500" />
          <div>
            <p className="text-gray-500">Total UMKM</p>
            <p className="text-2xl font-bold text-gray-800">{summaryData.totalUmkm}</p>
          </div>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md flex items-center gap-4">
          <FaBoxOpen className="w-10 h-10 text-green-500" />
          <div>
            <p className="text-gray-500">Total Produk</p>
            <p className="text-2xl font-bold text-gray-800">{summaryData.totalProducts}</p>
          </div>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md flex items-center gap-4">
          <FaMapMarkedAlt className="w-10 h-10 text-red-500" />
          <div>
            <p className="text-gray-500">Jumlah Kategori</p>
            <p className="text-2xl font-bold text-gray-800">{summaryData.categories}</p>
          </div>
        </div>
      </div>

      {/* Bagian Aksi Cepat */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Manajemen Data</h2>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <p className="text-gray-600 mb-4">Tambahkan data baru ke dalam sistem. Klik tombol di bawah untuk membuka halaman form penambahan data.</p>
          <div className="flex flex-wrap gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
              <FaPlus /> Tambah UMKM Baru
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors">
              <FaPlus /> Tambah Produk
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors">
              Kelola Kategori
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;