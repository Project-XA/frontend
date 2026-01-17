export interface CreateOrganizationRequest {
  organizationName: string;
  organizationType: string;
  conatactEmail: string; // Typo from API docs preserved
}

export interface UpdateOrganizationRequest {
  organizationName: string;
  organizationType: string;
  conatactEmail: string;
}

export interface Organization {
  organizationId: number;
  organizationName: string;
  organizationType: string;
  conatactEmail: string;
  organizationCode: number;
  createdAt: string;
}

export interface AddMemberRequest {
  organizationId: number;
  email: string;
  fullName: string;
  userName: string;
  password: string;
  confirmPassword: string;
  role: 'Admin' | 'User';
}
