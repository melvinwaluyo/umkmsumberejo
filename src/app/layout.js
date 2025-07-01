import { Cardo } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const cardo = Cardo({
  variable: "--font-cardo",
  subsets: ["latin"],
  weight: ["400", "700"], 
});

export const metadata = {
  title: "UMKM Sumberejo",
  description: "Website pemetaan dan katalog produk UMKM Kelurahan Sumberejo, Semin, Gunungkidul",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${cardo.variable} antialiased`} >
        <Navbar />

        <main>
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
