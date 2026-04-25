"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Building2,
  Store,
  BookOpen,
  PlusCircle,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { organizationService } from "@/services/organizationService";

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
  const [universityOrgId, setUniversityOrgId] = useState<number | null>(null);

  useEffect(() => {
    // Fetch user's organizations and find first university
    organizationService.getUserOrganizations().then((response) => {
      if (response.success && response.data) {
        const universityOrg = response.data.find((org) => org.isUniversity);
        if (universityOrg) {
          setUniversityOrgId(universityOrg.organizationId);
        } else {
          setUniversityOrgId(null);
        }
      }
    }).catch(() => {
      setUniversityOrgId(null);
    });
  }, []);

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === href;
    // For organizations, exclude sections sub-pages
    if (href === "/dashboard/organizations") {
      return pathname?.startsWith(href) && !pathname?.includes("/sections");
    }
    return pathname?.startsWith(href);
  };

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
                "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all duration-200 ease-out",
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

        {/* Sections link - only for university organizations */}
        {universityOrgId && (
          <Link
            href={`/dashboard/organizations/${universityOrgId}/sections`}
            onClick={onItemClick}
            className={cn(
              "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all duration-200 ease-out",
              pathname?.includes("/sections")
                ? "bg-foreground text-background shadow-sm ring-1 ring-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            )}
          >
            <span
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg border",
                pathname?.includes("/sections")
                  ? "bg-background text-foreground border-background"
                  : "bg-muted text-muted-foreground group-hover:text-foreground"
              )}
            >
              <BookOpen className="h-4 w-4" />
            </span>
            <span className="font-medium">Sections</span>
          </Link>
        )}
      </nav>
    </aside>
  );
}
