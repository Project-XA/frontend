"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight, LayoutDashboard, ShieldCheck, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { isAuthenticated } from "@/lib/authUtils";

export default function Home() {
  const [isAuth, setIsAuth] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsAuth(isAuthenticated());
  }, []);

  if (!mounted) return null;

  const startHref = isAuth ? "/dashboard" : "/register";

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center space-y-10 py-24 px-6 text-center md:py-32 lg:px-8 relative overflow-hidden">
        
        <div className="space-y-6 max-w-4xl mx-auto z-10">
          <div className="inline-flex items-center rounded-full border border-black/10 bg-black/5 px-4 py-1.5 text-sm font-medium text-black backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-black mr-2 animate-pulse"></span>
            v1.0 is now live
          </div>
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl text-black pb-4">
            Manage sessions <br className="hidden sm:inline" />
            with <span className="text-zinc-600">efficiency</span>.
          </h1>
          <p className="mx-auto max-w-[700px] text-zinc-600 md:text-xl/relaxed lg:text-lg/relaxed xl:text-xl/relaxed">
            Streamline your organization's workflow with our intelligent dashboard. Track halls, manage sessions, and secure your data effortlessly.
          </p>
        </div>
        <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center z-10">
          <Link href={startHref}>
            <Button variant="default" size="lg" className="h-12 px-8 text-base bg-black text-white hover:bg-zinc-800">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="outline" size="lg" className="h-12 px-8 text-base border-black/10 hover:bg-black/5 text-black">
              Learn more
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-24 space-y-12 md:py-32 px-6 mx-auto max-w-7xl">
        <div className="mx-auto grid justify-center gap-6 sm:grid-cols-2 md:max-w-[80rem] md:grid-cols-3">
          <Card className="border-black/5 bg-zinc-50 hover:bg-zinc-100 transition-colors">
            <CardContent className="flex flex-col justify-between p-8 h-[220px]">
              <div className="p-3 w-fit rounded-xl bg-black/5 text-black mb-4">
                <LayoutDashboard className="h-8 w-8" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-xl text-black">Centralized Dashboard</h3>
                <p className="text-sm text-zinc-600 leading-relaxed">Manage everything from a single, intuitive interface designed for clarity.</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-black/5 bg-zinc-50 hover:bg-zinc-100 transition-colors">
            <CardContent className="flex flex-col justify-between p-8 h-[220px]">
              <div className="p-3 w-fit rounded-xl bg-black/5 text-black mb-4">
                <Users className="h-8 w-8" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-xl text-black">User Management</h3>
                <p className="text-sm text-zinc-600 leading-relaxed">Easily assign roles and permissions to your team members securely.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-black/5 bg-zinc-50 hover:bg-zinc-100 transition-colors">
            <CardContent className="flex flex-col justify-between p-8 h-[220px]">
              <div className="p-3 w-fit rounded-xl bg-black/5 text-black mb-4">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-xl text-black">Secure Infrastructure</h3>
                <p className="text-sm text-zinc-600 leading-relaxed">Enterprise-grade security to keep your sensitive data safe and private.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-black/5 bg-zinc-50 py-24">
        <div className="container px-6 mx-auto max-w-4xl">
          <div className="flex flex-col items-center gap-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-5xl text-black">
              Ready to optimize your workflow?
            </h2>
            <p className="max-w-[42rem] leading-relaxed text-zinc-600 sm:text-lg">
              Join thousands of users who are already experiencing the future of management with Attendo.
            </p>
            <Link href={startHref}>
              <Button variant="default" size="lg" className="mt-4 px-8 h-12 text-base bg-black text-white hover:bg-zinc-800">
                {isAuth ? "Go to Dashboard" : "Create Account Now"}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
