import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="bg-yellow-200 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Image src="/logo.png" alt="Logo" width={40} height={40} className="rounded-full" />
          <Link href="/" className="text-xl font-bold text-green-700">
            UMKM Sumberejo
          </Link>
        </div>
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="text-gray-600 hover:text-green-700">
            Home
          </Link>
          {/* LINK INI DIGANTI */}
          <Link href="/umkm" className="text-gray-600 hover:text-green-700">
            Jelajahi UMKM
          </Link>
          <Link href="/pemetaan" className="text-gray-600 hover:text-green-700">
            Pemetaan
          </Link>
          <Link href="/artikel" className="text-gray-600 hover:text-green-700">
            Artikel
          </Link>
        </div>
        {/* Mobile Menu Button (opsional) */}
        <div className="md:hidden">
          <button className="text-gray-800 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;