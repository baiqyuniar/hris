"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../lib/utils";
import { LogoutButton } from "./logout-button";

export interface NavItem {
  label: string;
  href: string;
  //   icon: LucideIcon;
}

export function Sidebar({
  title,
  navItems,
}: {
  title: string;
  navItems: NavItem[];
}) {
  const pathname = usePathname();

  return (
    <aside className="w-60 shrink-0 border-r bg-background flex flex-col">
      <div className="px-4 py-4 text-sm font-medium border-b">{title}</div>

      <nav className="flex-1 px-2 py-3 space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          //   const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-muted font-medium"
                  : "text-muted-foreground hover:bg-muted/50",
              )}
            >
              {/* <Icon className="h-4 w-4" /> */}
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t px-2 py-3">
        <LogoutButton />
      </div>
    </aside>
  );
}
