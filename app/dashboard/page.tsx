"use client";

import { useEffect, useState } from "react";
import { organizationService } from "@/services/organizationService";
import { Organization, OrganizationEvent } from "@/types/organization";
import { Loader2, Building2, Plus, ArrowRight, Activity, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";

export default function DashboardPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [recentEvents, setRecentEvents] = useState<OrganizationEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingEvents, setLoadingEvents] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const orgResponse = await organizationService.getUserOrganizations();
      if (orgResponse.success && orgResponse.data) {
        setOrganizations(orgResponse.data);
        fetchEvents(orgResponse.data);
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

  const fetchEvents = async (orgs: Organization[]) => {
    setLoadingEvents(true);
    try {
      if (orgs.length === 0) {
        setRecentEvents([]);
        return;
      }

      const eventPromises = orgs.map(org => organizationService.getOrganizationEvents(org.organizationId));
      const eventResponses = await Promise.all(eventPromises);

      const allEvents: OrganizationEvent[] = [];
      eventResponses.forEach((res, index) => {
        if (res.success && res.data) {
          const orgName = orgs[index].organizationName;
          res.data.forEach(event => {
            allEvents.push({ ...event, organizationName: orgName });
          });
        }
      });

      // Sort by date descending and take top 10
      allEvents.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setRecentEvents(allEvents.slice(0, 10));

    } catch (err) {
      console.error("Failed to fetch dashboard events", err);
    } finally {
      setLoadingEvents(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Dashboard</h1>
        <Link href="/dashboard/organizations/create" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto flex justify-center sm:justify-start">
            <Plus className="mr-2 h-4 w-4" /> Create Organization
          </Button>
        </Link>
      </div>

      {/* Organizations Section */}
      <div className="space-y-4">
        <h2 className="text-lg sm:text-xl font-semibold tracking-tight">Your Organizations</h2>

        {loading ? (
          <div className="flex justify-center p-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : organizations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {organizations.map((org) => (
              <div
                key={org.organizationId}
                className="flex flex-col rounded-xl border bg-card text-card-foreground shadow p-4 sm:p-6"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 rounded-lg bg-muted">
                      <Building2 className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-base sm:text-lg">{org.organizationName}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">{org.organizationType}</p>
                    </div>
                  </div>
                </div>

                {/* Organization Code */}
                <div className="mt-4 sm:mt-6 flex flex-col gap-2">
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    CODE:{" "}
                    <span className="font-mono bg-muted px-1.5 py-0.5 rounded">
                      {org.organizationCode}
                    </span>
                  </div>
                </div>


              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border bg-card p-8 sm:p-12 text-center">
            <Building2 className="h-10 w-10 sm:h-12 sm:w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-base sm:text-lg font-medium mb-2">No Organizations Yet</h3>
            <p className="text-xs sm:text-sm text-muted-foreground mb-6 max-w-xs sm:max-w-md mx-auto">
              Get started by creating your first organization.
            </p>
            <Link href="/dashboard/organizations/create" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto flex justify-center sm:justify-start">
                <Plus className="mr-2 h-4 w-4" /> Create Organization
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Recent Activity Section */}
      <div className="space-y-4 pt-4">
        <h2 className="text-lg sm:text-xl font-semibold tracking-tight">Recent Activity</h2>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" /> Activity Stream
            </CardTitle>
            <CardDescription>Recent events across all your organizations.</CardDescription>
          </CardHeader>
          <CardContent>
            {loadingEvents ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : recentEvents.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No recent activity found.</p>
            ) : (
              <div className="space-y-4">
                {recentEvents.map((event, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-lg border bg-muted/30">
                    <div className="mt-1 bg-background p-2 rounded-full border">
                      <Activity className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm">{event.eventType}</p>
                        <span className="text-xs bg-muted border px-2 py-0.5 rounded-full text-muted-foreground">
                          {event.organizationName}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                      <p className="text-xs text-muted-foreground pt-1 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(event.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
