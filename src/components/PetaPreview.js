import Link from 'next/link';
import Image from 'next/image';

const PetaPreview = () => {
  return (
    <section className="bg-amber-950 text-white">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
        {/* Mobile-first grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          
          {/* Kolom Teks */}
          <div className="text-center md:text-left order-2 md:order-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
              Temukan Lokasi UMKM
            </h2>
            <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8">
              Lihat sebaran lokasi UMKM di seluruh Kalurahan Sumberejo melalui peta interaktif kami. Temukan UMKM terdekat dari lokasi Anda dengan mudah.
            </p>
            <Link href="/pemetaan">
              <span className="inline-block bg-yellow-400 text-green-800 font-bold py-3 px-6 sm:px-8 text-sm sm:text-base rounded-full hover:bg-yellow-300 transition duration-300 shadow-lg transform hover:scale-105">
                Lihat Peta Lengkap
              </span>
            </Link>
          </div>
          
          {/* Kolom Gambar Peta */}
          <div className="flex justify-center items-center order-1 md:order-2">
            <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg h-64 sm:h-80 md:h-96">
              <Image 
                src="/PetaPreview.png" 
                alt="Ilustrasi Peta UMKM Sumberejo" 
                fill
                className="object-contain" 
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                priority
              />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default PetaPreview;