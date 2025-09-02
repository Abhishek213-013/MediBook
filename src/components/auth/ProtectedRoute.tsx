// src/components/auth/ProtectedRoute.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { Role } from "@/types";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: Role;
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { isAuthenticated, role } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    // In your ProtectedRoute component
  if (requiredRole && role !== requiredRole) {
  // Redirect to appropriate splash screen based on actual role
    if (role === "PATIENT") {
      router.push("/patient/splash");
    } else if (role === "DOCTOR") {
      router.push("/doctor/splash");
    } else {
      router.push("/login");
    }
  }
  }, [isAuthenticated, role, requiredRole, router]);

  // Show loading spinner while checking authentication
  if (!isAuthenticated || (requiredRole && role !== requiredRole)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return <>{children}</>;
}