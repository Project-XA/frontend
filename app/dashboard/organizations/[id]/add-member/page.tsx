"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { organizationService } from "@/services/organizationService";
import { Organization, AddMemberRequest } from "@/types/organization";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";
import { Loader2, Building2, UserPlus, AlertCircle, ArrowLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function AddMemberPage() {
  const router = useRouter();
  const params = useParams();
  const orgId = Number(params.id);

  const [organization, setOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Add member form state
  const [memberData, setMemberData] = useState<Omit<AddMemberRequest, "organizationId">>({
    email: "",
    fullName: "",
    userName: "",
    password: "",
    phoneNumber: "",
    confirmPassword: "",
    role: "User",
  });
  const [addingMember, setAddingMember] = useState(false);
  const [memberSuccess, setMemberSuccess] = useState(false);
  const [memberErrors, setMemberErrors] = useState<string[]>([]);

  // Show/hide password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  // Redirect to main page after successful member addition
  useEffect(() => {
    if (memberSuccess) {
      const timer = setTimeout(() => {
        router.push(`/dashboard/organizations/${orgId}`);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [memberSuccess, orgId, router]);

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
          phoneNumber: "",
          userName: "",
          password: "",
          confirmPassword: "",
          role: "User",
        });
      } else {
        // Prioritize errors array, fallback to message
        if (response.errors && response.errors.length > 0) {
          setMemberErrors(response.errors);
        } else if (response.message) {
          setMemberErrors([response.message]);
        } else {
          setMemberErrors(["Failed to add member."]);
        }
      }
    } catch (err: any) {
      // Prioritize errors array, fallback to message
      if (err.response?.data?.errors && Array.isArray(err.response.data.errors) && err.response.data.errors.length > 0) {
        setMemberErrors(err.response.data.errors);
      } else if (err.response?.data?.message) {
        setMemberErrors([err.response.data.message]);
      } else if (err.message) {
        setMemberErrors([err.message]);
      } else {
        setMemberErrors(["An error occurred."]);
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
    <div className="space-y-8 max-w-4xl mx-auto">
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
            <h1 className="text-2xl font-bold tracking-tight">Add Member</h1>
            <p className="text-sm text-muted-foreground">{organization.organizationName}</p>
          </div>
        </div>
      </div>

      {/* Add Member Form - Full Page */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <UserPlus className="h-5 w-5" /> Add New Member
          </h2>
          <p className="text-sm text-muted-foreground">Fill in the details to add a new member to this organization.</p>
        </div>

        <form onSubmit={handleAddMember} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <Input
                name="fullName"
                placeholder="Enter full name"
                value={memberData.fullName}
                onChange={handleMemberChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Username</label>
              <Input
                name="userName"
                placeholder="Enter username"
                value={memberData.userName}
                onChange={handleMemberChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                name="email"
                type="email"
                placeholder="Enter email address"
                value={memberData.email}
                onChange={handleMemberChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone Number</label>
              <Input
                name="phoneNumber"
                type="text"
                placeholder="Enter phone number"
                value={memberData.phoneNumber}
                onChange={handleMemberChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
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
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Confirm Password</label>
              <Input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
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
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Role</label>
            <select
              name="role"
              value={memberData.role}
              onChange={handleMemberChange}
              className="flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          {memberErrors.length > 0 && (
            <Alert variant="destructive" className="animate-in fade-in slide-in-from-top-2 border-red-200 bg-red-50 text-red-900">
              <AlertCircle className="h-4 w-4 text-red-900" />
              <AlertTitle className="text-red-900 font-semibold">Error</AlertTitle>
              <div className="mt-2 text-sm text-red-800 space-y-1">
                {memberErrors.map((err, index) => (
                  <div key={index}>• {err}</div>
                ))}
              </div>
            </Alert>
          )}
          {memberSuccess && (
            <Alert className="border-green-500/50 bg-green-500/10 text-green-700">
              <AlertDescription>Member added successfully! Redirecting...</AlertDescription>
            </Alert>
          )}

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={addingMember || memberSuccess} className="flex-1">
              {addingMember && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <UserPlus className="mr-2 h-4 w-4" /> Add Member
            </Button>
            <Link href={`/dashboard/organizations/${orgId}`} className="flex-1">
              <Button type="button" variant="outline" className="w-full">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
