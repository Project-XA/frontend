"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { hallService } from "@/services/hallService";
import { organizationService } from "@/services/organizationService";
import { Organization } from "@/types/organization";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateHallPage() {
  const router = useRouter();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [formData, setFormData] = useState({
    hallName: "",
    capacity: 0,
    hallArea: 0,
    organizationId: 0, // Will be set from selector
  });
  const [loading, setLoading] = useState(false);
  const [loadingOrgs, setLoadingOrgs] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrgs = async () => {
      setLoadingOrgs(true);
      try {
        const response = await organizationService.getUserOrganizations();
        if (response.success && response.data) {
          setOrganizations(response.data);
          // Auto-select if only one
          if (response.data.length === 1) {
             setFormData(prev => ({ ...prev, organizationId: response.data![0].organizationId }));
          }
        }
      } catch (err) {
        console.error("Failed to fetch orgs", err);
      } finally {
        setLoadingOrgs(false);
      }
    };
    fetchOrgs();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.organizationId) {
      setError("Please select an organization");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await hallService.createHall(formData);
      if (response.success) {
        router.push("/dashboard/halls");
      } else {
        setError(response.message || "Failed to create hall");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (loadingOrgs) {
      return <div className="flex justify-center p-12"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;
  }

  if (organizations.length === 0) {
      return (
          <div className="max-w-2xl mx-auto space-y-6 text-center pt-10">
              <h2 className="text-xl font-bold">No Organizations Found</h2>
              <p className="text-muted-foreground">You need to belong to an organization to create a hall.</p>
              <Link href="/dashboard/organizations/create">
                <Button>Create Organization</Button>
              </Link>
          </div>
      )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/halls">
           <Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Create Hall</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 bg-card p-6 rounded-xl border shadow text-card-foreground">
        <div className="space-y-2">
            <label className="text-sm font-medium">Organization</label>
            <select
                name="organizationId"
                value={formData.organizationId || ""}
                onChange={handleChange}
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
                <option value="" disabled>-- Select Organization --</option>
                {organizations.map(org => (
                    <option key={org.organizationId} value={org.organizationId}>{org.organizationName}</option>
                ))}
            </select>
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium">Hall Name</label>
            <Input
                name="hallName"
                value={formData.hallName}
                onChange={handleChange}
                required
                placeholder="e.g. Main Conference Room"
            />
        </div>
        <div className="space-y-2">
            <label className="text-sm font-medium">Capacity (people)</label>
            <Input
                name="capacity"
                type="number"
                value={formData.capacity}
                onChange={handleChange}
                required
                min="1"
            />
        </div>
        <div className="space-y-2">
            <label className="text-sm font-medium">Area (sqm)</label>
            <Input
                name="hallArea"
                type="number"
                step="0.1"
                value={formData.hallArea}
                onChange={handleChange}
                required
                min="1"
            />
        </div>

        {error && <div className="text-destructive text-sm">{error}</div>}

        <div className="pt-4">
            <Button type="submit" disabled={loading || !formData.organizationId}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Hall
            </Button>
        </div>
      </form>
    </div>
  );
}
