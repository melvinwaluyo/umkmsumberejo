const Hero = () => {
  return (
    <section 
      className="text-white relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/BannerWeb.png')",
      }}
    >
      <div className="container mx-auto px-6 py-24 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Selamat Datang di Portal UMKM Sumberejo
        </h1>
        <p className="mt-4 text-lg md:text-xl text-white">
          Temukan Potensi dan Produk Unggulan dari Kalurahan Sumberejo, Semin, Gunungkidul.
        </p>
        <div className="mt-8">
          <a
            href="#featured"
            className="bg-amber-50 text-green-700 font-bold py-3 px-6 rounded-full hover:bg-gray-200 transition duration-300"
          >
            Lihat UMKM Unggulan
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;