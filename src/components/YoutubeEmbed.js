"use client";

// Fungsi untuk mendapatkan ID video dari URL YouTube
function getYouTubeId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export default function YouTubeEmbed({ url }) {
  const videoId = getYouTubeId(url);

  if (!videoId) {
    return <p className="text-red-500">URL YouTube tidak valid.</p>;
  }

  return (
    <div className="relative my-8" style={{ paddingBottom: '56.25%', height: 0 }}>
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        width="853"
        height="480"
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded YouTube"
      />
    </div>
  );
}