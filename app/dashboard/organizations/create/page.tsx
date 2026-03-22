"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { organizationService } from "@/services/organizationService";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateOrganizationPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    organizationName: "",
    organizationType: "",
    conatactEmail: "",
    isUniversity: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await organizationService.createOrganization({
        organizationName: formData.organizationName,
        organizationType: formData.organizationType,
        conatactEmail: formData.conatactEmail,
        isUniversity: formData.isUniversity,
      });
      if (response.success) {
        router.push("/dashboard/organizations");
      } else {
        setError(response.message || "Failed to create organization");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/organizations">
           <Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Create Organization</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 bg-card p-6 rounded-xl border shadow text-card-foreground">
        <div className="space-y-2">
            <label className="text-sm font-medium">Organization Name</label>
            <Input
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                required
            />
        </div>
        <div className="space-y-2">
            <label className="text-sm font-medium">Type</label>
            <Input
                name="organizationType"
                value={formData.organizationType}
                onChange={handleChange}
                required
            />
        </div>
        <div className="space-y-2">
            <label className="text-sm font-medium">Contact Email</label>
            <Input
                name="conatactEmail"
                type="email"
                value={formData.conatactEmail}
                onChange={handleChange}
                required
            />
        </div>
        <label className="flex items-start gap-3 rounded-lg border border-border bg-muted/30 p-4 cursor-pointer hover:bg-muted/50 transition-colors">
          <input
            name="isUniversity"
            type="checkbox"
            checked={formData.isUniversity}
            onChange={handleChange}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-input accent-primary"
          />
          <span className="text-sm leading-snug">
            <span className="font-medium">This is a university</span>
            <span className="block text-muted-foreground text-xs mt-1">
              Enable if this organization represents a university or higher-education institution.
            </span>
          </span>
        </label>

        {error && <div className="text-destructive text-sm">{error}</div>}

        <div className="pt-4">
            <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Organization
            </Button>
        </div>
      </form>
    </div>
  );
}
