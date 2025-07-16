"use client";

import { useState } from 'react';
import { FaEdit, FaTrash, FaPlus, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import toast from "react-hot-toast";
import UmkmModal from "./UmkmModal";
import ProductModal from "./ProductModal";
import ConfirmModal from "./ConfirmModal";

// Komponen ini menerima data dari Server Component
export default function ManageUmkmClient({ initialUmkm }) {
    const [umkm, setUmkm] = useState(initialUmkm);
    const [products, setProducts] = useState(initialUmkm.products);

    const [isUmkmModalOpen, setIsUmkmModalOpen] = useState(false);
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    // Fungsi ini akan mengupdate UI setelah edit berhasil
    const handleUmkmUpdated = (updatedUmkm) => {
        setUmkm(updatedUmkm);
    };

     const handleProductFormSubmit = (resultProduct) => {
      if (productToEdit) {
        // Edit Mode: Update the existing product in the list
        setProducts(prev => prev.map(p => p.id === resultProduct.id ? resultProduct : p));
      } else {
        // Add Mode: Add the new product to the top of the list
        setProducts(prev => [resultProduct, ...prev]);
      }
      setProductToEdit(null); // Reset after submit
    };

    const handleOpenDeleteConfirm = (product) => {
        setProductToDelete(product);
        setIsConfirmModalOpen(true);
    };

    const handleConfirmDeleteProduct = async () => {
        if (!productToDelete) return;
        
        const toastId = toast.loading('Menghapus produk...');
        try {
            const res = await fetch(`/api/admin/products/${productToDelete.id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                toast.success(`Produk "${productToDelete.name}" berhasil dihapus.`, { id: toastId });
                setProducts(prev => prev.filter(p => p.id !== productToDelete.id));
            } else {
                const data = await res.json();
                toast.error(`Gagal menghapus: ${data.message}`, { id: toastId });
            }
        } catch (error) {
            toast.error("Terjadi kesalahan pada server.", { id: toastId });
        } finally {
            setIsConfirmModalOpen(false);
            setProductToDelete(null);
        }
    };

    const handleOpenAddProductModal = () => {
      setProductToEdit(null); // Ensure no initial data for "add" mode
      setIsProductModalOpen(true);
    };

    const handleOpenEditProductModal = (product) => {
      setProductToEdit(product); // Set the product to be edited
      setIsProductModalOpen(true);
    };

    return (
        <>
            <UmkmModal
                    isOpen={isUmkmModalOpen}
                    onClose={() => setIsUmkmModalOpen(false)}
                    onFormSubmit={handleUmkmUpdated}
                    initialData={umkm} // Kirim data UMKM saat ini untuk mode edit
            />

             <ProductModal
                isOpen={isProductModalOpen}
                onClose={() => setIsProductModalOpen(false)}
                onFormSubmit={handleProductFormSubmit}
                umkmId={umkm.id} // Kirim ID UMKM sebagai parent
                initialData={productToEdit} // Pass the product to edit
            />

            <ConfirmModal
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                onConfirm={handleConfirmDeleteProduct}
                title="Konfirmasi Hapus Produk"
                message={`Anda yakin ingin menghapus produk "${productToDelete?.name}"? Tindakan ini tidak dapat dibatalkan.`}
            />
            <div className="container mx-auto px-6 py-8 bg-amber-50 min-h-screen">
                {/* Header Halaman */}
                <div className="mb-8">
                    <Link href="/admin/dashboard" className="text-green-600 hover:underline flex items-center gap-2 mb-4">
                        <FaArrowLeft /> Kembali ke Dashboard
                    </Link>
                    {/* Banner UMKM */}
                    <div className="relative w-full h-48 md:h-64 rounded-lg overflow-hidden shadow-lg mb-4">
                        <Image
                            src={(umkm.bannerUrl || "https://dummyimage.com/1200x400/000/fff&text=Banner+UMKM").trim()}
                            alt={`Banner ${umkm.name}`}
                            fill // Replaces layout="fill"
                            className="object-cover" // Replaces objectFit="cover"
                            priority
                        />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800">{umkm.name}</h1>
                    <p className="text-lg text-gray-600">{umkm.category}</p>
                </div>

                {/* Bagian Detail UMKM */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Detail UMKM</h2>
                    {/* Deskripsi UMKM */}
                    <p className="text-gray-700 mb-6 whitespace-pre-line">{umkm.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 border-t pt-4">
                        <div><strong>Alamat:</strong> {umkm.address}</div>
                        <div><strong>WhatsApp:</strong> <a href={`https://wa.me/${umkm.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">{umkm.whatsapp}</a></div>
                        {umkm.linktreeUrl && (
                            <div><strong>Tautan:</strong> <a href={ umkm.linktreeUrl.startsWith('http') ? umkm.linktreeUrl : `https://${umkm.linktreeUrl}` } target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">{umkm.linktreeUrl}</a></div>
                        )}
                        <div><strong>Latitude:</strong> {umkm.latitude}</div>
                        <div><strong>Longitude:</strong> {umkm.longitude}</div>
                    </div>
                    <div>
                        <button 
                            onClick={() => setIsUmkmModalOpen(true)}
                            className="mt-6 flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg cursor-pointer hover:bg-yellow-600 transition-colors"
                        >
                            <FaEdit /> Edit Detail UMKM
                        </button>
                    </div>
                </div>

                {/* Bagian Manajemen Katalog Produk */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-gray-800">Katalog Produk</h2>
                        <button 
                            onClick={handleOpenAddProductModal}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg cursor-pointer hover:bg-green-800 transition-colors"
                        >
                            <FaPlus /> Tambah Produk Baru
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Produk</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Harga</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {products.length > 0 ? products.map((product) => (
                                    <tr key={product.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-16 w-16">
                                                    <Image
                                                        src={(product.imageUrl || "https://dummyimage.com/100x100/000/fff&text=Produk").trim()}
                                                        alt={product.name}
                                                        width={64}
                                                        height={64}
                                                        className="h-16 w-16 rounded-md object-cover" // object-cover here
                                                    />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                                    <div className="text-sm text-gray-500 whitespace-pre-line">{product.description}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.price}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button 
                                              onClick={() => handleOpenEditProductModal(product)} 
                                              className="text-indigo-600 hover:text-indigo-900 mr-4 cursor-pointer"
                                            >
                                              <FaEdit />
                                            </button>
                                            <button 
                                                onClick={() => handleOpenDeleteConfirm(product)}
                                                className="text-red-600 hover:text-red-900 cursor-pointer"
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="3" className="px-6 py-4 text-center text-gray-500">Belum ada produk untuk UMKM ini.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}