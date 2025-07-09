"use client";

import { useState, useCallback, useMemo, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaTimes, FaUpload } from 'react-icons/fa';
import dynamic from 'next/dynamic';

// Komponen Modal yang bisa untuk mode Tambah dan Edit
export default function UmkmModal({ isOpen, onClose, onFormSubmit, initialData = null }) {
  // --- STATE MANAGEMENT ---
  const [formData, setFormData] = useState({});
  const [filePreview, setFilePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Tentukan mode berdasarkan adanya initialData
  const isEditMode = Boolean(initialData);

  // --- EFEK UNTUK MENGISI/RESET FORM ---
  useEffect(() => {
    if (isOpen) {
      if (isEditMode && initialData) {
        // Mode Edit: isi form dengan data yang sudah ada
        setFormData(initialData);
        if (initialData.bannerUrl) {
          setFilePreview(initialData.bannerUrl);
        }
      } else {
        // Mode Tambah: reset form ke kondisi kosong
        resetForm();
      }
      setError('');
    }
  }, [isOpen, isEditMode, initialData]);

  // Fungsi untuk mereset form
  const resetForm = () => {
    setFormData({
        name: '', category: 'Kuliner', description: '', address: '',
        whatsapp: '', bannerUrl: '', bannerPublicId: '', latitude: '', longitude: '', linktreeUrl: ''
    });
    setFilePreview(null);
    setError('');
  };

  // --- MAPS & UPLOAD LOGIC (Tidak Berubah) ---
  const MapWithNoSSR = useMemo(() => dynamic(() => import('./LocationPickerMap'), { ssr: false }), []);
  const handleLocationSelect = useCallback((lat, lng) => {
    setFormData(prev => ({ ...prev, latitude: lat, longitude: lng }));
  }, []);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;
    setFilePreview(URL.createObjectURL(file));
    setIsUploading(true);
    setError('');
    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: uploadFormData });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Gagal mengunggah file.');
      }
      const data = await res.json();
      setFormData(prev => ({
        ...prev,
        bannerUrl: data.imageUrl,
        bannerPublicId: data.public_id
      }));
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.png', '.jpg', '.gif'] },
    multiple: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // --- FUNGSI SUBMIT YANG DINAMIS ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUploading) {
      alert("Harap tunggu hingga proses upload gambar selesai.");
      return;
    }
    setIsSubmitting(true);
    setError('');

    try {
      // Tentukan URL dan method berdasarkan mode
      const url = isEditMode ? `/api/admin/umkm/${initialData.id}` : '/api/umkm';
      const method = isEditMode ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || `Gagal ${isEditMode ? 'mengupdate' : 'menambahkan'} UMKM.`);
      }

      const resultData = await res.json();
      onFormSubmit(resultData); // Panggil callback dengan data baru/terupdate
      onClose();

    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-3xl max-h-[95vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {isEditMode ? 'Edit Detail UMKM' : 'Tambah UMKM Baru'}
          </h2>
          <button onClick={onClose}><FaTimes className="text-gray-500 hover:text-gray-800 cursor-pointer" /></button>
        </div>
        
        {error && <p className="text-red-600 bg-red-100 p-3 rounded mb-4 text-sm">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Inputs di-binding dengan 'value' dari formData */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input name="name" value={formData.name || ''} onChange={handleInputChange} placeholder="Nama UMKM" required className="w-full p-3 border rounded text-gray-700 focus:ring-2 focus:ring-green-500" />
            <select
              name="category"
              value={formData.category || 'Kuliner'}
              onChange={handleInputChange}
              required
              className="w-full p-3 border rounded text-gray-700 focus:ring-2 focus:ring-green-500 bg-white"
            >
              <option value="Kuliner">Kuliner</option>
              <option value="Kerajinan">Kerajinan</option>
              <option value="Jasa">Jasa</option>
              {/*  Bisa tambah kategori lain di sini nanti */}
            </select>
          </div>
          <textarea name="description" value={formData.description || ''} onChange={handleInputChange} placeholder="Deskripsi Lengkap UMKM" required rows="4" className="w-full p-3 border rounded text-gray-700 focus:ring-2 focus:ring-green-500"></textarea>
          <input name="address" value={formData.address || ''} onChange={handleInputChange} placeholder="Alamat" required className="w-full p-3 border rounded text-gray-700 focus:ring-2 focus:ring-green-500" />
          <input name="whatsapp" value={formData.whatsapp || ''} onChange={handleInputChange} placeholder="Nomor WhatsApp (contoh: 628123...)" required className="w-full p-3 border rounded text-gray-700 focus:ring-2 focus:ring-green-500" />
          <input name="linktreeUrl" value={formData.linktreeUrl || ''} onChange={handleInputChange} placeholder="Linktree/Bento/Milkshake/... (opsional)" className="w-full p-3 border rounded text-gray-700 focus:ring-2 focus:ring-green-500" />

          {/* Drag and Drop Area */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Banner UMKM</label>
            <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50 hover:border-gray-400'}`}>
              <input {...getInputProps()} />
              <FaUpload className="mx-auto text-gray-400 h-8 w-8 mb-2" />
              <p className="text-gray-700">{isDragActive ? 'Lepaskan file di sini...' : 'Seret & lepas gambar, atau klik untuk memilih'}</p>
            </div>
            {isUploading && <p className="text-sm text-gray-500 mt-2">Mengunggah gambar...</p>}
            {filePreview && <img src={filePreview} alt="Preview" className="mt-4 h-32 w-auto rounded-lg object-cover mx-auto shadow-md"/>}
          </div>

          {/* Map & Lat/Lng Inputs */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi UMKM</label>
            <div className="h-64 w-full rounded-lg overflow-hidden shadow-inner border">
              <MapWithNoSSR 
                onLocationSelect={handleLocationSelect}
                latitude={formData.latitude}
                longitude={formData.longitude}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <input name="latitude" type="number" step="any" value={formData.latitude || ''} onChange={handleInputChange} placeholder="Latitude" required className="w-full p-3 border rounded text-gray-700 focus:ring-2 focus:ring-green-500" />
              <input name="longitude" type="number" step="any" value={formData.longitude || ''} onChange={handleInputChange} placeholder="Longitude" required className="w-full p-3 border rounded text-gray-700 focus:ring-2 focus:ring-green-500" />
            </div>
          </div>
          
          <div className="flex justify-end gap-4 pt-4 border-t mt-6">
            <button type="button" onClick={onClose} className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 cursor-pointer">Batal</button>
            <button type="submit" disabled={isSubmitting || isUploading} className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-300 cursor-pointer">
              {isSubmitting ? 'Menyimpan...' : (isEditMode ? 'Simpan Perubahan' : 'Simpan UMKM')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}