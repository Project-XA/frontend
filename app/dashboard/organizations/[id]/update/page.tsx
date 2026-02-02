"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { organizationService } from "@/services/organizationService";
import { Organization, UpdateOrganizationRequest } from "@/types/organization";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";
import { Loader2, Building2, Trash2, Save, AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function UpdateOrganizationPage() {
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
        <Link href={`/dashboard/organizations/${orgId}`} className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Organization
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
        <Link href={`/dashboard/organizations/${orgId}`} className="p-2 rounded-lg hover:bg-muted transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-muted">
            <Building2 className="h-6 w-6 text-muted-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Update Organization</h1>
            <p className="text-sm text-muted-foreground">{organization.organizationName}</p>
          </div>
        </div>
      </div>

      {/* Update Organization Card */}
      <Card>
        <CardHeader>
          <CardTitle>Organization Details</CardTitle>
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

      {/* Danger Zone */}
      <Card className="border border-red-500/60">
        <CardHeader className="flex flex-row items-start gap-4">
          <div className="mt-1 rounded-md border border-red-500/60 p-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-red-600">Danger Zone</CardTitle>
            <CardDescription>Actions in this section are irreversible</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          {!showDeleteConfirm ? (
            <div className="flex items-center justify-between gap-4 rounded-lg border border-muted p-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Delete this organization</p>
                <p className="text-sm text-muted-foreground">
                  This will permanently delete the organization and all associated data.
                </p>
              </div>
              <Button variant="destructive" onClick={() => setShowDeleteConfirm(true)}>
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </Button>
            </div>
          ) : (
            <div className="space-y-4 rounded-lg border border-red-500/60 p-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Are you absolutely sure?</p>
                <p className="text-sm text-muted-foreground">
                  This action cannot be undone. This will permanently delete{" "}
                  <span className="font-medium text-foreground">{organization.organizationName}</span>.
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
                  {deleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Yes, delete
                </Button>
                <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
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
