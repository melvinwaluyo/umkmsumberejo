import Hero from '../components/Hero';
import FeaturedUmkm from '../components/FeaturedUmkm';
import KategoriUmkm from '../components/KategoriUmkm';
import PetaPreview from '../components/PetaPreview';


export default function Home() {
  return (
    <div>
      {/* Section 1: Sambutan utama yang menarik perhatian */}
      <Hero />
      
      {/* Section 2: Menampilkan beberapa UMKM pilihan */}
      <FeaturedUmkm />
      
      {/* Section 3: Navigasi berbasis kategori */}
      <KategoriUmkm />
      
      {/* Section 4: Ajakan untuk melihat peta sebaran */}
      <PetaPreview />
    </div>
  );
}