"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CheckCircle, Users, Smartphone, Zap, Lock, BarChart3 } from "lucide-react";
import { MobileFrame } from "@/components/MobileFrame";
import { AdminAttendanceMockup } from "@/components/AdminAttendanceMockup";
import { UserAttendanceMockup } from "@/components/UserAttendanceMockup";
import { Footer } from "@/components/Footer";

export default function FeaturesPage() {
  const [checkedInUser, setCheckedInUser] = useState<{ name: string; time: string } | null>(null);

  const features = [
    {
      icon: Smartphone,
      title: "One-Tap Check-In",
      description: "Simple and intuitive interface that lets users mark attendance instantly with just one tap."
    },
    {
      icon: BarChart3,
      title: "Real-Time Dashboard",
      description: "Admins can monitor all attendance records live, with instant updates and verification status."
    },
    {
      icon: Lock,
      title: "Secure Verification",
      description: "Biometric authentication with face recognition and fingerprint scanning ensures complete security."
    },
    {
      icon: Zap,
      title: "Instant Confirmation",
      description: "Users receive immediate visual feedback once their attendance has been successfully recorded."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pt-16 bg-white">
      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="py-20 md:py-32 px-6 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center space-y-6">
              <div className="inline-block px-4 py-2 bg-black text-white rounded-full text-sm font-semibold">
                Powerful Features
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-black tracking-tight">
                Attendance Made Simple
              </h1>
              <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Real-time attendance tracking with secure verification, intuitive design, and complete visibility for both users and administrators.
              </p>
            </div>
          </div>
        </section>

        {/* Demo Section - Side by Side */}
        <section className="py-20 md:py-32 px-6 bg-gray-50 border-y border-gray-200">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-black">See It In Action</h2>
              <p className="text-gray-700 text-lg">Explore both user and admin interfaces</p>
            </div>

            {/* Mockups Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
              {/* User View */}
              <div className="flex flex-col items-center space-y-6">
                <div className="space-y-2 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Smartphone className="h-5 w-5 text-black" />
                    <h3 className="text-2xl font-bold text-black">User Check-In</h3>
                  </div>
                  <p className="text-gray-600 text-sm">Fast and secure attendance marking</p>
                </div>
                <div className="rounded-2xl shadow-lg">
                  <MobileFrame>
                    <UserAttendanceMockup onCheckIn={setCheckedInUser} />
                  </MobileFrame>
                </div>
                <ul className="space-y-3 w-full">
                  <li className="flex items-start gap-3 text-gray-700">
                    <CheckCircle className="h-5 w-5 text-black flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">One-tap check-in with biometric verification</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <CheckCircle className="h-5 w-5 text-black flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">Real-time session information display</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <CheckCircle className="h-5 w-5 text-black flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">Attendance statistics at a glance</span>
                  </li>
                </ul>
              </div>

              {/* Admin View */}
              <div className="flex flex-col items-center space-y-6">
                <div className="space-y-2 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Users className="h-5 w-5 text-black" />
                    <h3 className="text-2xl font-bold text-black">Admin Dashboard</h3>
                  </div>
                  <p className="text-gray-600 text-sm">Complete attendance monitoring</p>
                </div>
                <div className="rounded-2xl shadow-lg">
                  <MobileFrame>
                    <AdminAttendanceMockup checkedInUser={checkedInUser} />
                  </MobileFrame>
                </div>
                <ul className="space-y-3 w-full">
                  <li className="flex items-start gap-3 text-gray-700">
                    <CheckCircle className="h-5 w-5 text-black flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">Live attendance list with verification status</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <CheckCircle className="h-5 w-5 text-black flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">Real-time verification scores and confidence</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <CheckCircle className="h-5 w-5 text-black flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">Expandable details for each attendee</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid Section */}
        <section className="py-20 md:py-32 px-6 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-black">Key Features</h2>
              <p className="text-gray-700 text-lg">Everything you need for modern attendance management</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div 
                    key={index}
                    className="p-8 border-2 border-black rounded-lg bg-white hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 bg-black rounded-lg text-white group-hover:scale-110 transition-transform duration-300">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-black mb-2">{feature.title}</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 px-6 bg-white">
          <div className="container mx-auto max-w-4xl text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-black">
                Ready to streamline attendance?
              </h2>
              <p className="text-lg text-gray-700">
                Join thousands of organizations using Attento for secure, efficient attendance tracking.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="h-12 px-8 text-base bg-black text-white hover:bg-gray-900 font-semibold">
                  Get Started Free
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" className="h-12 px-8 text-base border-black text-black hover:bg-gray-100 font-semibold">
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
