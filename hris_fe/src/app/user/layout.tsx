import type { ReactNode } from "react";
import { Sidebar, type NavItem } from "../../components/layout/sidebar";

const userNavItems: NavItem[] = [
  { label: "Dashboard", href: "/user/dashboard" },
  { label: "Presensi saya", href: "/user/presensi" },
  { label: "Gaji saya", href: "/user/gaji" },
];

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar title="Pegawai" navItems={userNavItems} />
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}
