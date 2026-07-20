import { createContext, useContext, useEffect, useState } from "react";
import apiClient from '@/services/api/client';
import * as authApi from '@/services/api/auth';

type User = {
  id: string;
  email: string;
  fullName: string;
  role: string | number;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  refreshUser: () => Promise<User | null>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // 🔥 Load from localStorage on refresh
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      // set default auth header for api client
      apiClient.defaults.headers.common.Authorization = `Bearer ${savedToken}`;
      // try to refresh user from backend
      (async () => {
        try {
          const me = await authApi.me();
          if (me) {
            setUser(me as any);
            localStorage.setItem('user', JSON.stringify(me));
          }
        } catch (e) {
          // if me fails, clear stored auth
          setUser(null);
          setToken(null);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          delete apiClient.defaults.headers.common.Authorization;
        }
      })();
    }
  }, []);

  const login = (user: User, token: string) => {
    setUser(user);
    setToken(token);

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const refreshUser = async () => {
    if (!token) return null;
    try {
      const me = await authApi.me();
      setUser(me as any);
      localStorage.setItem('user', JSON.stringify(me));
      return me as any;
    } catch (e) {
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
