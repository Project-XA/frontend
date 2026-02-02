"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CheckCircle, Users, Smartphone } from "lucide-react";
import { MobileFrame } from "@/components/MobileFrame";
import { AdminAttendanceMockup } from "@/components/AdminAttendanceMockup";
import { UserAttendanceMockup } from "@/components/UserAttendanceMockup";
import { Footer } from "@/components/Footer";

export default function FeaturesPage() {
  const features = [
    {
      title: "One-Tap Check-In",
      description: "Simple and fast interface for users to mark attendance instantly."
    },
    {
      title: "Real-Time Dashboard",
      description: "Admins monitor all attendance records with live updates."
    },
    {
      title: "Secure Verification",
      description: "Biometric authentication ensures all records are verified and secure."
    },
    {
      title: "Instant Confirmation",
      description: "Users receive immediate feedback once their attendance is recorded."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pt-16 bg-white">
      <main className="flex-1 w-full">
        {/* Hero Header */}
        <section className="py-16 md:py-24 px-6 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-black">
                Attendance Made Simple
              </h1>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Real-time attendance tracking with secure verification for users and administrators.
              </p>
            </div>
          </div>
        </section>

        {/* Demo Section - Side by Side */}
        <section className="py-16 md:py-24 px-6 bg-white">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-black">See It In Action</h2>
            </div>

            {/* Mockups Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
              {/* User View */}
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2 mb-6 w-full justify-center">
                  <Smartphone className="h-5 w-5 text-black" />
                  <h3 className="text-lg font-bold text-black">User Check-In</h3>
                </div>
                <MobileFrame>
                  <UserAttendanceMockup />
                </MobileFrame>
                <div className="space-y-2 mt-6 w-full px-4">
                  <p className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-black" />
                    One-tap check-in
                  </p>
                  <p className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-black" />
                    Biometric verification
                  </p>
                  <p className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-black" />
                    Instant confirmation
                  </p>
                </div>
              </div>

              {/* Admin View */}
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2 mb-6 w-full justify-center">
                  <Users className="h-5 w-5 text-black" />
                  <h3 className="text-lg font-bold text-black">Admin Dashboard</h3>
                </div>
                <MobileFrame>
                  <AdminAttendanceMockup />
                </MobileFrame>
                <div className="space-y-2 mt-6 w-full px-4">
                  <p className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-black" />
                    Real-time updates
                  </p>
                  <p className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-black" />
                    Verification scores
                  </p>
                  <p className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-black" />
                    Complete records
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 px-6 bg-gray-50">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-black mb-12 text-center">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="p-6 border-2 border-black bg-white hover:bg-gray-50 transition-colors">
                  <h3 className="text-lg font-bold text-black mb-2">{feature.title}</h3>
                  <p className="text-gray-700 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 px-6 bg-black text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to streamline attendance?</h2>
            <p className="text-lg text-gray-300 mb-8">
              Join organizations using Attento for secure, efficient attendance tracking.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="h-12 px-8 text-base bg-white text-black hover:bg-gray-200 font-semibold">
                  Get Started Free
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" className="h-12 px-8 text-base border-white text-white hover:bg-gray-900 font-semibold">
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
