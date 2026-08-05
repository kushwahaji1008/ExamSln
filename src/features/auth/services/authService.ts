import * as authApi from '@/services/api/auth';
import apiClient from '@/services/api/client'; // Import your global client for the new endpoints
import type { 
  AuthResponse, 
  LoginPayload, 
  RegisterPayload, 
  User 
} from '../types/auth';

export interface RegisterResponse {
  status: number;
  data?: AuthResponse;
}

/**
 * Authenticates a user with email and password credentials.
 */
export const loginUser = async (data: LoginPayload): Promise<AuthResponse> => {
  const response = await authApi.login(data);
  return response.data;
};

/**
 * Registers a new user account.
 */
export const registerUser = async (data: RegisterPayload): Promise<RegisterResponse> => {
  const response = await authApi.register(data);

  return {
    status: response.status,
    data: response.data ? response.data : undefined,
  };
};

/**
 * Retrieves the currently authenticated user's profile details.
 */
export const getMe = async (): Promise<User> => {
  const response = await authApi.me();
  return response.data;
};

// ==========================================
// NEW FEATURES: OTP & PASSWORD MANAGEMENT
// ==========================================

export const verifyOtp = async (data: { email: string; otp: string }): Promise<AuthResponse> => {
  const response = await apiClient.post('/api/auth/verify-email', data);
  return response.data;
};

export const resendOtp = async (email: string) => {
  const response = await apiClient.post('/api/auth/resend-otp', { email });
  return response.data;
};

export const forgotPassword = async (email: string) => {
  const response = await apiClient.post('/api/auth/forgot-password', { email });
  return response.data;
};

export const resetPassword = async (data: any) => {
  const response = await apiClient.post('/api/auth/reset-password', data);
  return response.data;
};

export const changePassword = async (data: any) => {
  const response = await apiClient.post('/api/auth/change-password', data);
  return response.data;
};

// ==========================================
// NEW FEATURE: PROFILE MANAGEMENT
// ==========================================

export const updateProfile = async (userId: string, data: any) => {
  const response = await apiClient.put(`/api/auth/users/${userId}`, data);
  return response.data;
};