"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { LogOut } from "lucide-react";
import { isAuthenticated } from "@/lib/authUtils";
import { authService } from "@/services/authService";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isAuth, setIsAuth] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    setIsAuth(isAuthenticated());
  }, []);

  if (!mounted) return null;

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

  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        {/* Left */}
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center">
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

          {/* Nav */}
          <div className="hidden md:flex items-center gap-2">
            {isAuth && navItem("/dashboard", "Dashboard")}
            {navItem("/features", "Features")}
            {navItem("/about", "About")}
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          {isAuth ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => authService.logout()}
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
      </div>
    </nav>
  );
}
