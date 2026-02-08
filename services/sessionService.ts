import axiosInstance from './axiosInstance';
import { ApiResponse } from '@/types/auth';
import { CreateSessionRequest, UpdateSessionRequest, Session, AttendanceRecord } from '@/types/session';

const BASE_PATH = '/Session';

export const sessionService = {
  createSession: async (data: CreateSessionRequest): Promise<ApiResponse<null>> => {
    const response = await axiosInstance.post<ApiResponse<null>>(`${BASE_PATH}/Create-Session`, data);
    return response.data;
  },

  getAllSessions: async (): Promise<ApiResponse<Session[]>> => {
    const response = await axiosInstance.get<ApiResponse<Session[]>>(`${BASE_PATH}/get-all-sessions`);
    return response.data;
  },

  getSessionById: async (id: number): Promise<ApiResponse<Session>> => {
    const response = await axiosInstance.get<ApiResponse<Session>>(`${BASE_PATH}/${id}`);
    return response.data;
  },

  getSessionsByHallId: async (hallId: number): Promise<ApiResponse<Session[]>> => {
    const response = await axiosInstance.get<ApiResponse<Session[]>>(`${BASE_PATH}/hall/${hallId}`);
    return response.data;
  },

  updateSession: async (id: number, data: UpdateSessionRequest): Promise<ApiResponse<Session>> => {
    const response = await axiosInstance.put<ApiResponse<Session>>(`${BASE_PATH}/${id}`, data);
    return response.data;
  },

  deleteSession: async (id: number): Promise<ApiResponse<null>> => {
    const response = await axiosInstance.delete<ApiResponse<null>>(`${BASE_PATH}/${id}`);
    return response.data;
  },

  getSessionAttendance: async (sessionId: number): Promise<ApiResponse<AttendanceRecord[]>> => {
    const response = await axiosInstance.get<ApiResponse<AttendanceRecord[]>>(`${BASE_PATH}/${sessionId}/attendance`);
    return response.data;
  },

  getSessionAttendanceInternal: async (sessionId: number): Promise<ApiResponse<AttendanceRecord[]>> => {
    const response = await axiosInstance.get<ApiResponse<AttendanceRecord[]>>(`${BASE_PATH}/${sessionId}/attendance/internal`);
    return response.data;
  },

  exportSessionAttendanceCsvInternal: async (sessionId: number): Promise<Blob> => {
    const response = await axiosInstance.get(`${BASE_PATH}/${sessionId}/csv/internal`, {
      responseType: 'blob'
    });
    return response.data;
  }
};
