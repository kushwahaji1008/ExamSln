/**
 * User roles mapping to backend schema definitions.
 */
export enum UserRole {
  Student = 0,
  Teacher = 1,
  Admin = 2,
  SuperAdmin = 3,
}

/**
 * Core User entity representation.
 */
export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  phone?: string | null;
  isActive?: boolean;
  profilePicture?: string | null;
  permissions?: string[] | null;
  createdAt?: string;
  lastLoginAt?: string | null;
}

/**
 * Credentials required for login operations.
 */
export interface LoginPayload {
  email: string;
  password: string;
}

/**
 * Data payload required for registering a new user account.
 */
export interface RegisterPayload extends LoginPayload {
  fullName: string;
  phone?: string;
  role: UserRole;
}

/**
 * Standard backend authentication response payload.
 */


export interface AuthResponse {
  message?: string;
  token: string;
  refreshToken: string; // <-- ADD THIS LINE
  user: User;
}