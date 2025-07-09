"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaPlus, FaUsers, FaBoxOpen, FaEdit, FaTrash, FaSignOutAlt, FaPenSquare } from 'react-icons/fa';
import { signOut } from 'next-auth/react';
import toast from 'react-hot-toast';
import UmkmModal from "./UmkmModal";
import ConfirmModal from './ConfirmModal';

// Komponen ini menerima data awal dari Server Component
export default function DashboardClient({ initialUmkmData, summaryData }) {
  const [umkmList, setUmkmList] = useState(initialUmkmData || []);
  const [isUmkmModalOpen, setIsUmkmModalOpen] = useState(false);
  const router = useRouter();

  // State untuk modal konfirmasi hapus
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [umkmToDelete, setUmkmToDelete] = useState(null);

  // Ambil URL Sanity Studio dari environment variable
  const sanityStudioUrl = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL;

  // Fungsi untuk membuka modal konfirmasi
  const handleOpenConfirmModal = (umkm) => {
    setUmkmToDelete(umkm);
    setIsConfirmModalOpen(true);
  };

  // Fungsi yang dijalankan saat penghapusan dikonfirmasi
  const handleConfirmDelete = async () => {
    if (!umkmToDelete) return;
    
    const toastId = toast.loading('Menghapus UMKM...');
    try {
      const res = await fetch(`/api/admin/umkm/${umkmToDelete.id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast.success(`UMKM "${umkmToDelete.name}" berhasil dihapus.`, { id: toastId });
        setUmkmList(prevList => prevList.filter(umkm => umkm.id !== umkmToDelete.id));
        router.refresh(); // Segarkan data statistik
      } else {
        const data = await res.json();
        toast.error(`Gagal menghapus: ${data.message}`, { id: toastId });
      }
    } catch (error) {
      toast.error("Terjadi kesalahan pada server.", { id: toastId });
    } finally {
      setIsConfirmModalOpen(false);
      setUmkmToDelete(null);
    }
  };

  // Fungsi setelah UMKM baru berhasil ditambahkan
  const handleUmkmAdded = (newUmkm) => {
    setUmkmList(prevList => [newUmkm, ...prevList]);
    router.refresh(); // Segarkan data statistik
  };

  return (
    <>
      {/* Modal untuk Tambah/Edit UMKM */}
      <UmkmModal 
        isOpen={isUmkmModalOpen}
        onClose={() => setIsUmkmModalOpen(false)}
        onFormSubmit={handleUmkmAdded}
      />
      
      {/* Modal untuk Konfirmasi Hapus */}
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Konfirmasi Penghapusan"
        message={`Apakah Anda yakin ingin menghapus UMKM "${umkmToDelete?.name}"? Tindakan ini akan menghapus semua produk dan gambar terkait.`}
      />
      
      <div className="container mx-auto px-6 py-8">
        {/* Header dan Tombol Logout */}
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm text-green-600 hover:underline">
              ← Kembali ke Situs Utama
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="flex items-center gap-2 text-sm text-red-600 hover:underline cursor-pointer"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>

        {/* Bagian Ringkasan Statistik */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 bg-white rounded-lg shadow-md flex items-center gap-4">
            <FaUsers className="w-10 h-10 text-blue-500" />
            <div>
              <p className="text-gray-500">Total UMKM</p>
              <p className="text-2xl font-bold text-gray-800">{summaryData?.totalUmkm || 0}</p>
            </div>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md flex items-center gap-4">
            <FaBoxOpen className="w-10 h-10 text-green-500" />
            <div>
              <p className="text-gray-500">Total Produk</p>
              <p className="text-2xl font-bold text-gray-800">{summaryData?.totalProducts || 0}</p>
            </div>
          </div>
        </div>
        
        {/* Tombol Aksi Utama */}
        <div className="mb-8 flex flex-wrap gap-4">
          <button
            onClick={() => setIsUmkmModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors cursor-pointer"
          >
            <FaPlus /> Tambah UMKM Baru
          </button>
          <a
            href={sanityStudioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors cursor-pointer"
          >
            <FaPenSquare /> Kelola Konten Artikel
          </a>
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
              {Array.isArray(umkmList) && umkmList.map((umkm) => (
                <tr key={umkm.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{umkm.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{umkm.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {umkm.products?.length || 0}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-x-4">
                      <Link href={`/admin/dashboard/umkm/${umkm.id}`} className="text-indigo-600 hover:text-indigo-900" title="Kelola UMKM & Produk">
                        <FaEdit />
                      </Link>
                      <button onClick={() => handleOpenConfirmModal(umkm)} className="text-red-600 hover:text-red-900 cursor-pointer" title="Hapus UMKM">
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
    </>
  );
}