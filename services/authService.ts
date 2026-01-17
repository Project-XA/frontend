import axiosInstance from './axiosInstance';
import { ApiResponse, LoginRequest, RegisterRequest, VerifyOtpRequest } from '@/types/auth'; // Assuming path alias @ exists or relative path
import Cookies from 'js-cookie';

const AUTH_BASE_PATH = '/Account';

export const authService = {
  register: async (data: RegisterRequest): Promise<ApiResponse<string>> => {
    const response = await axiosInstance.post<ApiResponse<string>>(`${AUTH_BASE_PATH}/Register`, data);
    return response.data;
  },

  login: async (data: LoginRequest): Promise<ApiResponse<string>> => {
    const response = await axiosInstance.post<ApiResponse<string>>(`${AUTH_BASE_PATH}/Login`, data);
    if (response.data.success && response.data.data) {
      // Store token in cookies
      Cookies.set('token', response.data.data, { secure: true, sameSite: 'strict', expires: 7 }); // Expires in 7 days
    }
    return response.data;
  },

  forgotPassword: async (email: string): Promise<ApiResponse<null>> => {
    const response = await axiosInstance.post<ApiResponse<null>>(`${AUTH_BASE_PATH}/Forgot-Password`, { email });
    return response.data;
  },

  verifyOtp: async (data: VerifyOtpRequest): Promise<ApiResponse<null>> => {
    const response = await axiosInstance.post<ApiResponse<null>>(`${AUTH_BASE_PATH}/verify-rest-password-otp`, data);
    return response.data;
  },

  logout: () => {
    Cookies.remove('token');
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  },
};
