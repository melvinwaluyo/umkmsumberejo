import Link from 'next/link';

const PetaPreview = () => {
  return (
    <section className="bg-amber-950 text-white">
      <div className="container mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        {/* Kolom Teks */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Temukan Lokasi UMKM</h2>
          <p className="text-gray-300 mb-8">
            Lihat sebaran lokasi UMKM di seluruh Kelurahan Sumberejo melalui peta interaktif kami. Temukan UMKM terdekat dari lokasi Anda dengan mudah.
          </p>
          <Link href="/pemetaan">
            <span className="bg-yellow-800 text-white font-bold py-3 px-8 rounded-full hover:bg-green-900 transition duration-300">
              Lihat Peta Lengkap
            </span>
          </Link>
        </div>
        
        {/* Kolom Gambar Peta (Placeholder) */}
        <div className="relative w-full h-full rounded-lg shadow-2xl overflow-hidden">
          {/* Ganti 'src' dengan screenshot peta Anda jika sudah ada */}
          <img 
            src="TestPeta.jpg" 
            alt="Preview Peta UMKM Sumberejo" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-20"></div>
        </div>
      </div>
    </section>
  );
};

export default PetaPreview;