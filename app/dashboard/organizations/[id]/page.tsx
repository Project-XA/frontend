"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { organizationService } from "@/services/organizationService";
import { Organization, UpdateOrganizationRequest, AddMemberRequest } from "@/types/organization";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";
import { Loader2, Building2, Trash2, UserPlus, Save, AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function OrganizationDetailPage() {
  const router = useRouter();
  const params = useParams();
  const orgId = Number(params.id);

  const [organization, setOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Update form state
  const [updateData, setUpdateData] = useState<UpdateOrganizationRequest>({
    organizationName: "",
    organizationType: "",
    conatactEmail: "",
  });
  const [updating, setUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  // Delete state
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Add member form state
  const [memberData, setMemberData] = useState<Omit<AddMemberRequest, "organizationId">>({
    email: "",
    fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    role: "User",
  });
  const [addingMember, setAddingMember] = useState(false);
  const [memberSuccess, setMemberSuccess] = useState(false);
  const [memberError, setMemberError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrg = async () => {
      setLoading(true);
      try {
        const response = await organizationService.getOrganizationStats(orgId);
        if (response.success && response.data) {
          setOrganization(response.data);
          setUpdateData({
            organizationName: response.data.organizationName,
            organizationType: response.data.organizationType,
            conatactEmail: response.data.conatactEmail,
          });
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

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    setUpdateSuccess(false);
    setUpdateError(null);
    try {
      const response = await organizationService.updateOrganization(orgId, updateData);
      if (response.success) {
        setUpdateSuccess(true);
        if (response.data) setOrganization(response.data);
      } else {
        setUpdateError(response.message || "Failed to update organization.");
      }
    } catch (err: any) {
      setUpdateError(err.response?.data?.message || err.message || "An error occurred.");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const response = await organizationService.deleteOrganization(orgId);
      if (response.success) {
        router.push("/dashboard/organizations");
      } else {
        setError(response.message || "Failed to delete organization.");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "An error occurred.");
    } finally {
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddingMember(true);
    setMemberSuccess(false);
    setMemberError(null);
    try {
      const response = await organizationService.addMember({
        ...memberData,
        organizationId: orgId,
      });
      if (response.success) {
        setMemberSuccess(true);
        setMemberData({
          email: "",
          fullName: "",
          userName: "",
          password: "",
          confirmPassword: "",
          role: "User",
        });
      } else {
        setMemberError(response.message || "Failed to add member.");
      }
    } catch (err: any) {
      setMemberError(err.response?.data?.message || err.message || "An error occurred.");
    } finally {
      setAddingMember(false);
    }
  };

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

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Update Organization Card */}
        <Card>
          <CardHeader>
            <CardTitle>Update Organization</CardTitle>
            <CardDescription>Modify the organization details below.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdate} className="space-y-4">
              <Input
                placeholder="Organization Name"
                value={updateData.organizationName}
                onChange={(e) => setUpdateData({ ...updateData, organizationName: e.target.value })}
                required
              />
              <Input
                placeholder="Organization Type"
                value={updateData.organizationType}
                onChange={(e) => setUpdateData({ ...updateData, organizationType: e.target.value })}
                required
              />
              <Input
                type="email"
                placeholder="Contact Email"
                value={updateData.conatactEmail}
                onChange={(e) => setUpdateData({ ...updateData, conatactEmail: e.target.value })}
                required
              />

              {updateError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{updateError}</AlertDescription>
                </Alert>
              )}
              {updateSuccess && (
                <Alert className="border-green-500/50 bg-green-500/10 text-green-700">
                  <AlertDescription>Organization updated successfully!</AlertDescription>
                </Alert>
              )}

              <Button type="submit" disabled={updating} className="w-full">
                {updating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <Save className="mr-2 h-4 w-4" /> Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Add Member Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" /> Add Member
            </CardTitle>
            <CardDescription>Add a new member to this organization.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddMember} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Input
                  placeholder="Full Name"
                  value={memberData.fullName}
                  onChange={(e) => setMemberData({ ...memberData, fullName: e.target.value })}
                  required
                />
                <Input
                  placeholder="Username"
                  value={memberData.userName}
                  onChange={(e) => setMemberData({ ...memberData, userName: e.target.value })}
                  required
                />
              </div>
              <Input
                type="email"
                placeholder="Email"
                value={memberData.email}
                onChange={(e) => setMemberData({ ...memberData, email: e.target.value })}
                required
              />
              <div className="grid grid-cols-2 gap-3">
                <Input
                  type="password"
                  placeholder="Password"
                  value={memberData.password}
                  onChange={(e) => setMemberData({ ...memberData, password: e.target.value })}
                  required
                />
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  value={memberData.confirmPassword}
                  onChange={(e) => setMemberData({ ...memberData, confirmPassword: e.target.value })}
                  required
                />
              </div>
              <select
                value={memberData.role}
                onChange={(e) => setMemberData({ ...memberData, role: e.target.value as "Admin" | "User" })}
                className="flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>

              {memberError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{memberError}</AlertDescription>
                </Alert>
              )}
              {memberSuccess && (
                <Alert className="border-green-500/50 bg-green-500/10 text-green-700">
                  <AlertDescription>Member added successfully!</AlertDescription>
                </Alert>
              )}

              <Button type="submit" disabled={addingMember} className="w-full">
                {addingMember && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <UserPlus className="mr-2 h-4 w-4" /> Add Member
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Danger Zone */}
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>Irreversible actions. Proceed with caution.</CardDescription>
        </CardHeader>
        <CardContent>
          {!showDeleteConfirm ? (
            <Button 
              variant="destructive" 
              onClick={() => setShowDeleteConfirm(true)}
              className="cursor-pointer"
            >
              <Trash2 className="mr-2 h-4 w-4" /> Delete Organization
            </Button>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Are you sure you want to delete <strong>{organization.organizationName}</strong>? This action cannot be undone.
              </p>
              <div className="flex gap-2">
                <Button 
                  variant="destructive" 
                  onClick={handleDelete} 
                  disabled={deleting}
                  className="cursor-pointer"
                >
                  {deleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Yes, Delete
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowDeleteConfirm(false)}
                  className="cursor-pointer"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
