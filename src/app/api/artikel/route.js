import { NextResponse } from 'next/server';
import { client } from '@/lib/sanityClient';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    // Filter `*` berarti "cari semua".
    // `&& title match "${query}*"` adalah filter pencarian judul.
    const groqFilter = query ? `&& title match "${query}*"` : '';
    
    const groqQuery = `*[_type == "post" ${groqFilter}] | order(publishedAt desc) {
      _id,
      title,
      slug,
      mainImage,
      "authorName": author->name,
      "plainTextBody": pt::text(body),
      publishedAt,
    }`;

    const posts = await client.fetch(groqQuery);
    return NextResponse.json(posts);

  } catch (error) {
    console.error("Gagal mengambil artikel dari Sanity:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server.", error: error.message },
      { status: 500 }
    );
  }
}