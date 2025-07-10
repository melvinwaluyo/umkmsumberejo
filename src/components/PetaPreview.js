import Link from 'next/link';
import Image from 'next/image';

const PetaPreview = () => {
  return (
    <section className="bg-amber-950 text-white">
      <div className="container mx-auto px-6 py-1 grid md:grid-cols-2 gap-12 items-center">
        {/* Kolom Teks */}
        <div>
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
            Temukan Lokasi UMKM
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Lihat sebaran lokasi UMKM di seluruh Kelurahan Sumberejo melalui peta interaktif kami. Temukan UMKM terdekat dari lokasi Anda dengan mudah.
          </p>
          <Link href="/pemetaan">
            <span className="inline-block bg-yellow-400 text-green-800 font-bold py-3 px-8 rounded-full hover:bg-yellow-300 transition duration-300 shadow-lg transform hover:scale-105">
              Lihat Peta Lengkap
            </span>
          </Link>
        </div>
        
        {/* Kolom Gambar Peta */}
        <div className="flex justify-center items-center">
          <div className="relative w-full max-w-lg h-120">
            <Image 
              src="/PetaPreview.png" 
              alt="Ilustrasi Peta UMKM Sumberejo" 
              fill
              className="object-contain" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PetaPreview;
