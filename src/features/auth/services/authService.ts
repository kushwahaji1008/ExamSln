import * as authApi from '@/services/api/auth';
import type { AuthResponse, LoginPayload, RegisterPayload } from '../types/auth';

export const loginUser = async (data: LoginPayload): Promise<AuthResponse> => {
  const res = await authApi.login(data);
  return res as AuthResponse;
};

// register may return 204 No Content (no token) or an AuthResponse with token/user
export const registerUser = async (data: RegisterPayload): Promise<{ status: number; data?: AuthResponse }> => {
  const res = await authApi.register(data);
  return res as { status: number; data?: AuthResponse };
};

export const getMe = async () => {
  const res = await authApi.me();
  return res;
};
