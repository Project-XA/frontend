"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Store,
} from "lucide-react";

import { cn } from "@/lib/utils";

const sidebarItems = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Organizations", href: "/dashboard/organizations", icon: Building2 },
  { title: "Halls", href: "/dashboard/halls", icon: Store },
];

interface AppSidebarProps {
  onItemClick?: () => void;
}

export function AppSidebar({ onItemClick }: AppSidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/dashboard"
      ? pathname === href
      : pathname?.startsWith(href);

  return (
    <aside className="flex h-full w-full flex-col bg-background">
      {/* Top */}
      <div className="px-6 py-5 border-b">
        <h2 className="text-lg font-semibold tracking-tight">
          Admin Panel
        </h2>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onItemClick}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all",
                active
                  ? "bg-foreground text-background shadow-sm ring-1 ring-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              {/* Icon box */}
              <span
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg border",
                  active
                    ? "bg-background text-foreground border-background"
                    : "bg-muted text-muted-foreground group-hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
              </span>

              <span className="font-medium">
                {item.title}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
