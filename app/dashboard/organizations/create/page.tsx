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
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await organizationService.createOrganization(formData);
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
