import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/lib/sanityClient';

// Fungsi untuk membuat sinopsis singkat
function createSynopsis(text, maxLength) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export default function ArticleCard({ post }) {
  // Buat sinopsis dari plainTextBody yang kita ambil dari query
  const synopsis = createSynopsis(post.plainTextBody, 150);

  return (
    <Link href={`/artikel/${post.slug.current}`}>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full group transform hover:-translate-y-2 transition-all duration-300 flex flex-col">
        {/* Bagian Gambar */}
        <div className="relative w-full h-56">
          {post.mainImage ? (
            <Image
              src={urlFor(post.mainImage).width(500).height(300).url()}
              alt={`Gambar untuk ${post.title}`}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">Tidak ada gambar</span>
            </div>
          )}
        </div>
        {/* Bagian Konten Teks */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-gray-800 group-hover:text-green-700 transition-colors duration-300 mb-2">
            {post.title}
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Oleh <span className="font-semibold">{post.authorName || 'Tim Redaksi'}</span>
          </p>
          <p className="text-gray-600 text-sm flex-grow">
            {synopsis}
          </p>
          <div className="mt-4 text-green-700 font-bold group-hover:underline">
            Baca Selengkapnya →
          </div>
        </div>
      </div>
    </Link>
  );
}