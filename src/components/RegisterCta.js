import { FaPaperPlane } from 'react-icons/fa';

export default function RegisterCta() {
  const formUrl = process.env.NEXT_PUBLIC_GOOGLE_FORM_URL;

  return (
    <section className="bg-green-700">
      <div className="container mx-auto px-6 py-16 text-center text-white">
        <h2 className="text-3xl font-bold">Punya Usaha di Sumberejo?</h2>
        <p className="mt-4 text-lg max-w-2xl mx-auto text-gray-200">
          Ayo daftarkan UMKM Anda sekarang juga agar dapat dikenal lebih luas dan menjadi bagian dari pemetaan digital Kelurahan Sumberejo.
        </p>
        <div className="mt-8">
          <a
            href={formUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-green-700 font-bold py-3 px-8 rounded-full hover:bg-yellow-300 transition duration-300 shadow-lg text-lg"
          >
            <FaPaperPlane />
            Daftarkan Usaha Anda
          </a>
        </div>
      </div>
    </section>
  );
}