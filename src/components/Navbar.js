"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Fix hydration mismatch by ensuring component is mounted on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Definisikan link navigasi dalam sebuah array agar mudah dikelola
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/umkm', label: 'Jelajah UMKM' },
    { href: '/pemetaan', label: 'Pemetaan' },
    { href: '/artikel', label: 'Artikel' },
  ];

  // Function to get link className - only use pathname if mounted
  const getLinkClassName = (href) => {
    if (!mounted) {
      // Return default styling during SSR
      return 'transition-colors duration-200 text-black hover:text-green-700';
    }
    
    return `transition-colors duration-200 ${
      pathname === href 
        ? 'text-green-700 font-bold border-b-2 border-green-700' 
        : 'text-black hover:text-green-700'
    }`;
  };

  const getMobileLinkClassName = (href) => {
    if (!mounted) {
      // Return default styling during SSR
      return 'px-3 py-2 rounded-md text-base text-black hover:bg-green-100 hover:text-green-800';
    }
    
    return `px-3 py-2 rounded-md text-base ${
      pathname === href 
        ? 'bg-green-100 text-green-800 font-bold' 
        : 'text-black hover:bg-green-100 hover:text-green-800'
    }`;
  };

  return (
    <nav className="bg-yellow-400 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo dan Judul Website */}
          <div className="flex items-center space-x-4">
            <Link href="/" aria-label="Kembali ke Home">
                <Image src="/Logo.png" alt="Logo" width={40} height={40} className="rounded-full" />
            </Link>
            <Link href="/" className="text-xl font-bold text-green-700">
              UMKM Sumberejo
            </Link>
          </div>

          {/* Menu untuk Desktop */}
          <div className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className={getLinkClassName(link.href)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Tombol Menu Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-green-700 hover:text-green-700 focus:outline-none"
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
        <div className={`
          absolute left-0 right-0 md:hidden transition-all duration-300 ease-in-out
          ${isOpen ? 'top-full opacity-100 visible' : 'top-[90%] opacity-0 invisible'}
        `}>
          <div className="container mx-auto">
             <div className="mt-2 p-4 bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className={getMobileLinkClassName(link.href)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;