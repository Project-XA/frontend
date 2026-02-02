"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CheckCircle, Users, Zap, Shield, Smartphone, Eye, ArrowRight } from "lucide-react";
import { MobileFrame } from "@/components/MobileFrame";
import { AdminAttendanceMockup } from "@/components/AdminAttendanceMockup";
import { UserAttendanceMockup } from "@/components/UserAttendanceMockup";
import { Footer } from "@/components/Footer";
import { useState } from "react";

export default function FeaturesPage() {
  const [activeFeature, setActiveFeature] = useState<'admin' | 'user'>('user');
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const features = [
    {
      icon: Smartphone,
      title: "One-Tap Check-In",
      description: "Simple, fast, and intuitive interface designed for mobile users",
      details: "Mark attendance in seconds with a single tap. No complex steps or confusion.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Shield,
      title: "Secure Verification",
      description: "Biometric authentication ensures verified attendance records",
      details: "Face recognition and fingerprint scanning for maximum security.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Zap,
      title: "Real-Time Updates",
      description: "Live attendance tracking with instant confirmation",
      details: "See updates instantly across your organization's dashboard.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Eye,
      title: "Admin Dashboard",
      description: "Complete visibility of all attendance data and sessions",
      details: "Monitor attendance, view verification scores, and track patterns.",
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pt-16 bg-white">
      <main className="flex-1 w-full">
        {/* Hero Header */}
        <section className="py-16 md:py-24 px-6 bg-gradient-to-b from-white to-zinc-50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold border border-blue-200">
                <Zap className="h-4 w-4" />
                Powerful Features
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-black">
                Attendance Made Simple
              </h1>
              <p className="text-lg md:text-xl text-zinc-600 max-w-2xl mx-auto leading-relaxed">
                Experience seamless attendance tracking with real-time verification, intuitive design, and enterprise-grade security.
              </p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-12 md:py-20 px-6 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                const isExpanded = expandedCard === index;
                return (
                  <div
                    key={index}
                    onClick={() => setExpandedCard(isExpanded ? null : index)}
                    className="group cursor-pointer overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:border-zinc-300"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} text-white shadow-lg group-hover:scale-110 transition-transform`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <ArrowRight className="h-5 w-5 text-zinc-300 ml-auto group-hover:text-zinc-500 transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-black mb-2">{feature.title}</h3>
                    <p className="text-zinc-600 text-sm leading-relaxed">{feature.description}</p>
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-zinc-100 animate-in fade-in duration-300">
                        <p className="text-zinc-700 text-sm leading-relaxed">{feature.details}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Interactive Demo Section */}
        <section className="py-16 md:py-24 px-6 bg-zinc-50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">See It In Action</h2>
              <p className="text-lg text-zinc-600">Choose a view to explore the experience</p>
            </div>

            {/* Tab Selector */}
            <div className="flex justify-center gap-3 mb-12">
              <button
                onClick={() => setActiveFeature('user')}
                className={`px-6 md:px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeFeature === 'user'
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-100'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  User Check-In
                </span>
              </button>
              <button
                onClick={() => setActiveFeature('admin')}
                className={`px-6 md:px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeFeature === 'admin'
                    ? 'bg-purple-600 text-white shadow-lg scale-105'
                    : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-100'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Admin Dashboard
                </span>
              </button>
            </div>

            {/* Demo Content */}
            <div className="flex justify-center mb-12">
              {activeFeature === 'user' ? (
                <div className="space-y-8 w-full max-w-2xl animate-in fade-in duration-500">
                  <MobileFrame className="mx-auto shadow-2xl">
                    <UserAttendanceMockup />
                  </MobileFrame>
                  <div className="space-y-4 px-6">
                    <h3 className="text-2xl font-bold text-black">Quick & Secure Check-In</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3 text-zinc-700">
                        <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>Simple one-tap check-in interface</span>
                      </li>
                      <li className="flex items-start gap-3 text-zinc-700">
                        <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>Biometric verification for security</span>
                      </li>
                      <li className="flex items-start gap-3 text-zinc-700">
                        <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>Instant confirmation of attendance</span>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="space-y-8 w-full max-w-2xl animate-in fade-in duration-500">
                  <MobileFrame className="mx-auto shadow-2xl">
                    <AdminAttendanceMockup />
                  </MobileFrame>
                  <div className="space-y-4 px-6">
                    <h3 className="text-2xl font-bold text-black">Monitor Attendance in Real-Time</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3 text-zinc-700">
                        <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span>Live attendance updates with verification badges</span>
                      </li>
                      <li className="flex items-start gap-3 text-zinc-700">
                        <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span>Match scores for biometric verification confidence</span>
                      </li>
                      <li className="flex items-start gap-3 text-zinc-700">
                        <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span>Timestamp tracking for every check-in</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 md:py-20 px-6 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {[
                { label: "Faster Check-In", value: "98%", subtext: "time saved per session" },
                { label: "Accuracy Rate", value: "99.8%", subtext: "biometric verification" },
                { label: "Users Active", value: "10K+", subtext: "daily transactions" },
                { label: "Uptime", value: "99.9%", subtext: "system reliability" }
              ].map((stat, index) => (
                <div key={index} className="text-center p-6 rounded-xl bg-gradient-to-br from-zinc-50 to-zinc-100 hover:from-zinc-100 hover:to-zinc-200 transition-all duration-300">
                  <p className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.value}</p>
                  <p className="text-sm font-semibold text-zinc-900 mb-1">{stat.label}</p>
                  <p className="text-xs text-zinc-600">{stat.subtext}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 px-6 bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-white">
              Ready to Transform Your Attendance?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of organizations using Attento to streamline attendance tracking securely and efficiently.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="h-12 px-8 text-base bg-white text-blue-600 hover:bg-blue-50 font-semibold shadow-lg hover:shadow-xl transition-all">
                  Get Started Free
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" className="h-12 px-8 text-base border-white text-white hover:bg-blue-500 font-semibold">
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
