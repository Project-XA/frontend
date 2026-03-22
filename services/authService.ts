import axiosInstance from './axiosInstance';
import { ApiResponse, LoginRequest, RegisterRequest, VerifyOtpRequest } from '@/types/auth'; // Assuming path alias @ exists or relative path
import Cookies from 'js-cookie';
import { getAuthCookieOptions } from '@/lib/authCookie';

const AUTH_BASE_PATH = '/Account';

export const authService = {
  register: async (data: RegisterRequest): Promise<ApiResponse<string>> => {
    const response = await axiosInstance.post<ApiResponse<string>>(`${AUTH_BASE_PATH}/Register`, data);
    return response.data;
  },

  login: async (data: LoginRequest): Promise<ApiResponse<string>> => {
    const response = await axiosInstance.post<ApiResponse<string>>(`${AUTH_BASE_PATH}/Login`, data);
    if (response.data.success && response.data.data) {
      const token = String(response.data.data).trim();
      Cookies.set('token', token, getAuthCookieOptions());
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
