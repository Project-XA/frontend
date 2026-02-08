"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { organizationService } from "@/services/organizationService";
import { Organization, User } from "@/types/organization";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";
import { Loader2, Building2, UserPlus, AlertCircle, ArrowLeft, Users, Settings, Key } from "lucide-react";
import Link from "next/link";

export default function OrganizationDetailPage() {
  const params = useParams();
  const orgId = Number(params.id);

  const [organization, setOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Members list state
  const [members, setMembers] = useState<User[]>([]);
  const [loadingMembers, setLoadingMembers] = useState(true);
  const [membersError, setMembersError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrg = async () => {
      setLoading(true);
      try {
        const response = await organizationService.getOrganizationStats(orgId);
        if (response.success && response.data) {
          setOrganization(response.data);
        } else {
          setError("Organization not found.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load organization.");
      } finally {
        setLoading(false);
      }
    };
    if (orgId) fetchOrg();
  }, [orgId]);

  useEffect(() => {
    const fetchMembers = async () => {
      setLoadingMembers(true);
      setMembersError(null);
      try {
        const response = await organizationService.getOrganizationUsers(orgId);
        if (response.success && response.data) {
          setMembers(response.data);
        } else {
          setMembersError(response.message || "Failed to load members.");
        }
      } catch (err: any) {
        console.error(err);
        setMembersError(err.response?.data?.message || err.message || "Failed to load members.");
      } finally {
        setLoadingMembers(false);
      }
    };
    if (orgId) fetchMembers();
  }, [orgId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-24">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !organization) {
    return (
      <div className="space-y-4">
        <Link href="/dashboard/organizations" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Organizations
        </Link>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error || "Organization not found."}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/organizations" className="p-2 rounded-lg hover:bg-muted transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-muted">
              <Building2 className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{organization.organizationName}</h1>
              <p className="text-sm text-muted-foreground">Code: {organization.organizationCode}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Link href={`/dashboard/organizations/${orgId}/api-key`}>
            <Button variant="outline" className="text-destructive hover:text-destructive border-destructive hover:bg-destructive/10">
              <Key className="mr-2 h-4 w-4" /> Generate API Key
            </Button>
          </Link>
          <Link href={`/dashboard/organizations/${orgId}/update`}>
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" /> Update Organization
            </Button>
          </Link>
          <Link href={`/dashboard/organizations/${orgId}/add-member`}>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" /> Add Member
            </Button>
          </Link>
        </div>
      </div>

      {/* Members List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" /> Organization Members
          </CardTitle>
          <CardDescription>View all members in this organization.</CardDescription>
        </CardHeader>
        <CardContent>
          {loadingMembers ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : membersError ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{membersError}</AlertDescription>
            </Alert>
          ) : members.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No members found in this organization.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-sm">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Username</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Email</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Phone</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Role</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member) => (
                    <tr key={member.id} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4 text-sm">{member.fullName}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{member.userName}</td>
                      <td className="py-3 px-4 text-sm">{member.email}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{member.phoneNumber}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${member.role === "Admin"
                            ? "bg-blue-100 text-blue-800 border border-blue-200"
                            : "bg-gray-100 text-gray-800 border border-gray-200"
                            }`}
                        >
                          {member.role}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {new Date(member.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
