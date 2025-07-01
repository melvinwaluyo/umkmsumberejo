import Link from 'next/link';

// Data sementara untuk UMKM
const umkmData = [
  {
    id: 1,
    name: "Keripik Singkong Bu Yuni",
    slug: "keripik-bu-yuni",
    description: "Keripik singkong renyah dengan berbagai varian rasa asli dari petani lokal.",
    image: "https://via.placeholder.com/300x200?text=Produk+UMKM+1",
  },
  {
    id: 2,
    name: "Batik Tulis Sekar Jagad",
    slug: "batik-sekar-jagad",
    description: "Batik tulis khas Gunungkidul dengan motif tradisional yang menawan.",
    image: "https://via.placeholder.com/300x200?text=Produk+UMKM+2",
  },
  {
    id: 3,
    name: "Gula Aren Murni Pak Jono",
    slug: "gula-aren-pak-jono",
    description: "Gula aren asli yang diolah secara tradisional, tanpa bahan pengawet.",
    image: "https://via.placeholder.com/300x200?text=Produk+UMKM+3",
  },
];

const FeaturedUmkm = () => {
  return (
    <section id="featured" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          UMKM Unggulan
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Berikut adalah beberapa UMKM yang menjadi primadona di Kelurahan Sumberejo.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {umkmData.map((umkm) => (
            <div key={umkm.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={umkm.image} alt={umkm.name} className="w-full h-48 object-cover"/>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{umkm.name}</h3>
                <p className="text-gray-600">{umkm.description}</p>
                <Link href={`/umkm/${umkm.slug}`} className="inline-block mt-4 text-green-700 hover:text-green-900 font-semibold">
                  Lihat Detail →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedUmkm;