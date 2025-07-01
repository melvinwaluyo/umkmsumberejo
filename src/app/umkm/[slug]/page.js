import ProductCard from '../../components/ProductCard';
import { FaMapMarkerAlt, FaWhatsapp, FaInfoCircle } from 'react-icons/fa';

// --- DATA DUMMY UNTUK SATU UMKM ---
// Nantinya, Anda akan mengambil data ini dari database berdasarkan 'slug' dari URL.
const umkmDetailData = {
  name: "Keripik Singkong Bu Yuni",
  slug: "keripik-bu-yuni",
  category: "Kuliner",
  bannerUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Warung_in_Garut.JPG",
  description: "Selamat datang di Keripik Singkong Bu Yuni! Kami adalah usaha rumahan yang berdedikasi untuk menyajikan camilan singkong terbaik di Sumberejo. Semua produk kami dibuat dari singkong pilihan dari petani lokal dan diolah dengan resep warisan keluarga, menjamin rasa yang otentik, renyah, dan selalu bikin nagih. Tanpa bahan pengawet dan MSG, camilan kami sehat untuk seluruh keluarga.",
  address: "Jl. Mawar No. 15, Dusun Kenteng, Sumberejo, Semin",
  whatsapp: "6281234567890", // Format internasional tanpa '+'
  products: [
    {
      id: 1,
      name: "Keripik Singkong Original",
      price: "Rp 15.000 / bungkus",
      description: "Rasa asli singkong yang gurih dan renyah, favorit semua orang.",
      imageUrl: "https://down-id.img.susercontent.com/file/0bfb160dd8672bf2136d6e31377c2c0d"
    },
    {
      id: 2,
      name: "Keripik Singkong Balado",
      price: "Rp 17.000 / bungkus",
      description: "Pedas manis yang pas, dibalut dengan bumbu balado khas rumahan.",
      imageUrl: "https://i0.wp.com/www.tokomesin.com/wp-content/uploads/2017/09/singkong-balado-pedas.png?fit=555%2C416&ssl=1"
    },
    {
      id: 3,
      name: "Keripik Singkong Keju",
      price: "Rp 17.000 / bungkus",
      description: "Gurihnya keju premium yang melimpah, disukai anak-anak.",
      imageUrl: "https://www.tokomesin.com/wp-content/uploads/2017/10/Keripik-singkong-keju.jpg"
    },
    {
        id: 4,
        name: "Keripik Singkong Jagung Bakar",
        price: "Rp 17.000 / bungkus",
        description: "Aroma jagung bakar yang khas, cocok untuk teman nonton.",
        imageUrl: "https://images.tokopedia.net/img/cache/500-square/VqbcmM/2023/11/10/1a51fd99-6d1f-4fb3-9000-7824349722d0.jpg"
      }
  ]
};
// --- AKHIR DATA DUMMY ---

// params.slug akan berisi nilai dari URL, contoh: "keripik-bu-yuni"
const UmkmDetailPage = ({ params }) => {
  const umkm = umkmDetailData; // Untuk sekarang kita pakai data dummy langsung

  return (
    <div>
      {/* Bagian Banner */}
      <div className="relative h-64 md:h-80">
        <img src={umkm.bannerUrl} alt={`Banner ${umkm.name}`} className="w-full h-full object-cover"/>
        <div className="absolute inset-0 0 bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center px-4">{umkm.name}</h1>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Kolom Kiri: Katalog Produk */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-green-800 mb-6">Katalog Produk</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {umkm.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* Kolom Kanan: Informasi UMKM */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md border sticky top-28">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-3 flex items-center gap-3">
                <FaInfoCircle className="text-green-700" /> Tentang Kami
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
                    className="text-green-700 hover:underline"
                  >
                    Hubungi via WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UmkmDetailPage;