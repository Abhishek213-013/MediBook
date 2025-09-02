// src/app/patient/appointment/page.tsx

"use client";

import { useState, useEffect } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AppointmentCard from "@/components/cards/AppointmentCard";
import { getPatientAppointments } from "@/services/appointments";
import { Appointment } from "@/types";

export default function PatientAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    page: 1,
  });

  useEffect(() => {
    fetchAppointments();
  }, [filters]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await getPatientAppointments(filters.status, filters.page);
      setAppointments(response.appointments);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusFilter = (status: string) => {
    setFilters({ ...filters, status, page: 1 });
  };

  if (loading && appointments.length === 0) {
    return (
      <ProtectedRoute requiredRole="PATIENT">
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute requiredRole="PATIENT">
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Appointments</h1>
            <p className="text-gray-600 mt-2">
              Manage your scheduled appointments
            </p>
          </div>

          {/* Status Filter */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleStatusFilter("")}
                className={`px-4 py-2 rounded-md ${
                  filters.status === ""
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                All
              </button>
              <button
                onClick={() => handleStatusFilter("PENDING")}
                className={`px-4 py-2 rounded-md ${
                  filters.status === "PENDING"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => handleStatusFilter("COMPLETED")}
                className={`px-4 py-2 rounded-md ${
                  filters.status === "COMPLETED"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Completed
              </button>
              <button
                onClick={() => handleStatusFilter("CANCELLED")}
                className={`px-4 py-2 rounded-md ${
                  filters.status === "CANCELLED"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Cancelled
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {appointments.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No appointments found</p>
              <p className="text-gray-400 mt-2">
                {filters.status ? `Try changing the status filter` : "Book your first appointment to get started"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {appointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  onUpdate={fetchAppointments}
                  view="patient"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}