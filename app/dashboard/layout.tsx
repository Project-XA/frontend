"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppSidebar } from "@/components/AppSidebar";
import { isAuthenticated } from "@/lib/authUtils";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
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
    <div className="flex min-h-screen pt-16">
      <AppSidebar />
      <main className="flex-1 overflow-y-auto bg-background p-8">
        {children}
      </main>
    </div>
  );
}
