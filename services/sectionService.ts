import axiosInstance from './axiosInstance';
import { ApiResponse } from '@/types/auth';
import { Section, CreateSectionRequest, UpdateSectionRequest, SectionMember, AddSectionMemberRequest, JoinSectionRequest } from '@/types/section';

const BASE_PATH = '/Section';

export const sectionService = {
  // Create a new section (lab) in a university organization
  createSection: async (data: CreateSectionRequest): Promise<ApiResponse<Section>> => {
    const response = await axiosInstance.post<ApiResponse<Section>>(
      `${BASE_PATH}/`,
      data
    );
    return response.data;
  },

  // Get all sections for a specific university organization
  getSectionsByOrganization: async (orgId: number): Promise<ApiResponse<Section[]>> => {
    const response = await axiosInstance.get<ApiResponse<Section[]>>(
      `${BASE_PATH}/organization/${orgId}`
    );
    return response.data;
  },

  // Get a specific section by its ID
  getSectionById: async (sectionId: number): Promise<ApiResponse<Section>> => {
    const response = await axiosInstance.get<ApiResponse<Section>>(
      `${BASE_PATH}/${sectionId}`
    );
    return response.data;
  },

  // Update a section's name
  updateSection: async (sectionId: number, data: UpdateSectionRequest): Promise<ApiResponse<Section>> => {
    const response = await axiosInstance.put<ApiResponse<Section>>(
      `${BASE_PATH}/${sectionId}`,
      data
    );
    return response.data;
  },

  // Delete a section by ID
  deleteSection: async (sectionId: number): Promise<ApiResponse<null>> => {
    const response = await axiosInstance.delete<ApiResponse<null>>(
      `${BASE_PATH}/${sectionId}`
    );
    return response.data;
  },

  // Get all members in a section
  getSectionMembers: async (sectionId: number): Promise<ApiResponse<SectionMember[]>> => {
    const response = await axiosInstance.get<ApiResponse<SectionMember[]>>(
      `${BASE_PATH}/${sectionId}/students`
    );
    return response.data;
  },

  // Add a student to a section (admin only)
  addSectionMember: async (data: AddSectionMemberRequest): Promise<ApiResponse<null>> => {
    const response = await axiosInstance.post<ApiResponse<null>>(
      `${BASE_PATH}/add-member`,
      data
    );
    return response.data;
  },

  // Join a section using section code (student self-join)
  joinSection: async (data: JoinSectionRequest): Promise<ApiResponse<null>> => {
    const response = await axiosInstance.post<ApiResponse<null>>(
      `${BASE_PATH}/join`,
      data
    );
    return response.data;
  },

  // Remove a member from a section
  removeSectionMember: async (sectionId: number, userId: string): Promise<ApiResponse<null>> => {
    const response = await axiosInstance.delete<ApiResponse<null>>(
      `${BASE_PATH}/${sectionId}/students/${userId}`
    );
    return response.data;
  },
};
