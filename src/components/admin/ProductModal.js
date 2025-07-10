"use client";

import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaTimes, FaUpload } from 'react-icons/fa';
import Image from "next/image";

export default function ProductModal({ isOpen, onClose, onFormSubmit, umkmId, initialData = null }) {
  const [formData, setFormData] = useState({});
  const [filePreview, setFilePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const isEditMode = Boolean(initialData);

  useEffect(() => {
    if (isOpen) {
      if (isEditMode && initialData) {
        setFormData(initialData);
        if (initialData.imageUrl) {
          setFilePreview(initialData.imageUrl);
        }
      } else {
        // Reset for "add" mode
        setFormData({
          name: '', description: '', price: '', imageUrl: '', imagePublicId: '', umkmId: umkmId,
        });
        setFilePreview(null);
      }
      setError('');
    }
  }, [isOpen, isEditMode, initialData, umkmId]);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setFilePreview(URL.createObjectURL(file));
    setIsUploading(true);
    setError('');

    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);
      uploadFormData.append('folder', 'umkmsumberejo/gambarproduk');
      
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Gagal mengunggah file.');
      }

      const data = await res.json();
      setFormData(prev => ({
        ...prev,
        imageUrl: data.imageUrl,
        imagePublicId: data.public_id,
      }));

    } catch (err) {
      setError(err.message);
    } finally {
      setIsUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.png', '.jpg'] },
    multiple: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUploading) return alert("Harap tunggu upload gambar selesai.");
    setIsSubmitting(true);
    setError('');

    try {
      // Determine URL and method based on mode
      const url = isEditMode ? `/api/admin/products/${initialData.id}` : '/api/admin/products';
      const method = isEditMode ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || `Gagal ${isEditMode ? 'mengupdate' : 'menambahkan'} produk.`);
      }
      const resultData = await res.json();
      onFormSubmit(resultData); // Callback with new/updated data
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {isEditMode ? 'Edit Produk' : 'Tambah Produk Baru'}
          </h2>
          <button onClick={onClose}><FaTimes className="text-gray-500 hover:text-gray-800 cursor-pointer" /></button>
        </div>
        
        {error && <p className="text-red-600 bg-red-100 p-3 rounded mb-4 text-sm">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" value={formData.name || ''} onChange={handleInputChange} placeholder="Nama Produk" required className="w-full p-3 border rounded text-gray-700" />
          <textarea name="description" value={formData.description || ''} onChange={handleInputChange} placeholder="Deskripsi Produk" rows="3" className="w-full p-3 border rounded text-gray-700"></textarea>
          <input name="price" value={formData.price || ''} onChange={handleInputChange} placeholder="Harga (contoh: Rp 15.000)" required className="w-full p-3 border rounded text-gray-700" />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gambar Produk</label>
            <div {...getRootProps()} className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer">
              <input {...getInputProps()} />
              <FaUpload className="mx-auto text-gray-400 h-6 w-6 mb-1" />
              <p className="text-sm text-gray-600">Seret & lepas gambar di sini</p>
            </div>
            {filePreview && (
              <Image 
                src={filePreview} 
                alt="Preview" 
                width={0}
                height={0}
                sizes="100vw"
                className="mt-2 h-24 w-auto rounded mx-auto"
              />
            )}
          </div>
          
          <div className="flex justify-end gap-4 pt-4 border-t mt-6">
            <button type="button" onClick={onClose} className="px-5 py-2 bg-gray-200 rounded-lg text-gray-800 cursor-pointer hover:bg-gray-300">Batal</button>
            <button type="submit" disabled={isSubmitting || isUploading} className="px-5 py-2 bg-green-600 text-white rounded-lg cursor-pointer hover:bg-green-700 transition-colors disabled:bg-green-300">
              {isSubmitting ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}