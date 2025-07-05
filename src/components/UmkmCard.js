import Link from 'next/link';

const UmkmCard = ({ umkm }) => {
  // Fungsi untuk memotong deskripsi jika terlalu panjang
  const truncateDescription = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  };

  return (
    <Link href={`/umkm/${umkm.slug}`}>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full group transform hover:-translate-y-2 transition-all duration-300">
        <div className="relative w-full h-48">
          <img 
            // Gunakan bannerUrl dari database
            src={umkm.bannerUrl || "https://via.placeholder.com/300x200?text=Gambar+UMKM"} 
            alt={`Gambar untuk ${umkm.name}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 bg-green-700 text-white text-xs font-semibold px-2 py-1 rounded-full">
            {umkm.category}
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 group-hover:text-green-700 transition-colors duration-300">
            {umkm.name}
          </h3>
          {/* Gunakan description dari database dan potong jika perlu */}
          <p className="text-gray-600 mt-2 text-sm h-16">
            {truncateDescription(umkm.description, 100)}
          </p>
          <div className="mt-4">
            <span className="text-green-700 font-semibold">
              Lihat Detail →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default UmkmCard;