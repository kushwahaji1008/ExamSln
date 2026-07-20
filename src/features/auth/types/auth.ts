export type User = {
  id: string;
  fullName: string;
  email: string;
  role: string | number;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = LoginPayload & {
  fullName: string;
  phone?: string;
  role: number; // 0=Student, 1=Teacher
};

export type AuthResponse = {
  user: User;
  token: string;
};

