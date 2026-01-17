import axiosInstance from './axiosInstance';
import { ApiResponse } from '@/types/auth'; // Reusing generic ApiResponse
import { CreateOrganizationRequest, UpdateOrganizationRequest, Organization, AddMemberRequest } from '@/types/organization';

const BASE_PATH = '/Organization';

export const organizationService = {
  createOrganization: async (data: CreateOrganizationRequest): Promise<ApiResponse<Organization>> => {
    const response = await axiosInstance.post<ApiResponse<Organization>>(`${BASE_PATH}/create-organization`, data);
    return response.data;
  },

  getOrganizationStats: async (id: number): Promise<ApiResponse<Organization>> => {
      const response = await axiosInstance.get<ApiResponse<Organization>>(`${BASE_PATH}/${id}`);
      return response.data;
  },

  getUserOrganizations: async (): Promise<ApiResponse<Organization[]>> => {
    const response = await axiosInstance.get<ApiResponse<Organization[]>>(`${BASE_PATH}/user-orgs`);
    return response.data;
  },

  updateOrganization: async (id: number, data: UpdateOrganizationRequest): Promise<ApiResponse<Organization>> => {
    const response = await axiosInstance.put<ApiResponse<Organization>>(`${BASE_PATH}/${id}`, data);
    return response.data;
  },

  deleteOrganization: async (id: number): Promise<ApiResponse<null>> => {
    const response = await axiosInstance.delete<ApiResponse<null>>(`${BASE_PATH}/${id}`);
    return response.data;
  },

  addMember: async (data: AddMemberRequest): Promise<ApiResponse<null>> => {
    const response = await axiosInstance.post<ApiResponse<null>>(`${BASE_PATH}/add-member`, data);
    return response.data;
  }
};
