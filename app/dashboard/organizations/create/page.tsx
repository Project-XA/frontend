"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { AxiosError } from "axios";
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
  const organizationTypeBeforeUniversityRef = useRef("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (name === "isUniversity" && type === "checkbox") {
      setFormData((prev) => {
        if (checked) {
          organizationTypeBeforeUniversityRef.current = prev.organizationType;
          return { ...prev, isUniversity: true, organizationType: "University" };
        }
        return {
          ...prev,
          isUniversity: false,
          organizationType: organizationTypeBeforeUniversityRef.current,
        };
      });
      return;
    }
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
        organizationType: formData.isUniversity ? "University" : formData.organizationType,
        conatactEmail: formData.conatactEmail,
        isUniversity: formData.isUniversity,
      });
      if (response.success) {
        router.push("/dashboard/organizations");
      } else {
        setError(response.message || "Failed to create organization");
      }
    } catch (err: unknown) {
      const ax = err as AxiosError<{ message?: string; errors?: string[] }>;
      const data = ax.response?.data;
      const fromErrors =
        data && typeof data === "object" && Array.isArray(data.errors) && data.errors.length
          ? data.errors.join(" ")
          : undefined;
      const fromMessage =
        data && typeof data === "object" && typeof data.message === "string" ? data.message : undefined;
      let msg = fromErrors || fromMessage || ax.message || "An error occurred";
      if (ax.response?.status === 401) {
        msg = `${msg} If this keeps happening, sign out and sign in again.`;
      }
      setError(msg);
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
              When enabled, the organization type is set to University and cannot be edited manually.
            </span>
          </span>
        </label>
        <div className="space-y-2">
            <label className="text-sm font-medium">Type</label>
            <Input
                name="organizationType"
                value={formData.organizationType}
                onChange={handleChange}
                required
                disabled={formData.isUniversity}
                title={
                  formData.isUniversity
                    ? "Type is set to University for this organization."
                    : undefined
                }
                className={
                  formData.isUniversity
                    ? "cursor-not-allowed opacity-80 bg-muted"
                    : undefined
                }
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
