"use client";

import { useEffect, useState } from "react";
import { organizationService } from "@/services/organizationService";
import { Organization } from "@/types/organization";
import { Button } from "@/components/ui/Button";
import { Loader2, Plus, Building2, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function OrganizationsPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrganizations = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await organizationService.getUserOrganizations();
      if (response.success && response.data) {
        setOrganizations(response.data);
      } else {
        setOrganizations([]);
      }
    } catch (err: any) {
      console.error(err);
      setError("Unable to load organizations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Organizations</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={fetchOrganizations} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Link href="/dashboard/organizations/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Create Organization
            </Button>
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : error ? (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
          {error}
        </div>
      ) : organizations.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {organizations.map((org) => (
            <Link 
              key={org.organizationId} 
              href={`/dashboard/organizations/${org.organizationId}`}
              className="block rounded-xl border bg-card p-6 shadow text-card-foreground hover:shadow-md hover:border-foreground/20 transition-all cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-muted">
                  <Building2 className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="flex-1 space-y-2">
                  <div>
                      <h3 className="text-xl font-semibold">{org.organizationName}</h3>
                      <p className="text-muted-foreground text-sm">{org.organizationType}</p>
                  </div>
                  
                  <div className="grid gap-1 text-sm pt-2">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <span className="text-muted-foreground shrink-0">Email:</span>
                      <span className="truncate" title={org.conatactEmail}>{org.conatactEmail}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Code:</span>
                      <span className="font-mono bg-muted px-2 py-0.5 rounded text-xs">{org.organizationCode}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Created:</span>
                      <span className="text-xs">{new Date(org.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border bg-card p-12 text-center">
          <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No Organizations Yet</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            You are not part of any organizations yet. Create one to get started.
          </p>
          <Link href="/dashboard/organizations/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Create Your First Organization
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
