import apiClient from './client';

export type LoginPayload = { email: string; password: string };
export type RegisterPayload = { fullName: string; email: string; password: string; phone?: string; role: number };

export type AuthResponse = { token: string; user: { id: number | string; fullName?: string; email: string; role: number | string } };

export const login = async (payload: LoginPayload) => {
  const res = await apiClient.post<AuthResponse>('/auth/login', payload);
  return res.data;
};

export const register = async (payload: RegisterPayload) => {
  const res = await apiClient.post<AuthResponse>('/auth/register', payload);
  return { status: res.status, data: res.data };
};

export const me = async () => {
  const res = await apiClient.get('/auth/me');
  return res.data;
};
