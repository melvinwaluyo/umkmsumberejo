import { client } from '@/lib/sanityClient';
import ArticleCard from './ArticleCard';

/**
 * Mengambil 3 artikel terbaru dari Sanity.
 */
async function getFeaturedPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    mainImage,
    "authorName": author->name,
    "plainTextBody": pt::text(body),
    publishedAt,
  }`;
  try {
    const posts = await client.fetch(query, {}, {
      cache: 'no-store'
    });
    return posts;
  } catch (error)
 {
    console.error("Gagal mengambil artikel unggulan:", error);
    return [];
  }
}

export default async function FeaturedArticles() {
  const featuredPosts = await getFeaturedPosts();

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Artikel & Wawasan Terbaru
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Baca tulisan terbaru dari kami untuk mendapatkan informasi seputar UMKM.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts && featuredPosts.length > 0 ? (
            featuredPosts.map((post) => (
              <ArticleCard key={post._id} post={post} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              Artikel unggulan tidak tersedia saat ini.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
