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
  body[]{
    ..., 
    _type == "image" => {
      ...,
      asset->
    }
  }
}`;

const { projectId, dataset } = client.config();

const ptComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._id) {
        return null;
      }
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
      if (!url) {
        return null;
      }
      return <YouTubeEmbed url={url} />;
    },
    imageGallery: ({ value }) => {
      // Tentukan jumlah kolom berdasarkan pilihan di Sanity
      const columnClass = value.layout === '3-columns' ? 'grid-cols-3' : 'grid-cols-2';

      return (
        <div className={`grid ${columnClass} gap-4 my-8`}>
          {value.images.map(image => (
            <figure key={image._key} className="break-inside-avoid">
              <SanityImage
                id={image.asset._ref} // ID aset gambar
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
          ))}
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
      <article className="container mx-auto max-w-3xl bg-white p-8 md:p-12 rounded-lg shadow-lg">
        <Breadcrumb crumbs={breadcrumbCrumbs} />

        {post.mainImage && (
          <div className="mt-6 mb-8 rounded-lg overflow-hidden">
             <SanityImage
                id={post.mainImage.asset._ref}
                projectId={projectId}
                dataset={dataset}
                alt={`Gambar utama untuk ${post.title}`}
                className="w-full h-auto"
                // The 'priority' prop has been removed from here
             />
          </div>
        )}

        {/* Article Header */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
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

        {/* Article Body */}
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