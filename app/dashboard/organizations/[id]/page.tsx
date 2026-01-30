"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { organizationService } from "@/services/organizationService";
import { Organization, UpdateOrganizationRequest, AddMemberRequest, User } from "@/types/organization";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";
import { Loader2, Building2, Trash2, UserPlus, Save, AlertCircle, ArrowLeft, Eye, EyeOff, Users } from "lucide-react";
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
  const [memberErrors, setMemberErrors] = useState<string[]>([]);

  // Show/hide password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
  }, [orgId, memberSuccess]); // Refetch when a new member is added

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

  const handleMemberChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setMemberData({ ...memberData, [e.target.name]: e.target.value });
    if (memberErrors.length > 0) setMemberErrors([]);
  };

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddingMember(true);
    setMemberSuccess(false);
    setMemberErrors([]);
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
        if (response.errors && response.errors.length > 0) {
          setMemberErrors(response.errors);
        } else {
          setMemberErrors([response.message || "Failed to add member."]);
        }
      }
    } catch (err: any) {
      if (err.response?.data?.errors && Array.isArray(err.response.data.errors)) {
        setMemberErrors(err.response.data.errors);
      } else {
        setMemberErrors([err.response?.data?.message || err.message || "An error occurred."]);
      }
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
                  name="fullName"
                  placeholder="Full Name"
                  value={memberData.fullName}
                  onChange={handleMemberChange}
                  required
                />
                <Input
                  name="userName"
                  placeholder="Username"
                  value={memberData.userName}
                  onChange={handleMemberChange}
                  required
                />
              </div>
              <Input
                name="email"
                type="email"
                placeholder="Email"
                value={memberData.email}
                onChange={handleMemberChange}
                required
              />
              <div className="grid grid-cols-2 gap-3">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={memberData.password}
                  onChange={handleMemberChange}
                  required
                  suffix={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="hover:text-black text-zinc-500"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  }
                />
                <Input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={memberData.confirmPassword}
                  onChange={handleMemberChange}
                  required
                  suffix={
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="hover:text-black text-zinc-500"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  }
                />
              </div>
              <select
                name="role"
                value={memberData.role}
                onChange={handleMemberChange}
                className="flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>

              {memberErrors.length > 0 && (
                <Alert variant="destructive" className="animate-in fade-in slide-in-from-top-2 border-red-200 bg-red-50 text-red-900">
                  <AlertCircle className="h-4 w-4 text-red-900" />
                  <AlertTitle className="text-red-900 font-semibold">Error</AlertTitle>
                  <div className="mt-2 text-sm text-red-800 list-disc pl-4 space-y-1">
                    {memberErrors.map((err, index) => (
                      <div key={index}>• {err}</div>
                    ))}
                  </div>
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
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            member.role === "Admin"
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
