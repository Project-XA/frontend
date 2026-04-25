export interface Section {
  sectionId: number;
  sectionName: string;
  sectionCode: number;
  organizationId: number;
  memberCount: number;
  createdAt: string;
}

export interface CreateSectionRequest {
  organizationId: number;
  sectionName: string;
}

export interface UpdateSectionRequest {
  sectionName: string;
}

export interface SectionMember {
  id: string;
  fullName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  role: 'Admin' | 'User';
  joinedAt: string;
}

export interface AddSectionMemberRequest {
  sectionId: number;
  email: string;
  fullName: string;
  phoneNumber: string;
  userName: string;
  password: string;
  confirmPassword: string;
}

export interface JoinSectionRequest {
  sectionCode: number;
}
