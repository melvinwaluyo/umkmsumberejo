export { default } from "next-auth/middleware";

// Tentukan path mana yang ingin Anda lindungi
export const config = {
  matcher: ["/admin/dashboard/:path*"], // Melindungi semua halaman di bawah /admin/dashboard
};