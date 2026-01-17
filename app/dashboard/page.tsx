"use client";

import { useEffect, useState } from "react";
import { organizationService } from "@/services/organizationService";
import { Organization } from "@/types/organization";
import { Loader2, Building2, Plus, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function DashboardPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const orgResponse = await organizationService.getUserOrganizations();
      if (orgResponse.success && orgResponse.data) {
        setOrganizations(orgResponse.data);
      } else {
        setOrganizations([]);
      }
    } catch (err) {
      console.error(err);
      setOrganizations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Link href="/dashboard/organizations/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create Organization
          </Button>
        </Link>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Your Organizations</h2>
        
        {loading ? (
          <div className="flex justify-center p-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : organizations.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {organizations.map((org) => (
              <div key={org.organizationId} className="rounded-xl border bg-card text-card-foreground shadow p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-muted">
                      <Building2 className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{org.organizationName}</h3>
                      <p className="text-sm text-muted-foreground">{org.organizationType}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex flex-col gap-2">
                   <div className="text-xs text-muted-foreground">
                      CODE: <span className="font-mono bg-muted px-1.5 py-0.5 rounded">{org.organizationCode}</span>
                   </div>
                </div>

                <div className="mt-6">
                  <Link href="/dashboard/halls" className="w-full">
                    <Button variant="outline" className="w-full justify-between group cursor-pointer">
                      Halls
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border bg-card p-12 text-center">
            <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No Organizations Yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Get started by creating your first organization.
            </p>
            <Link href="/dashboard/organizations/create">
              <Button className="cursor-pointer">
                <Plus className="mr-2 h-4 w-4" /> Create Organization
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
