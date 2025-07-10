"use client";

import { useState, useEffect, Suspense } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

function AdminLoginComponent() {
  const router = useRouter();
  const { status } = useSession(); // Hanya butuh status sesi
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin/dashboard";
  const error = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // useEffect untuk redirect jika sudah login
  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/admin/dashboard');
    }
  }, [status, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl,
      });

      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        // Arahkan kembali ke halaman login dengan pesan error
        router.push(`/admin/login?error=${res.error}`);
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Hanya tampilkan form login jika statusnya 'unauthenticated'
  if (status === 'unauthenticated') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-amber-50">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">Admin Login</h1>
            <p className="text-gray-500">Portal Manajemen UMKM Sumberejo</p>
          </div>
          
          {/* Tampilkan pesan error jika ada */}
          {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                  <strong className="font-bold">Login Gagal!</strong>
                  <span className="block sm:inline"> {error}</span>
              </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email" id="email" name="email"
                value={email} onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-black"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
              <input
                type="password" id="password" name="password"
                value={password} onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-black"
                required
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:bg-green-300"
              >
                {isSubmitting ? "Memproses..." : "Sign In"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Jika status 'loading' atau 'authenticated', jangan render apa-apa (blank page)
  // karena useEffect akan menangani proses redirect.
  return null;
}

// Loading fallback component
function LoginLoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-amber-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-48 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-64 mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main component with Suspense wrapper
export default function AdminLoginPage() {
  return (
    <Suspense fallback={<LoginLoadingFallback />}>
      <AdminLoginComponent />
    </Suspense>
  );
}