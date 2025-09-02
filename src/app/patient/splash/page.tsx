"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import PatientSplashScreen from "@/components/patient/PatientSplashScreen";
import { useAuthStore } from "@/store/auth";

export default function PatientSplashPage() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    setMounted(true);
    
    // If user is not authenticated, redirect to login
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    // If user is not a patient, redirect to appropriate dashboard
    if (user?.role !== "PATIENT") {
      router.push(user?.role === "DOCTOR" ? "/doctor/dashboard" : "/login");
    }
  }, [isAuthenticated, user, router]);

  // Show loading state until component mounts and auth is verified
  if (!mounted || !isAuthenticated || user?.role !== "PATIENT") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <ProtectedRoute requiredRole="PATIENT">
      <PatientSplashScreen userName={user.name} />
    </ProtectedRoute>
  );
}