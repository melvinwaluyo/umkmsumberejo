import Hero from '../components/Hero';
import FeaturedUmkm from '../components/FeaturedUmkm';
import KategoriUmkm from '../components/KategoriUmkm';
import PetaPreview from '../components/PetaPreview';
import FeaturedArticles from "@/components/FeaturedArticles";
import RegisterCta from '../components/RegisterCta';

export default function Home() {
  return (
    <div>
    
      <Hero />

      <RegisterCta />

      <FeaturedUmkm />

      <KategoriUmkm />
      
      <PetaPreview />

      <FeaturedArticles />
      
    </div>
  );
}