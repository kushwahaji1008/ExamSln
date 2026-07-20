import { useState } from 'react';

import { registerUser } from '../services/authService';
import type { RegisterPayload } from '../types/auth';

export function useRegister() {
  const [loading, setLoading] = useState(false);

  async function register(data: RegisterPayload) {
    setLoading(true);
    try {
      if (import.meta.env.VITE_API_DEBUG === 'true') {
        try { console.debug('[debug] register payload', data); } catch {}
      }
      console.log('[debug] register payload', data);
      const res = await registerUser(data);
      return { success: true, status: res.status, data: res.data };
    } catch (err: any) {
      const status = err?.response?.status;
      const message = err?.response?.data?.message || err?.message || 'Registration failed';
      return { success: false, status, error: message };
    } finally {
      setLoading(false);
    }
  }

  return { loading, register };
}
