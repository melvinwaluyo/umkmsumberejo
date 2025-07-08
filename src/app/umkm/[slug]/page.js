import ProductCard from '@/components/ProductCard';
import Breadcrumb from "@/components/Breadcrumb";
import { FaMapMarkerAlt, FaWhatsapp, FaInfoCircle, FaLink } from 'react-icons/fa';
import { notFound } from 'next/navigation';

// Fungsi untuk mengambil data spesifik berdasarkan slug
async function getUmkmDetail(slug) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/umkm/${slug}`, {
    cache: 'no-store',
  });

  // Jika API mengembalikan status 404, tampilkan halaman Not Found
  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error('Gagal mengambil detail UMKM');
  }

  return res.json();
}


export default async function UmkmDetailPage({ params }) {
  const { slug } = await params;
  const umkm = await getUmkmDetail(slug);

  const breadcrumbCrumbs = [
    { href: '/', label: 'Home' },
    { href: '/umkm', label: 'Jelajah UMKM' },
    { href: `/umkm/${umkm.slug}`, label: umkm.name }
  ];

  return (
    <div>
      {/* Bagian Banner */}
      <div className="relative h-64 md:h-80">
        <img src={umkm.bannerUrl || "https://apikbersatu.com/wp-content/uploads/2025/02/umkm211.jpg"} alt={`Banner ${umkm.name}`} className="w-full h-full object-cover"/>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center px-4">{umkm.name}</h1>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 bg-amber-50">
        <Breadcrumb crumbs={breadcrumbCrumbs} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Kolom Kiri: Katalog Produk */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Katalog Produk</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {umkm.products && umkm.products.length > 0 ? (
                umkm.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <p className="text-center col-span-full text-gray-500">Belum ada produk untuk UMKM ini.</p>
              )}
            </div>
          </div>

          {/* Kolom Kanan: Informasi UMKM */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md border sticky top-28">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-3 flex items-center gap-3">
                <FaInfoCircle className="text-green-500" /> Tentang Kami
              </h3>
              <p className="text-gray-600 mb-6">{umkm.description}</p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-gray-500 mt-1 w-5 h-5 flex-shrink-0" />
                  <p className="text-gray-700">{umkm.address}</p>
                </div>
                <div className="flex items-center gap-3">
                  <FaWhatsapp className="text-gray-500 w-5 h-5 flex-shrink-0" />
                  <a 
                    href={`https://wa.me/${umkm.whatsapp}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline"
                  >
                    Hubungi via WhatsApp
                  </a>
                </div>
                {umkm.linktreeUrl && (
                  <div className="flex items-center gap-3">
                    <FaLink className="text-gray-500 w-5 h-5 flex-shrink-0" />
                    <a 
                      href={ umkm.linktreeUrl.startsWith('http') ? umkm.linktreeUrl : `https://${umkm.linktreeUrl}` }
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-green-600 hover:underline"
                    >
                      {umkm.linktreeUrl}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};