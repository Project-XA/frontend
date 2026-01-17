import axiosInstance from './axiosInstance';
import { ApiResponse } from '@/types/auth';
import { CreateHallRequest, UpdateHallRequest, Hall } from '@/types/hall';

const BASE_PATH = '/Hall';

export const hallService = {
  createHall: async (data: CreateHallRequest): Promise<ApiResponse<Hall>> => {
    const response = await axiosInstance.post<ApiResponse<Hall>>(`${BASE_PATH}/create-hall`, data);
    return response.data;
  },

  getAllHalls: async (organizationId: number): Promise<ApiResponse<Hall[]>> => {
    const response = await axiosInstance.get<ApiResponse<Hall[]>>(
      `${BASE_PATH}/get-all-halls/${organizationId}`
    );
    return response.data;
  },

  getHallById: async (hallId: number): Promise<ApiResponse<Hall>> => {
    const response = await axiosInstance.get<ApiResponse<Hall>>(`${BASE_PATH}/${hallId}`);
    return response.data;
  },

  updateHall: async (hallId: number, data: UpdateHallRequest): Promise<ApiResponse<Hall>> => {
    const response = await axiosInstance.put<ApiResponse<Hall>>(`${BASE_PATH}/${hallId}`, data);
    return response.data;
  },

  deleteHall: async (hallId: number): Promise<ApiResponse<null>> => {
    const response = await axiosInstance.delete<ApiResponse<null>>(`${BASE_PATH}/${hallId}`);
    return response.data;
  }
};
