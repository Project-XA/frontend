"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { LogOut, Menu, X, LayoutDashboard, Building2, Store } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { isAuthenticated, logout, isLoading } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  if (isLoading) return null;

  const navItem = (href: string, label: string) => {
    const active = pathname === href || pathname.startsWith(`${href}/`);

    return (
      <Link
        href={href}
        className={cn(
          "rounded-full px-4 py-2 text-sm font-medium transition-all",
          active
            ? "bg-black text-white shadow-sm"
            : "text-zinc-600 hover:bg-zinc-100 hover:text-black"
        )}
      >
        {label}
      </Link>
    );
  };

  const mobileNavItem = (href: string, label: string, icon?: React.ElementType) => {
  const Icon = icon;

  // Active only if exact match OR href is root
  const active =
    href === "/dashboard"
      ? pathname === href // Dashboard only active on exact match
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-medium transition-all",
        active
          ? "bg-black/5 text-black"
          : "text-zinc-600 hover:bg-zinc-100 hover:text-black"
      )}
    >
      {Icon && <Icon className="h-5 w-5" />}
      {label}
    </Link>
  );
};


  return (
    <>
      <nav className="fixed top-0 z-50 w-full border-b bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
          {/* Left */}
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center z-50">
              <div className="relative h-9 w-auto aspect-[3/1]">
                <Image
                  src="/logo.png"
                  alt="Attento"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>


            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-2">
              {isAuthenticated && navItem("/dashboard", "Dashboard")}
              {navItem("/features", "Features")}
              {navItem("/about", "About")}
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2">
              {isAuthenticated ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="rounded-full text-zinc-600 hover:bg-zinc-100 hover:text-black"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              ) : (
                <>
                  <Link href="/login">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-full text-zinc-600 hover:bg-zinc-100 hover:text-black"
                    >
                      Log in
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button
                      size="sm"
                      className="rounded-full bg-black px-5 text-white hover:bg-zinc-800"
                    >
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-zinc-100 transition-colors z-50 relative"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-black" />
              ) : (
                <Menu className="h-6 w-6 text-black" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-40 bg-white md:hidden transition-transform duration-300 ease-in-out pt-24 px-6 pb-6 flex flex-col",
          mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="flex flex-col space-y-2 flex-1 overflow-y-auto">
           {isAuthenticated && (
              <div className="mb-6 space-y-2">
                <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider px-4 mb-2">My Account</p>
                {mobileNavItem("/dashboard", "Dashboard", LayoutDashboard)}
                {mobileNavItem("/dashboard/organizations", "Organizations", Building2)}
                {mobileNavItem("/dashboard/halls", "Halls", Store)}
              </div>
           )}

           <div className="space-y-2">
             <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider px-4 mb-2">Menu</p>
             {mobileNavItem("/features", "Features")}
             {mobileNavItem("/about", "About")}
           </div>
        </div>

        <div className="pt-6 border-t border-zinc-100 space-y-3">
          {isAuthenticated ? (
             <Button
                variant="outline"
                size="lg"
                onClick={logout}
                className="w-full justify-center h-12 rounded-xl text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
          ) : (
             <>
               <Link href="/login" className="block w-full">
                <Button variant="outline" size="lg" className="w-full h-12 rounded-xl border-zinc-200">
                  Log in
                </Button>
               </Link>
               <Link href="/register" className="block w-full">
                <Button size="lg" className="w-full h-12 rounded-xl bg-black text-white hover:bg-zinc-800">
                  Get Started
                </Button>
               </Link>
             </>
          )}
        </div>
      </div>
    </>
  );
}
