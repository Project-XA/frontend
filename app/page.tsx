"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Shield, Clock, CheckCircle, Users, Fingerprint } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { useAuth } from "@/context/AuthContext";
import { Footer } from "@/components/Footer";
import { AmbientScene } from "@/components/AmbientScene";
import { RevealOnScroll } from "@/components/RevealOnScroll";

const featureCards = [
  {
    icon: Fingerprint,
    title: "Biometric Verification",
    description:
      "Face recognition and fingerprint matching ensure authentic attendance.",
  },
  {
    icon: Clock,
    title: "Real-time Tracking",
    description:
      "Monitor attendance as it happens with live updates and instant notifications.",
  },
  {
    icon: Users,
    title: "User Management",
    description: "Easily manage organizations, assign roles, and control permissions.",
  },
  {
    icon: Shield,
    title: "Secure Infrastructure",
    description:
      "Enterprise-grade security to keep your sensitive data safe and private.",
  },
  {
    icon: CheckCircle,
    title: "Automated Reports",
    description:
      "Generate detailed attendance reports with verification scores and timestamps.",
  },
];

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;

  const startHref = isAuthenticated ? "/dashboard" : "/register";

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center overflow-hidden bg-background pt-28 pb-24 text-center sm:pt-32 md:py-32 lg:px-8">
          <AmbientScene variant="hero" />
          <RevealOnScroll className="relative z-10 space-y-10 max-w-4xl mx-auto px-6">
            <div className="space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Attendance infrastructure
              </p>
              <h1 className="text-5xl font-bold tracking-tight text-black pb-2 sm:text-6xl md:text-7xl lg:text-8xl">
                Attendance made <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-zinc-600 to-zinc-400 bg-clip-text text-transparent">
                  simple & secure
                </span>
                .
              </h1>
              <p className="mx-auto max-w-[700px] text-zinc-600 md:text-xl/relaxed lg:text-lg/relaxed xl:text-xl/relaxed">
                Track attendance in real-time with QR codes and biometric verification.
                Manage organizations, halls, and sessions from one powerful dashboard.
              </p>
            </div>
            <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center">
              <Link href={startHref}>
                <Button
                  variant="default"
                  size="lg"
                  className="h-12 px-8 text-base bg-black text-white shadow-lg shadow-black/15 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-xl hover:shadow-black/20 active:translate-y-0"
                >
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/features">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 px-8 text-base border-black/10 bg-white/60 backdrop-blur-sm transition-transform duration-200 hover:-translate-y-0.5 hover:bg-black/5 text-black"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </RevealOnScroll>
        </section>

        {/* Features Section */}
        <section className="relative border-t border-black/[0.06] bg-gradient-to-b from-background to-zinc-50/50 py-24 md:py-32">
          <div className="container space-y-12 px-6 mx-auto max-w-7xl">
            <RevealOnScroll className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl">
                Why Choose Attendo?
              </h2>
              <p className="text-zinc-600 max-w-2xl mx-auto">
                Modern attendance management with enterprise-grade security and real-time
                tracking.
              </p>
            </RevealOnScroll>

            <div className="mx-auto grid justify-center gap-6 sm:grid-cols-2 md:max-w-[80rem] md:grid-cols-3">
              {featureCards.map((item, index) => {
                const Icon = item.icon;
                return (
                <RevealOnScroll key={item.title} delay={index * 70}>
                  <Card className="group h-full border-black/5 bg-white/80 backdrop-blur-sm hover:border-black/10 hover:shadow-lg hover:-translate-y-1">
                    <CardContent className="flex flex-col justify-between p-8 min-h-[220px]">
                      <div className="p-3 w-fit rounded-xl bg-black/5 text-black mb-4 transition-transform duration-300 group-hover:scale-105 group-hover:bg-black/10">
                        <Icon className="h-8 w-8" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-semibold text-xl text-black">{item.title}</h3>
                        <p className="text-sm text-zinc-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </RevealOnScroll>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative border-t border-black/5 bg-white py-24 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(9,9,11,0.04),transparent)]" />
          <RevealOnScroll className="container relative px-6 mx-auto max-w-4xl">
            <div className="flex flex-col items-center gap-6 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-black md:text-5xl">
                Ready to streamline attendance?
              </h2>
              <p className="max-w-[42rem] leading-relaxed text-zinc-600 sm:text-lg">
                Join organizations already using Attendo to manage attendance efficiently
                and securely.
              </p>
              <Link href={startHref}>
                <Button
                  variant="default"
                  size="lg"
                  className="mt-4 px-8 h-12 text-base bg-black text-white shadow-lg shadow-black/15 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-zinc-800"
                >
                  {isAuthenticated ? "Go to Dashboard" : "Get Started Free"}
                </Button>
              </Link>
            </div>
          </RevealOnScroll>
        </section>
      </main>
      <Footer />
    </div>
  );
}
