import { client } from '@/lib/sanityClient';
import { PortableText } from '@portabletext/react';
import { SanityImage } from 'sanity-image';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import YouTubeEmbed from "@/components/YoutubeEmbed";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  "authorName": author->name,
  mainImage,
  publishedAt,
  "categories": categories[]->{
    _id,
    title
  },
  body[]{
    ..., 
    _type == "image" => { ..., asset-> },
    _type == "imageGallery" => { ..., images[]{ ..., asset-> } },
    _type == "youtube" => { ... }
  }
}`;

const { projectId, dataset } = client.config();

const ptComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._id) return null;
      return (
        <SanityImage
          id={value.asset._id}
          projectId={projectId}
          dataset={dataset}
          alt={value.alt || 'Gambar di dalam artikel'}
          className="my-8 shadow-lg rounded-lg"
        />
      );
    },
    youtube: ({ value }) => {
      const { url } = value;
      if (!url) return null;
      return <YouTubeEmbed url={url} />;
    },
    imageGallery: ({ value }) => {
      const columnClass = value.layout === '3-columns' ? 'grid-cols-3' : 'grid-cols-2';
      return (
        <div className={`grid ${columnClass} gap-4 my-8`}>
          {value.images?.map(image => {
            // Safety check jika gambar di dalam galeri tidak valid
            if (!image.asset?._id) return null; 
            return (
              <figure key={image._key} className="break-inside-avoid">
                <SanityImage
                  // --- PERBAIKAN DI SINI ---
                  id={image.asset._id} // Gunakan _id, bukan _ref
                  projectId={projectId}
                  dataset={dataset}
                  alt={image.alt || 'Gambar galeri'}
                  className="w-full h-auto rounded-lg shadow-md"
                />
                {image.caption && (
                  <figcaption className="text-center text-sm text-gray-600 mt-2">
                    {image.caption}
                  </figcaption>
                )}
              </figure>
            )
          })}
        </div>
      );
    },
  },
};

export default async function ArtikelDetailPage({ params }) {
  const { slug } = await params;
  const post = await client.fetch(POST_QUERY, { slug });

  if (!post) {
    notFound();
  }
  
  const breadcrumbCrumbs = [
    { href: '/', label: 'Home' },
    { href: '/artikel', label: 'Artikel' },
    { href: `/artikel/${slug}`, label: post.title }
  ];

  return (
    <div className="bg-amber-50 py-12">
      <article className="container mx-auto max-w-5xl bg-white p-8 md:p-12 rounded-lg shadow-lg">
        <Breadcrumb crumbs={breadcrumbCrumbs} />

        <div className="mt-6 flex flex-wrap items-center gap-2">
          {post.categories?.map((category) => (
            <span key={category._id} className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              {category.title}
            </span>
          ))}
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-4 mb-4 leading-tight">
            {post.title}
        </h1>
        <div className="mb-8">
            <p className="text-gray-600 text-lg">
                Oleh <span className="font-semibold">{post.authorName || 'Tim Redaksi'}</span>
            </p>
            <p className="text-sm text-gray-500">
                Dipublikasikan pada {new Date(post.publishedAt).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'long', year: 'numeric'
                })}
            </p>
        </div>

        {post.mainImage && (
          <div className="mb-8 rounded-lg overflow-hidden">
             <SanityImage
                // Gunakan _ref di sini karena mainImage tidak diperluas dengan '->'
                id={post.mainImage.asset._ref}
                projectId={projectId}
                dataset={dataset}
                alt={`Gambar utama untuk ${post.title}`}
                className="w-full h-auto"
             />
          </div>
        )}

        <div 
          className="
            prose prose-lg max-w-none
            prose-p:text-gray-800
            prose-headings:text-gray-900
            prose-strong:text-gray-800
            prose-a:text-green-600
            prose-a:no-underline
            hover:prose-a:underline
          "
        >
          {Array.isArray(post.body) && (
            <PortableText value={post.body} components={ptComponents} />
          )}
        </div>
      </article>
    </div>
  );
}
