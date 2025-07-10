import { FaPaperPlane } from 'react-icons/fa';
import Image from 'next/image';

export default function RegisterCta() {
  const formUrl = process.env.NEXT_PUBLIC_GOOGLE_FORM_URL;

  return (
    // 1. Wadah utama sekarang hanya mengatur posisi (relative)
    <section className="relative">
      
      {/* 2. Latar belakang hijau sekarang menjadi elemen sendiri yang absolut */}
      <div className="absolute inset-0 bg-green-700"></div>

      {/* 3. Gambar-gambar sudut sekarang berada di atas latar belakang hijau */}
      {/* Gambar-gambar ini dijadikan dekoratif dan disembunyikan di layar kecil */}
      <Image 
        src="/Register-topleft.png" 
        alt="" 
        width={350} 
        height={350} 
        aria-hidden="true"
        className="absolute top-0 left-0 z-10 hidden lg:block"
      />
      <Image 
        src="/Register-topright.png" 
        alt="" 
        width={350} 
        height={350} 
        aria-hidden="true"
        className="absolute top-0 right-0 z-10 hidden lg:block"
      />
      <Image 
        src="/Register-bottomleft.png" 
        alt="" 
        width={300} 
        height={300} 
        aria-hidden="true"
        className="absolute bottom-0 left-0 z-10 hidden lg:block"
      />
      <Image 
        src="/Register-bottomright.png" 
        alt="" 
        width={300} 
        height={300} 
        aria-hidden="true"
        className="absolute bottom-0 right-0 z-10 hidden lg:block"
      />
      
      {/* 4. Konten utama dengan z-index paling tinggi */}
      <div className="relative container mx-auto px-6 py-24 text-center text-white z-20">
        <h2 className="text-4xl font-bold drop-shadow-md">Punya Usaha di Sumberejo?</h2>
        <p className="mt-4 text-lg max-w-3xl mx-auto text-green-100 drop-shadow-sm">
          Ayo daftarkan UMKM Anda sekarang juga agar dapat dikenal lebih luas dan menjadi bagian dari pemetaan digital Kalurahan Sumberejo.
        </p>
        <div className="mt-8">
          <a
            href={formUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-yellow-400 text-green-800 font-bold py-4 px-8 rounded-full hover:bg-yellow-300 transition duration-300 shadow-xl text-lg transform hover:scale-105"
          >
            <FaPaperPlane />
            Daftarkan Usaha Anda
          </a>
        </div>
      </div>
    </section>
  );
}
