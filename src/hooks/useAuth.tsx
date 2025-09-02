//src/hooks/useAuth.tsx
"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { User } from "@/types/user";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: "DOCTOR" | "PATIENT") => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = async (email: string, password: string, role: "DOCTOR" | "PATIENT") => {
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password, role });
      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      router.push(role === "PATIENT" ? "/patient/dashboard" : "/doctor/dashboard");
    } catch (err: any) {
      alert(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/login");
  };

  return <AuthContext.Provider value={{ user, login, logout, loading }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
