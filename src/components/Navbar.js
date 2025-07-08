"use client";

import { useState } from 'react';
import { usePathname } from 'next/navigation'; // <-- 1. Impor usePathname
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // <-- 2. Dapatkan path URL saat ini

  // Definisikan link navigasi dalam sebuah array agar mudah dikelola
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/umkm', label: 'Jelajah UMKM' },
    { href: '/pemetaan', label: 'Pemetaan' },
    { href: '/artikel', label: 'Artikel' },
  ];

  return (
    <nav className="bg-yellow-400 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo dan Judul Website */}
          <div className="flex items-center space-x-4">
            <Image src="/logo.png" alt="Logo" width={40} height={40} className="rounded-full" />
            <Link href="/" className="text-xl font-bold text-green-700">
              UMKM Sumberejo
            </Link>
          </div>

          {/* Menu untuk Desktop */}
          <div className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={`
                transition-colors duration-200
                ${pathname === link.href 
                  ? 'text-green-700 font-bold border-b-2 border-green-700' 
                  : 'text-gray-600 hover:text-green-700'
                }
              `}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Tombol Menu Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-gray-800 hover:text-green-700 focus:outline-none"
              aria-label="toggle menu"
            >
              {isOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Panel Menu Dropdown Mobile */}
        <div className={`md:hidden mt-4 ${isOpen ? 'block' : 'hidden'}`}>
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={`
                px-3 py-2 rounded-md
                ${pathname === link.href 
                  ? 'bg-green-100 text-green-700 font-bold' 
                  : 'text-gray-600 hover:bg-yellow-100 hover:text-green-700'
                }
              `}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;