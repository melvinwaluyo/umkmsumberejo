import { Cardo } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthProvider from "@/components/AuthProvider";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const cardo = Cardo({
  variable: "--font-cardo",
  subsets: ["latin"],
  weight: ["400", "700"], 
});

export const metadata = {
  title: "UMKM Sumberejo",
  description: "Website pemetaan dan katalog produk UMKM Kalurahan Sumberejo, Semin, Gunungkidul",
  manifest: "/site.webmanifest", // <-- Tambahkan link ke manifest
  icons: {
    icon: "/favicon.ico", // <-- Link ke favicon utama
    apple: "/apple-touch-icon.png", // <-- Link untuk perangkat Apple
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${cardo.variable} antialiased bg-amber-50`}>
        <AuthProvider> 
          <Toaster position="top-center" reverseOrder={false} />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
