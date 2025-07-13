import Link from 'next/link';
import AdminFooterLink from "./admin/AdminFooterLink";
import { FaInstagram, FaEnvelope } from 'react-icons/fa'; // 1. Impor ikon

const Footer = () => {
    // 2. Definisikan link dan email
    const instagramUrl = "https://www.instagram.com/umkm.sumberejo/";
    const emailAddress = "umkm.desa.sumberejo@gmail.com";

    return (
      <footer className="bg-green-900 text-white pt-10 pb-6">
        <div className="container mx-auto px-6 text-center">
          
          {/* --- BAGIAN IKON SOSIAL MEDIA --- */}
          <div className="flex justify-center mb-6 space-x-6">
            <a 
              href={instagramUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <FaInstagram className="w-6 h-6" />
            </a>
            <a 
              href={`mailto:${emailAddress}`} 
              aria-label="Email"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <FaEnvelope className="w-6 h-6" />
            </a>
          </div>

          {/* --- Teks Copyright dan Info --- */}
          <p>&copy; {new Date().getFullYear()} KKN-PPM UGM SEMIN. All rights reserved.</p>
          <p className="text-sm text-gray-400 mt-2">
            Website ini didedikasikan untuk mendukung UMKM di Kalurahan Sumberejo, Semin.
          </p>
          <div className="mt-4">
            <AdminFooterLink />
          </div>

        </div>
      </footer>
    );
  };
  
export default Footer;