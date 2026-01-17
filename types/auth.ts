export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
  errors: string[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  userName: string;
  email: string;
  confirmEmail: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  role: 'Admin' | 'User';
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
  newPassword: string;
}

export interface User {
  // Define user properties if available in login response, otherwise use primitive or any
  // Based on login response "data" is just a token string, 
  // but typically we might decode it or fetch user details separately.
  // For now, these are just for request bodies.
}
