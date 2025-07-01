import UmkmCard from '../components/UmkmCard';

// --- DATA DUMMY ---
// Nanti, data ini akan diambil dari database melalui backend.
const dummyUmkmData = [
  {
    id: 1,
    name: "Keripik Singkong Bu Yuni",
    slug: "keripik-bu-yuni",
    category: "Kuliner",
    shortDescription: "Keripik singkong renyah dengan berbagai varian rasa asli dari petani lokal Sumberejo.",
    imageUrl: "https://via.placeholder.com/300x200?text=Keripik+Singkong",
  },
  {
    id: 2,
    name: "Batik Tulis Sekar Jagad",
    slug: "batik-sekar-jagad",
    category: "Kerajinan",
    shortDescription: "Batik tulis khas Gunungkidul dengan motif tradisional yang menawan dan bahan berkualitas.",
    imageUrl: "https://via.placeholder.com/300x200?text=Batik+Tulis",
  },
  {
    id: 3,
    name: "Gula Aren Murni Pak Jono",
    slug: "gula-aren-pak-jono",
    category: "Agrobisnis",
    shortDescription: "Gula aren asli yang diolah secara tradisional langsung dari nira pohon aren, tanpa bahan pengawet.",
    imageUrl: "https://via.placeholder.com/300x200?text=Gula+Aren",
  },
  {
    id: 4,
    name: "Jasa Las Pak Budi",
    slug: "jasa-las-pak-budi",
    category: "Jasa",
    shortDescription: "Menerima pembuatan pagar, kanopi, tralis, dan berbagai kebutuhan konstruksi besi lainnya.",
    imageUrl: "https://via.placeholder.com/300x200?text=Jasa+Las",
  },
  {
    id: 5,
    name: "Tahu Bakso Merekah",
    slug: "tahu-bakso-merekah",
    category: "Kuliner",
    shortDescription: "Tahu bakso lezat dengan isian daging sapi pilihan, cocok untuk camilan keluarga.",
    imageUrl: "https://via.placeholder.com/300x200?text=Tahu+Bakso",
  },
  {
    id: 6,
    name: "Kerajinan Bambu Mas Agus",
    slug: "kerajinan-bambu-mas-agus",
    category: "Kerajinan",
    shortDescription: "Berbagai perabotan dan hiasan rumah unik yang terbuat dari bambu pilihan.",
    imageUrl: "https://via.placeholder.com/300x200?text=Kerajinan+Bambu",
  },
];
// --- AKHIR DATA DUMMY ---


const JelajahiUmkmPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6 py-12">
        {/* Header dan Judul */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">Jelajahi UMKM Sumberejo</h1>
          <p className="text-gray-600 mt-2">Temukan dan dukung produk lokal dari para pengusaha hebat di desa kami.</p>
        </div>

        {/* Fitur Pencarian dan Filter */}
        <div className="mb-10 p-4 bg-white rounded-lg shadow-md flex flex-col md:flex-row gap-4 items-center">
          <input 
            type="text" 
            placeholder="Cari nama UMKM atau produk..."
            className="w-full md:flex-1 p-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-2">
            <button className="bg-green-700 text-white font-semibold py-3 px-5 rounded-lg hover:bg-green-900 transition-colors">Semua</button>
            <button className="bg-gray-200 text-gray-700 font-semibold py-3 px-5 rounded-lg hover:bg-gray-300 transition-colors">Kuliner</button>
            <button className="bg-gray-200 text-gray-700 font-semibold py-3 px-5 rounded-lg hover:bg-gray-300 transition-colors">Kerajinan</button>
            <button className="bg-gray-200 text-gray-700 font-semibold py-3 px-5 rounded-lg hover:bg-gray-300 transition-colors">Jasa</button>
          </div>
        </div>

        {/* Galeri UMKM */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {dummyUmkmData.map((umkm) => (
            <UmkmCard key={umkm.id} umkm={umkm} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default JelajahiUmkmPage;