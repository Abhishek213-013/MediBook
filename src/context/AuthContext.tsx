//src/context/AuthContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
  role: "DOCTOR" | "PATIENT";
  photo_url?: string;
}

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
    // Check localStorage for persisted user
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = async (email: string, password: string, role: "DOCTOR" | "PATIENT") => {
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password, role });
      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      // Redirect based on role
      if (role === "PATIENT") router.push("/patient/dashboard");
      else router.push("/doctor/dashboard");
    } catch (err: any) {
      console.error("Login failed", err);
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

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
