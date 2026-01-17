import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen pt-16 bg-white">
      <section className="container py-24 px-6 mx-auto max-w-4xl">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-black sm:text-5xl">
              About Attendo
            </h1>
            <p className="text-xl text-zinc-600 leading-relaxed">
              We are dedicated to simplifying physical space management for modern organizations.
            </p>
          </div>
          
          <div className="prose prose-zinc max-w-none text-zinc-600 leading-7">
            <p>
              Attendo started with a simple mission: to bridge the gap between digital scheduling and physical attendance. 
              In an era where coordination is key, we provide the tools to ensure your events, classes, and meetings 
              happen exactly where and when they are supposed to.
            </p>
            <p className="mt-4">
              Our platform combines robust backend technology with a clean, intuitive frontend interface, allowing 
              administrators to focus on what matters most—their people and their goals—rather than logistics.
            </p>
          </div>

          <div className="border-t border-zinc-200 pt-8 mt-8">
            <h2 className="text-2xl font-bold text-black mb-4">Open Source</h2>
            <p className="text-zinc-600 mb-6">
              This project is open source and available for contribution. We believe in transparency and community-driven development.
            </p>
            <div className="flex gap-4">
              <Button variant="default" className="bg-black text-white hover:bg-zinc-800">
                View on GitHub
              </Button>
              <Link href="/contact">
                <Button variant="outline" className="text-black border-zinc-200 hover:bg-zinc-50">
                   Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
