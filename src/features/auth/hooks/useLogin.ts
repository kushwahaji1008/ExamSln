import { useState } from 'react';
import { useAuth } from '@/app/providers/AuthProvider';
import { loginUser } from '../services/authService';
import type { LoginPayload } from '../types/auth';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const handleLogin = async (data: LoginPayload) => {
    setLoading(true);
    setError(null);
    try {
      const res = await loginUser(data);
      login(res.user, res.token);
      return res.user;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, error };
};
