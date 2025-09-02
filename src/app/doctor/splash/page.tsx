"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DoctorSplashScreen from "@/components/doctor/DoctorSplashScreen";
import { useAuthStore } from "@/store/auth";

export default function DoctorSplashPage() {
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

    // If user is not a doctor, redirect to appropriate dashboard
    if (user?.role !== "DOCTOR") {
      router.push(user?.role === "PATIENT" ? "/patient/splash" : "/login");
    }
  }, [isAuthenticated, user, router]);

  // Show loading state until component mounts and auth is verified
  if (!mounted || !isAuthenticated || user?.role !== "DOCTOR") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <ProtectedRoute requiredRole="DOCTOR">
      <DoctorSplashScreen userName={user.name} />
    </ProtectedRoute>
  );
}