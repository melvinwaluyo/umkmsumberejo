"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaPlus, FaUsers, FaBoxOpen, FaMapMarkedAlt, FaEdit, FaTrash, FaSignOutAlt } from 'react-icons/fa';
import { signOut } from 'next-auth/react';

// Komponen ini menerima data awal dari Server Component
export default function DashboardClient({ initialUmkmData, summaryData }) {
  const [umkmList, setUmkmList] = useState(initialUmkmData);
  const router = useRouter();

  const handleDeleteUmkm = async (umkmId, umkmName) => {
    // Tampilkan konfirmasi sebelum menghapus
    if (window.confirm(`Apakah Anda yakin ingin menghapus UMKM "${umkmName}"? Ini akan menghapus semua produk terkait.`)) {
      try {
        const res = await fetch(`/api/admin/umkm/${umkmId}`, {
          method: 'DELETE',
        });

        if (res.ok) {
          // Hapus UMKM dari state agar UI ter-update tanpa refresh
          setUmkmList(umkmList.filter(umkm => umkm.id !== umkmId));
          alert("UMKM berhasil dihapus.");
        } else {
          const data = await res.json();
          alert(`Gagal menghapus: ${data.message}`);
        }
      } catch (error) {
        alert("Terjadi kesalahan saat menghubungi server.");
      }
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header dan Tombol Logout */}
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm text-blue-600 hover:underline">
            ← Kembali ke Situs Utama
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center gap-2 text-sm text-red-600 hover:underline"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      {/* Bagian Ringkasan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
      </div>
      
      {/* Tombol Aksi Utama */}
      <div className="mb-8 flex gap-4">
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
            <FaPlus /> Tambah UMKM Baru
        </button>
      </div>

      {/* Tabel Manajemen UMKM */}
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama UMKM</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah Produk</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {umkmList.map((umkm) => (
              <tr key={umkm.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{umkm.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{umkm.category}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {umkm.products.length}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-x-4"> {/* Bungkus dengan flexbox */}
                      <Link href={`/admin/dashboard/umkm/${umkm.id}`} className="text-indigo-600 hover:text-indigo-900" title="Kelola UMKM & Produk">
                          <FaEdit />
                      </Link>
                      <button onClick={() => handleDeleteUmkm(umkm.id, umkm.name)} className="text-red-600 hover:text-red-900 cursor-pointer" title="Hapus UMKM">
                          <FaTrash />
                      </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}