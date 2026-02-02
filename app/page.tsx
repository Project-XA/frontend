"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Shield, Clock, CheckCircle, Users, Fingerprint } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { useAuth } from "@/context/AuthContext";
import { Footer } from "@/components/Footer";


export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;

  const startHref = isAuthenticated ? "/dashboard" : "/register";

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center space-y-10 py-24 px-6 text-center md:py-32 lg:px-8 relative overflow-hidden bg-background">
          
          <div className="space-y-6 max-w-4xl mx-auto z-10">
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl text-black pb-4">
              Attendance made <br className="hidden sm:inline" />
              <span className="text-zinc-600">simple & secure</span>.
            </h1>
            <p className="mx-auto max-w-[700px] text-zinc-600 md:text-xl/relaxed lg:text-lg/relaxed xl:text-xl/relaxed">
              Track attendance in real-time with QR codes and biometric verification. Manage organizations, halls, and sessions from one powerful dashboard.
            </p>
          </div>
          <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center z-10">
            <Link href={startHref}>
              <Button variant="default" size="lg" className="h-12 px-8 text-base bg-black text-white hover:bg-zinc-800">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/features">
              <Button variant="outline" size="lg" className="h-12 px-8 text-base border-black/10 hover:bg-black/5 text-black">
                Learn More
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="container py-24 space-y-12 md:py-32 px-6 mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-black">Why Choose Attendo?</h2>
            <p className="text-zinc-600 max-w-2xl mx-auto">
              Modern attendance management with enterprise-grade security and real-time tracking.
            </p>
          </div>
          
          <div className="mx-auto grid justify-center gap-6 sm:grid-cols-2 md:max-w-[80rem] md:grid-cols-3">
            <Card className="border-black/5 bg-zinc-50 hover:bg-zinc-100 transition-colors">
              <CardContent className="flex flex-col justify-between p-8 h-[220px]">
                <div className="p-3 w-fit rounded-xl bg-black/5 text-black mb-4">
                  <Fingerprint className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-xl text-black">Biometric Verification</h3>
                  <p className="text-sm text-zinc-600 leading-relaxed">Face recognition and fingerprint matching ensure authentic attendance.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-black/5 bg-zinc-50 hover:bg-zinc-100 transition-colors">
              <CardContent className="flex flex-col justify-between p-8 h-[220px]">
                <div className="p-3 w-fit rounded-xl bg-black/5 text-black mb-4">
                  <Clock className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-xl text-black">Real-time Tracking</h3>
                  <p className="text-sm text-zinc-600 leading-relaxed">Monitor attendance as it happens with live updates and instant notifications.</p>
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
                  <p className="text-sm text-zinc-600 leading-relaxed">Easily manage organizations, assign roles, and control permissions.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-black/5 bg-zinc-50 hover:bg-zinc-100 transition-colors">
              <CardContent className="flex flex-col justify-between p-8 h-[220px]">
                <div className="p-3 w-fit rounded-xl bg-black/5 text-black mb-4">
                  <Shield className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-xl text-black">Secure Infrastructure</h3>
                  <p className="text-sm text-zinc-600 leading-relaxed">Enterprise-grade security to keep your sensitive data safe and private.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-black/5 bg-zinc-50 hover:bg-zinc-100 transition-colors">
              <CardContent className="flex flex-col justify-between p-8 h-[220px]">
                <div className="p-3 w-fit rounded-xl bg-black/5 text-black mb-4">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-xl text-black">Automated Reports</h3>
                  <p className="text-sm text-zinc-600 leading-relaxed">Generate detailed attendance reports with verification scores and timestamps.</p>
                </div>
              </CardContent>
            </Card>
          </div>

        </section>

        {/* CTA Section */}
        <section className="border-t border-black/5 bg-white py-24">
          <div className="container px-6 mx-auto max-w-4xl">
            <div className="flex flex-col items-center gap-6 text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl text-black">
                Ready to streamline attendance?
              </h2>
              <p className="max-w-[42rem] leading-relaxed text-zinc-600 sm:text-lg">
                Join organizations already using Attendo to manage attendance efficiently and securely.
              </p>
              <Link href={startHref}>
                <Button variant="default" size="lg" className="mt-4 px-8 h-12 text-base bg-black text-white hover:bg-zinc-800">
                  {isAuthenticated ? "Go to Dashboard" : "Get Started Free"}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
