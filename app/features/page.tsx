"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CheckCircle, Users, ArrowLeft } from "lucide-react";
import { MobileFrame } from "@/components/MobileFrame";
import { AdminAttendanceMockup } from "@/components/AdminAttendanceMockup";
import { UserAttendanceMockup } from "@/components/UserAttendanceMockup";
import { Footer } from "@/components/Footer";

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen pt-16">
      <main className="flex-1 w-full">
        {/* Header */}
        <section className="bg-white text-black py-20 px-6">
          <div className="container mx-auto max-w-7xl text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">How It Works</h1>
            <p className="text-lg md:text-xl text-zinc-600 max-w-2xl leading-relaxed">
              Experience seamless attendance tracking from both admin and user perspectives.
              Our platform bridges the gap between secure verification and user convenience.
            </p>
          </div>
        </section>

        {/* Features Demo Section */}
        <section className="py-24 bg-white">
          <div className="container px-6 mx-auto max-w-7xl">
            <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center max-w-6xl mx-auto">
              {/* Admin View */}
              <div className="space-y-8 order-2 md:order-1">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-black text-sm font-medium border border-zinc-200">
                    <Users className="h-3.5 w-3.5" />
                    Admin Dashboard
                  </div>
                  <h3 className="text-3xl font-bold text-black tracking-tight">Monitor Attendance in Real-Time</h3>
                  <p className="text-zinc-600 leading-relaxed text-lg">
                    Track who's present, view verification methods, and see match scores instantly. Get a complete overview of all sessions across your organization.
                  </p>
                  <ul className="space-y-3 pt-2">
                    <li className="flex items-start gap-3 text-base text-zinc-700">
                      <CheckCircle className="h-5 w-5 text-black flex-shrink-0 mt-0.5" />
                      <span>Live attendance updates with verification badges</span>
                    </li>
                    <li className="flex items-start gap-3 text-base text-zinc-700">
                      <CheckCircle className="h-5 w-5 text-black flex-shrink-0 mt-0.5" />
                      <span>Match scores for biometric verification confidence</span>
                    </li>
                    <li className="flex items-start gap-3 text-base text-zinc-700">
                      <CheckCircle className="h-5 w-5 text-black flex-shrink-0 mt-0.5" />
                      <span>Timestamp tracking for every check-in</span>
                    </li>
                  </ul>
                </div>
                <div className="flex justify-center md:justify-start">
                  <MobileFrame className="shadow-2xl">
                    <AdminAttendanceMockup />
                  </MobileFrame>
                </div>
              </div>

              {/* User View */}
              <div className="space-y-8 order-1 md:order-2">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-black text-sm font-medium border border-zinc-200">
                    <CheckCircle className="h-3.5 w-3.5" />
                    User Check-In
                  </div>
                  <h3 className="text-3xl font-bold text-black tracking-tight">Quick & Secure Check-In</h3>
                  <p className="text-zinc-600 leading-relaxed text-lg">
                    Simple one-tap check-in with biometric verification. The entire process takes just seconds while ensuring complete security.
                  </p>
                  <ul className="space-y-3 pt-2">
                    <li className="flex items-start gap-3 text-base text-zinc-700">
                      <CheckCircle className="h-5 w-5 text-black flex-shrink-0 mt-0.5" />
                      <span>Simple one-tap check-in interface</span>
                    </li>
                    <li className="flex items-start gap-3 text-base text-zinc-700">
                      <CheckCircle className="h-5 w-5 text-black flex-shrink-0 mt-0.5" />
                      <span>Biometric verification for security</span>
                    </li>
                    <li className="flex items-start gap-3 text-base text-zinc-700">
                      <CheckCircle className="h-5 w-5 text-black flex-shrink-0 mt-0.5" />
                      <span>Instant confirmation of attendance</span>
                    </li>
                  </ul>
                </div>
                <div className="flex justify-center md:justify-start">
                  <MobileFrame className="shadow-2xl">
                    <UserAttendanceMockup />
                  </MobileFrame>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-zinc-50 py-24 border-t border-zinc-200">
          <div className="container px-6 mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-black">Ready to streamline attendance?</h2>
            <p className="text-zinc-600 mb-8 text-lg max-w-2xl mx-auto">
              Join thousands of organizations using Attendo to manage their sessions efficiently and securely.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="h-12 px-8 text-base bg-black text-white hover:bg-zinc-800 w-full sm:w-auto">
                  Get Started Free
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" className="h-12 px-8 text-base border-zinc-300 text-black hover:bg-zinc-100 w-full sm:w-auto">
                  Log In
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
