export default function AdminLayout({ children }) {
    // Layout ini bisa dikembangkan dengan sidebar, header, dll.
    return (
      <div className="bg-gray-50 min-h-screen">
        {/* Contoh: <AdminSidebar /> */}
        <main>{children}</main>
      </div>
    );
  }