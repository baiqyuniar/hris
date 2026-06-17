import type { ReactNode } from "react";
import { Sidebar, type NavItem } from "../../components/layout/sidebar";

const adminNavItems: NavItem[] = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Jabatan", href: "/admin/jabatan" },
  { label: "Pegawai", href: "/admin/pegawai" },
  { label: "Presensi", href: "/admin/presensi" },
  { label: "Laporan", href: "/admin/laporan" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar title="Admin" navItems={adminNavItems} />
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}
