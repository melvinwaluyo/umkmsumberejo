import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';

// Props 'crumbs' adalah array of object, contoh: [{ href: '/', label: 'Home' }, ...]
export default function Breadcrumb({ crumbs }) {
  return (
    <nav className="flex mb-4" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        {crumbs.map((crumb, index) => (
          <li key={index} className="inline-flex items-center">
            {index < crumbs.length - 1 ? (
              <>
                <Link href={crumb.href} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-green-600">
                  {crumb.label}
                </Link>
                <FaChevronRight className="w-3 h-3 text-gray-400 mx-1" />
              </>
            ) : (
              // Crumb terakhir (halaman saat ini)
              <span className="text-sm font-medium text-gray-500">{crumb.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}