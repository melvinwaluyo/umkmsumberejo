import Link from 'next/link';
import AdminFooterLink from "./AdminFooterLink";

const Footer = () => {
    return (
      <footer className="bg-green-900 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; {new Date().getFullYear()} KKN-PPM UGM SEMIN. All rights reserved.</p>
          <p className="text-sm text-gray-400 mt-2">
            Website ini didedikasikan untuk mendukung UMKM di Kelurahan Sumberejo, Semin.
          </p>
          {/* --- TAUTAN LOGIN ADMIN DI SINI --- */}
          <div className="mt-4">
            <AdminFooterLink />
          </div>
        </div>
      </footer>
    );
  };

  export default Footer;