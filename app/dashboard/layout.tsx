"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AppSidebar } from "@/components/AppSidebar";
import { AmbientScene } from "@/components/AmbientScene";
import { isAuthenticated } from "@/lib/authUtils";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      if (!isAuthenticated()) {
        router.replace("/login");
      } else {
        setIsAuth(true);
      }
      setIsChecking(false);
    };
    checkAuth();
  }, [router]);

  // No mobile menu logic needed here as it's handled by Navbar
  
  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuth) {
    return null;
  }

  return (
    <div className="flex min-h-screen pt-16 relative isolate">
      <div className="hidden md:block w-72 border-r bg-background/80 backdrop-blur-sm h-[calc(100vh-4rem)] sticky top-16 z-10">
        <AppSidebar />
      </div>

      <main className="relative flex-1 overflow-y-auto p-4 md:p-8 w-full min-w-0">
        <AmbientScene variant="dashboard" className="z-0 rounded-none" />
        <div key={pathname} className="relative z-[1] dashboard-page-enter">
          {children}
        </div>
      </main>
    </div>
  );
}
