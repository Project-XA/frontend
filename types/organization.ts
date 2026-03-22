export interface CreateOrganizationRequest {
  organizationName: string;
  organizationType: string;
  conatactEmail: string; // Typo from API docs preserved
  isUniversity?: boolean;
}

export interface UpdateOrganizationRequest {
  organizationName: string;
  organizationType: string;
  conatactEmail: string;
  isUniversity: boolean;
}

export interface Organization {
  organizationId: number;
  organizationName: string;
  organizationType: string;
  conatactEmail: string;
  organizationCode: number;
  createdAt: string;
  /** Present on API responses; treat missing as false. */
  isUniversity?: boolean;
}

export interface AddMemberRequest {
  organizationId: number;
  email: string;
  fullName: string;
  phoneNumber: string;
  userName: string;
  password: string;
  confirmPassword: string;
  role: 'Admin' | 'User';
}

export interface User {
  id: string;
  fullName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  role: 'Admin' | 'User';
  createdAt: string;
  updatedAt: string;
}

export interface OrganizationEvent {
  id: number;
  organizationId: number;
  userId: string;
  eventType: string;
  description: string;
  createdAt: string;
  organizationName?: string; // Optional because it might not be populated in all contexts
}
