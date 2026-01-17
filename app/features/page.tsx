import { Card, CardContent } from "@/components/ui/Card";
import { Building2, Store, Users, MapPin, Zap, ShieldCheck } from "lucide-react";

export default function FeaturesPage() {
  const features = [
    {
      title: "Organization Management",
      description: "Create and manage organizations with unique codes and contact details.",
      icon: Building2,
    },
    {
      title: "Hall Registration",
      description: "Register physical halls with capacity tracking and precise layout details.",
      icon: Store,
    },
    {
      title: "Session Scheduling",
      description: "Schedule sessions with start/end times and assign them to specific halls.",
      icon: Users,
    },
    {
      title: "Geolocation Tracking",
      description: "Ensure attendees are physically present with radius-based location checks.",
      icon: MapPin,
    },
    {
      title: "Real-time Analytics",
      description: "Monitor attendance and session status in real-time from your dashboard.",
      icon: Zap,
    },
    {
      title: "Secure Authentication",
      description: "Enterprise-grade security for admins and users with robust role management.",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen pt-16 bg-white">
      <section className="container py-24 px-6 mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-black sm:text-5xl">
            Powerful Features
          </h1>
          <p className="max-w-[700px] text-zinc-600 md:text-xl/relaxed">
            Everything you need to manage your organization's physical presence effectively.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="border-zinc-200 bg-white hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="p-3 w-fit rounded-xl bg-black/5 text-black mb-4">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-black mb-2">{feature.title}</h3>
                <p className="text-zinc-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
