"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function WorkingHoursPage() {
  const [workingHours, setWorkingHours] = useState({
    monday: { start: "09:00", end: "17:00", available: true },
    tuesday: { start: "09:00", end: "17:00", available: true },
    wednesday: { start: "09:00", end: "17:00", available: true },
    thursday: { start: "09:00", end: "17:00", available: true },
    friday: { start: "09:00", end: "17:00", available: true },
    saturday: { start: "09:00", end: "12:00", available: false },
    sunday: { start: "00:00", end: "00:00", available: false },
  });

  return (
    <ProtectedRoute requiredRole="DOCTOR">
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Manage Working Hours</h1>
            <p className="text-gray-600 mb-6">
              Set your availability for appointments. This feature is coming soon!
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800">
                Working hours management will be available in the next update.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}