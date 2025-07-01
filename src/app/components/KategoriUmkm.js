import Link from 'next/link';
import { FaUtensils, FaPalette, FaHandshake, FaLeaf } from 'react-icons/fa'; // Contoh ikon

const categories = [
  {
    name: 'Kuliner',
    icon: <FaUtensils className="w-12 h-12 text-blue-500" />,
    href: '/umkm?kategori=kuliner',
  },
  {
    name: 'Kerajinan',
    icon: <FaPalette className="w-12 h-12 text-green-500" />,
    href: '/umkm?kategori=kerajinan',
  },
  // {
  //   name: 'Jasa',
  //   icon: <FaHandshake className="w-12 h-12 text-yellow-500" />,
  //   href: '/umkm?kategori=jasa',
  // },
  // {
  //   name: 'Agrobisnis',
  //   icon: <FaLeaf className="w-12 h-12 text-red-500" />,
  //   href: '/umkm?kategori=agrobisnis',
  // },
];

const KategoriUmkm = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Jelajahi Berdasarkan Kategori
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Temukan produk dan jasa sesuai dengan kebutuhan Anda.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-2 gap-8">
          {categories.map((category) => (
            <Link key={category.name} href={category.href}>
              <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                {category.icon}
                <h3 className="mt-4 text-xl font-semibold text-gray-700">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KategoriUmkm;