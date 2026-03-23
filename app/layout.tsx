import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import { AmbientScene } from "@/components/AmbientScene";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Attento",
  description: "Efficient organization and session management system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-background text-foreground`}
      >
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <div
          className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
          aria-hidden
        >
          <AmbientScene variant="page" />
        </div>
        <AuthProvider>
          <Navbar />
          <main id="main-content" className="relative z-0 flex-1 min-w-0">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
