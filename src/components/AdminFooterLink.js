"use client";

import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function AdminFooterLink() {
    const { status } = useSession();

    // Tentukan URL tujuan berdasarkan status login
    const href = status === 'authenticated' ? '/admin/dashboard' : '/admin/login';

    return (
        <Link href={href}>
            <span className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
                Admin Page
            </span>
        </Link>
    );
}