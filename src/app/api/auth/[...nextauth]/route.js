import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/lib/db";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@example.com" },
        password: { label: "Password", type: "password" },
      },
      // Logika otorisasi
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email dan password wajib diisi.");
        }
        
        // 1. Cari admin berdasarkan email
        const admin = await db.admin.findUnique({
          where: { email: credentials.email },
        });

        if (!admin) {
          throw new Error("User tidak ditemukan.");
        }

        // 2. Bandingkan password yang diinput dengan hash di database
        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          admin.password
        );

        if (!isPasswordCorrect) {
          throw new Error("Password salah.");
        }

        // 3. Jika berhasil, kembalikan data user (tanpa password)
        // Data ini akan disimpan di dalam token JWT
        return {
          id: admin.id,
          email: admin.email,
        };
      },
    }),
  ],
  // Konfigurasi session dan halaman
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/admin/login", // Arahkan ke halaman login kustom Anda
    error: "/admin/login", // Arahkan kembali ke login jika ada error
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };