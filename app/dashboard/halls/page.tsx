"use client";

import { useEffect, useState } from "react";
import { hallService } from "@/services/hallService";
import { sessionService } from "@/services/sessionService";
import { organizationService } from "@/services/organizationService";
import { Hall } from "@/types/hall";
import { Session } from "@/types/session";
import { Organization } from "@/types/organization";
import { Button } from "@/components/ui/Button";
import { Loader2, Plus, Store, RefreshCw, Building2, Clock, MapPin, Users, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

export default function HallsPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [selectedOrgId, setSelectedOrgId] = useState<number | null>(null);
  const [halls, setHalls] = useState<Hall[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchingHalls, setFetchingHalls] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sessions state
  const [selectedHallId, setSelectedHallId] = useState<number | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [fetchingSessions, setFetchingSessions] = useState(false);

  // Fetch Organizations on Mount
  useEffect(() => {
    const fetchOrgs = async () => {
      setLoading(true);
      try {
        const response = await organizationService.getUserOrganizations();
        if (response.success && response.data) {
          setOrganizations(response.data);
          
          // Auto-select if only one organization
          if (response.data.length === 1) {
            setSelectedOrgId(response.data[0].organizationId);
          }
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load organizations.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrgs();
  }, []);

  // Fetch Halls when Selected Org Changes
  const fetchHalls = async () => {
    if (!selectedOrgId) return;
    
    setFetchingHalls(true);
    setError(null);
    setSelectedHallId(null);
    setSessions([]);
    try {
      const response = await hallService.getAllHalls(selectedOrgId);
      if (response.success && Array.isArray(response.data)) {
        setHalls(response.data);
      } else {
        setHalls([]);
      }
    } catch (err) {
      console.error(err);
      setError("Unable to load halls. Please try again.");
    } finally {
      setFetchingHalls(false);
    }
  };

  useEffect(() => {
    if (selectedOrgId) {
      fetchHalls();
    } else {
      setHalls([]);
      setSelectedHallId(null);
      setSessions([]);
    }
  }, [selectedOrgId]);

  // Fetch Sessions when a Hall is selected
  const fetchSessions = async (hallId: number) => {
    setFetchingSessions(true);
    try {
      const response = await sessionService.getSessionsByHallId(hallId);
      if (response.success && Array.isArray(response.data)) {
        setSessions(response.data);
      } else {
        setSessions([]);
      }
    } catch (err) {
      console.error(err);
      setSessions([]);
    } finally {
      setFetchingSessions(false);
    }
  };

  const handleHallClick = (hallId: number) => {
    if (selectedHallId === hallId) {
      // Toggle off
      setSelectedHallId(null);
      setSessions([]);
    } else {
      setSelectedHallId(hallId);
      fetchSessions(hallId);
    }
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Halls</h1>
        <div className="flex gap-2">
           <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchHalls} 
            disabled={fetchingHalls || !selectedOrgId}
            className="cursor-pointer"
           >
            <RefreshCw className={`h-4 w-4 mr-2 ${fetchingHalls ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          {!loading && organizations.length > 0 && (
            <Link href="/dashboard/halls/create">
              <Button className="cursor-pointer">
                <Plus className="mr-2 h-4 w-4" /> Create Hall
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Organization Selector */}
      {!loading && organizations.length > 0 && (
        <div className="flex items-center gap-3 bg-card p-4 rounded-lg border shadow-sm">
          <Building2 className="h-5 w-5 text-muted-foreground" />
          <label className="text-sm font-medium text-foreground whitespace-nowrap">Select Organization:</label>
          <select
            value={selectedOrgId || ""}
            onChange={(e) => setSelectedOrgId(Number(e.target.value))}
            className="rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring w-full md:w-[300px] cursor-pointer"
          >
            <option value="" disabled>-- Choose an Organization --</option>
            {organizations.map((org) => (
              <option key={org.organizationId} value={org.organizationId}>
                {org.organizationName}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* States */}
      {loading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : organizations.length === 0 ? (
        <div className="rounded-xl border bg-card p-12 text-center">
          <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No Organizations</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            You need to be part of an organization to manage halls.
          </p>
          <Link href="/dashboard/organizations/create">
            <Button className="cursor-pointer">
              <Plus className="mr-2 h-4 w-4" /> Create Organization
            </Button>
          </Link>
        </div>
      ) : !selectedOrgId ? (
        <div className="rounded-xl border border-dashed p-12 text-center">
          <Building2 className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-medium text-muted-foreground">Select an Organization</h3>
          <p className="text-sm text-muted-foreground/80">Please select an organization above to view its halls.</p>
        </div>
      ) : fetchingHalls ? (
         <div className="flex justify-center p-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : error ? (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
          {error}
        </div>
      ) : halls.length > 0 ? (
        <div className="space-y-4">
          {halls.map((hall) => {
            const isSelected = selectedHallId === hall.id;
            return (
              <div key={hall.id} className="rounded-xl border bg-card text-card-foreground shadow hover:shadow-md transition-shadow">
                {/* Hall Card Header */}
                <button
                  onClick={() => handleHallClick(hall.id)}
                  className="w-full p-6 flex items-start gap-3 text-left cursor-pointer"
                >
                  <div className="p-2 rounded-lg bg-muted">
                    <Store className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{hall.hallName}</h3>
                    <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span>Capacity: <span className="font-medium text-foreground">{hall.capacity} people</span></span>
                      <span>Area: <span className="font-medium text-foreground">{hall.hallArea} m²</span></span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span className="text-sm">Sessions</span>
                    {isSelected ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </div>
                </button>

                {/* Sessions Panel (Collapsible) */}
                {isSelected && (
                  <div className="border-t bg-muted/30 p-6">
                    {fetchingSessions ? (
                      <div className="flex justify-center py-8">
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                      </div>
                    ) : sessions.length > 0 ? (
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm text-muted-foreground mb-3">Sessions in this Hall</h4>
                        {sessions.map((session) => (
                          <div 
                            key={session.sessionId} 
                            className="rounded-lg border bg-card p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-3"
                          >
                            <div className="flex items-start gap-3">
                              <div className="p-2 rounded-lg bg-muted">
                                <Users className="h-4 w-4 text-muted-foreground" />
                              </div>
                              <div>
                                <h5 className="font-medium">{session.sessionName}</h5>
                                <div className="mt-1 space-y-0.5 text-xs text-muted-foreground">
                                  <p className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    <span>{formatDateTime(session.startAt)} — {formatDateTime(session.endAt)}</span>
                                  </p>
                                  <p className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    <span>Radius: {session.allowedRadius}m</span>
                                  </p>
                                </div>
                              </div>
                            </div>
                            <span className="px-2.5 py-1 bg-muted rounded-full text-xs font-medium">
                              {session.connectionType}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 text-muted-foreground">
                        <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No sessions found for this hall.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-xl border bg-card p-12 text-center">
          <Store className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No Halls Yet</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            This organization doesn't have any halls yet.
          </p>
          <Link href="/dashboard/halls/create">
            <Button className="cursor-pointer">
              <Plus className="mr-2 h-4 w-4" /> Create Hall
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
