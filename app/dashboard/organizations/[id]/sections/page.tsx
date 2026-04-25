"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { sectionService } from "@/services/sectionService";
import { organizationService } from "@/services/organizationService";
import { Section, SectionMember, CreateSectionRequest, UpdateSectionRequest, AddSectionMemberRequest } from "@/types/section";
import { Organization } from "@/types/organization";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Loader2, ArrowLeft, Plus, GraduationCap, Users, Trash2, Edit2, X, BookOpen, Copy, Check } from "lucide-react";
import Link from "next/link";
import type { AxiosError } from "axios";

export default function SectionsManagementPage() {
  const params = useParams();
  const orgId = Number(params.id);

  const [organization, setOrganization] = useState<Organization | null>(null);
  const [loadingOrg, setLoadingOrg] = useState(true);
  const [orgError, setOrgError] = useState<string | null>(null);

  const [sections, setSections] = useState<Section[]>([]);
  const [loadingSections, setLoadingSections] = useState(true);
  const [sectionsError, setSectionsError] = useState<string | null>(null);

  // Create section dialog state
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newSectionName, setNewSectionName] = useState("");
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  // Edit section dialog state
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [editSectionName, setEditSectionName] = useState("");
  const [updating, setUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  // Delete section dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingSection, setDeletingSection] = useState<Section | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Members dialog state
  const [membersDialogOpen, setMembersDialogOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [sectionMembers, setSectionMembers] = useState<SectionMember[]>([]);
  const [loadingMembers, setLoadingMembers] = useState(false);
  const [membersError, setMembersError] = useState<string | null>(null);

  // Add member dialog state
  const [addMemberDialogOpen, setAddMemberDialogOpen] = useState(false);
  const [memberFormData, setMemberFormData] = useState({
    email: "",
    fullName: "",
    phoneNumber: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });
  const [addingMember, setAddingMember] = useState(false);
  const [addMemberError, setAddMemberError] = useState<string | null>(null);

  // Copy code state
  const [copiedCode, setCopiedCode] = useState<number | null>(null);

  useEffect(() => {
    const fetchOrganization = async () => {
      setLoadingOrg(true);
      try {
        const response = await organizationService.getOrganizationStats(orgId);
        if (response.success && response.data) {
          setOrganization(response.data);
          if (!response.data.isUniversity) {
            setOrgError("Sections are only available for university organizations.");
          }
        } else {
          setOrgError("Organization not found.");
        }
      } catch (err) {
        console.error(err);
        setOrgError("Failed to load organization.");
      } finally {
        setLoadingOrg(false);
      }
    };
    if (orgId) fetchOrganization();
  }, [orgId]);

  useEffect(() => {
    const fetchSections = async () => {
      if (!organization?.isUniversity) return;
      setLoadingSections(true);
      setSectionsError(null);
      try {
        const response = await sectionService.getSectionsByOrganization(orgId);
        if (response.success && response.data) {
          setSections(response.data);
        } else {
          setSectionsError(response.message || "Failed to load sections.");
        }
      } catch (err: any) {
        console.error(err);
        setSectionsError(err.response?.data?.message || "Failed to load sections.");
      } finally {
        setLoadingSections(false);
      }
    };
    if (orgId && organization?.isUniversity) fetchSections();
  }, [orgId, organization?.isUniversity]);

  const handleCreateSection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSectionName.trim()) return;

    setCreating(true);
    setCreateError(null);
    try {
      const data: CreateSectionRequest = {
        organizationId: orgId,
        sectionName: newSectionName.trim(),
      };
      const response = await sectionService.createSection(data);
      if (response.success && response.data) {
        setSections((prev) => [...prev, response.data]);
        setNewSectionName("");
        setCreateDialogOpen(false);
      } else {
        setCreateError(response.message || "Failed to create section.");
      }
    } catch (err: unknown) {
      const ax = err as AxiosError<{ message?: string; errors?: string[] }>;
      const msg = ax.response?.data?.message || ax.message || "An error occurred";
      setCreateError(msg);
    } finally {
      setCreating(false);
    }
  };

  const handleUpdateSection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSection || !editSectionName.trim()) return;

    setUpdating(true);
    setUpdateError(null);
    try {
      const data: UpdateSectionRequest = {
        sectionName: editSectionName.trim(),
      };
      const response = await sectionService.updateSection(editingSection.sectionId, data);
      if (response.success && response.data) {
        setSections((prev) =>
          prev.map((s) => (s.sectionId === editingSection.sectionId ? response.data : s))
        );
        setEditDialogOpen(false);
        setEditingSection(null);
      } else {
        setUpdateError(response.message || "Failed to update section.");
      }
    } catch (err: any) {
      setUpdateError(err.response?.data?.message || err.message || "An error occurred.");
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteSection = async () => {
    if (!deletingSection) return;

    setDeleting(true);
    try {
      const response = await sectionService.deleteSection(deletingSection.sectionId);
      if (response.success) {
        setSections((prev) => prev.filter((s) => s.sectionId !== deletingSection.sectionId));
        setDeleteDialogOpen(false);
        setDeletingSection(null);
      } else {
        setSectionsError(response.message || "Failed to delete section.");
      }
    } catch (err: any) {
      setSectionsError(err.response?.data?.message || err.message || "An error occurred.");
    } finally {
      setDeleting(false);
    }
  };

  const openEditDialog = (section: Section) => {
    setEditingSection(section);
    setEditSectionName(section.sectionName);
    setEditDialogOpen(true);
    setUpdateError(null);
  };

  const openDeleteDialog = (section: Section) => {
    setDeletingSection(section);
    setDeleteDialogOpen(true);
  };

  const openMembersDialog = async (section: Section) => {
    setSelectedSection(section);
    setMembersDialogOpen(true);
    setLoadingMembers(true);
    setMembersError(null);
    try {
      const response = await sectionService.getSectionMembers(section.sectionId);
      if (response.success && response.data) {
        setSectionMembers(response.data);
      } else {
        setMembersError(response.message || "Failed to load members.");
      }
    } catch (err: any) {
      setMembersError(err.response?.data?.message || "Failed to load members.");
    } finally {
      setLoadingMembers(false);
    }
  };

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSection) return;

    setAddingMember(true);
    setAddMemberError(null);
    try {
      const data: AddSectionMemberRequest = {
        sectionId: selectedSection.sectionId,
        ...memberFormData,
      };
      const response = await sectionService.addSectionMember(data);
      if (response.success) {
        // Refresh members list
        const membersResponse = await sectionService.getSectionMembers(selectedSection.sectionId);
        if (membersResponse.success && membersResponse.data) {
          setSectionMembers(membersResponse.data);
        }
        // Update member count in sections list
        setSections((prev) =>
          prev.map((s) =>
            s.sectionId === selectedSection.sectionId
              ? { ...s, memberCount: s.memberCount + 1 }
              : s
          )
        );
        setMemberFormData({
          email: "",
          fullName: "",
          phoneNumber: "",
          userName: "",
          password: "",
          confirmPassword: "",
        });
        setAddMemberDialogOpen(false);
      } else {
        setAddMemberError(response.message || "Failed to add member.");
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
      setAddMemberError(fromErrors || fromMessage || ax.message || "An error occurred");
    } finally {
      setAddingMember(false);
    }
  };

  const handleRemoveMember = async (userId: string) => {
    if (!selectedSection) return;

    try {
      const response = await sectionService.removeSectionMember(selectedSection.sectionId, userId);
      if (response.success) {
        setSectionMembers((prev) => prev.filter((m) => m.id !== userId));
        // Update member count in sections list
        setSections((prev) =>
          prev.map((s) =>
            s.sectionId === selectedSection.sectionId
              ? { ...s, memberCount: Math.max(0, s.memberCount - 1) }
              : s
          )
        );
      }
    } catch (err) {
      console.error("Failed to remove member:", err);
    }
  };

  const copySectionCode = (code: number) => {
    navigator.clipboard.writeText(code.toString());
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  if (loadingOrg) {
    return (
      <div className="flex justify-center items-center p-24">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (orgError || !organization) {
    return (
      <div className="space-y-4">
        <Link href={`/dashboard/organizations/${orgId}`} className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Organization
        </Link>
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{orgError || "Organization not found."}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/dashboard/organizations/${orgId}`} className="p-2 rounded-lg hover:bg-muted transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-muted">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Sections Management</h1>
              <p className="text-sm text-muted-foreground">{organization.organizationName}</p>
            </div>
          </div>
        </div>

        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Create Section
        </Button>
      </div>

      {/* Sections List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" /> Lab Sections
          </CardTitle>
          <CardDescription>
            Manage lab sections for this university. Students can join using the section code.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loadingSections ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : sectionsError ? (
            <Alert variant="destructive">
              <AlertDescription>{sectionsError}</AlertDescription>
            </Alert>
          ) : sections.length === 0 ? (
            <div className="text-center py-8 space-y-4">
              <p className="text-muted-foreground">No sections found. Create your first section to get started.</p>
              <Button onClick={() => setCreateDialogOpen(true)} variant="outline">
                <Plus className="mr-2 h-4 w-4" /> Create Section
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {sections.map((section) => (
                <Card key={section.sectionId} className="relative">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{section.sectionName}</CardTitle>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => openEditDialog(section)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => openDeleteDialog(section)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardDescription>
                      Created {new Date(section.createdAt).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="text-xs text-muted-foreground">Section Code</p>
                        <p className="text-lg font-mono font-semibold">{section.sectionCode}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => copySectionCode(section.sectionCode)}
                      >
                        {copiedCode === section.sectionCode ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{section.memberCount} members</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openMembersDialog(section)}
                      >
                        Manage Members
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Section Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent onClose={() => setCreateDialogOpen(false)}>
          <DialogHeader>
            <DialogTitle>Create New Section</DialogTitle>
            <DialogDescription>
              Create a new lab section. A unique 4-digit code will be generated for students to join.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateSection}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Section Name</label>
                <Input
                  placeholder="e.g., Lab Group A"
                  value={newSectionName}
                  onChange={(e) => setNewSectionName(e.target.value)}
                  required
                />
              </div>
              {createError && (
                <Alert variant="destructive">
                  <AlertDescription>{createError}</AlertDescription>
                </Alert>
              )}
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={creating}>
                {creating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Section
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Section Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent onClose={() => setEditDialogOpen(false)}>
          <DialogHeader>
            <DialogTitle>Edit Section</DialogTitle>
            <DialogDescription>Update the section name.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateSection}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Section Name</label>
                <Input
                  value={editSectionName}
                  onChange={(e) => setEditSectionName(e.target.value)}
                  required
                />
              </div>
              {updateError && (
                <Alert variant="destructive">
                  <AlertDescription>{updateError}</AlertDescription>
                </Alert>
              )}
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={updating}>
                {updating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Section Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent onClose={() => setDeleteDialogOpen(false)}>
          <DialogHeader>
            <DialogTitle>Delete Section</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <strong>{deletingSection?.sectionName}</strong>? This will remove all student memberships in this section. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={handleDeleteSection} disabled={deleting}>
              {deleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Members Dialog */}
      <Dialog open={membersDialogOpen} onOpenChange={setMembersDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto" onClose={() => setMembersDialogOpen(false)}>
          <DialogHeader>
            <DialogTitle>Section Members: {selectedSection?.sectionName}</DialogTitle>
            <DialogDescription>
              Manage students in this section. Section Code: <strong>{selectedSection?.sectionCode}</strong>
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-muted-foreground">
                {sectionMembers.length} member{sectionMembers.length !== 1 ? "s" : ""}
              </p>
              <Button onClick={() => setAddMemberDialogOpen(true)} size="sm">
                <Plus className="mr-2 h-4 w-4" /> Add Student
              </Button>
            </div>

            {loadingMembers ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : membersError ? (
              <Alert variant="destructive">
                <AlertDescription>{membersError}</AlertDescription>
              </Alert>
            ) : sectionMembers.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No members in this section yet.</p>
            ) : (
              <div className="space-y-2">
                {sectionMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-3 rounded-lg border"
                  >
                    <div>
                      <p className="font-medium">{member.fullName}</p>
                      <p className="text-sm text-muted-foreground">{member.email}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => handleRemoveMember(member.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Member Dialog */}
      <Dialog open={addMemberDialogOpen} onOpenChange={setAddMemberDialogOpen}>
        <DialogContent onClose={() => setAddMemberDialogOpen(false)}>
          <DialogHeader>
            <DialogTitle>Add Student to Section</DialogTitle>
            <DialogDescription>
              Add a new student to <strong>{selectedSection?.sectionName}</strong>.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddMember}>
            <div className="space-y-3 py-4">
              <Input
                placeholder="Full Name"
                value={memberFormData.fullName}
                onChange={(e) => setMemberFormData({ ...memberFormData, fullName: e.target.value })}
                required
              />
              <Input
                placeholder="Username"
                value={memberFormData.userName}
                onChange={(e) => setMemberFormData({ ...memberFormData, userName: e.target.value })}
                required
              />
              <Input
                type="email"
                placeholder="Email"
                value={memberFormData.email}
                onChange={(e) => setMemberFormData({ ...memberFormData, email: e.target.value })}
                required
              />
              <Input
                placeholder="Phone Number"
                value={memberFormData.phoneNumber}
                onChange={(e) => setMemberFormData({ ...memberFormData, phoneNumber: e.target.value })}
                required
              />
              <Input
                type="password"
                placeholder="Password"
                value={memberFormData.password}
                onChange={(e) => setMemberFormData({ ...memberFormData, password: e.target.value })}
                required
              />
              <Input
                type="password"
                placeholder="Confirm Password"
                value={memberFormData.confirmPassword}
                onChange={(e) => setMemberFormData({ ...memberFormData, confirmPassword: e.target.value })}
                required
              />
              {addMemberError && (
                <Alert variant="destructive">
                  <AlertDescription>{addMemberError}</AlertDescription>
                </Alert>
              )}
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setAddMemberDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={addingMember}>
                {addingMember && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Add Student
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
