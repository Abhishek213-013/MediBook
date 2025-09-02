// src/app/patient/dashboard/page.tsx

"use client";

import { useState, useEffect } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DoctorCard from "@/components/cards/DoctorCard";
import SearchFilters from "@/components/patient/SearchFilters";
import BookingModal from "@/components/patient/BookingModal";
import { getDoctors, getSpecializations } from "@/services/doctors";
import { Doctor } from "@/types";
import { useDebounce } from "@/hooks/useDebounce"; // Add this import

export default function PatientDashboard() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [specializations, setSpecializations] = useState<string[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState<{ search: string; specialization: string }>({
    search: "",
    specialization: "",
  });

  const [pagination, setPagination] = useState({
    total: 0,
    pages: 0,
    current: 1,
    limit: 9,
  });

  // Add debounced search term
  const debouncedSearchTerm = useDebounce(filters.search, 300);

  // Fetch doctors whenever debounced search, specialization, or page changes
  useEffect(() => {
    fetchDoctors();
  }, [debouncedSearchTerm, filters.specialization, pagination.current]);

  // Fetch specializations once
  useEffect(() => {
    fetchSpecializations();
  }, []);

  // Fetch doctors safely
  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await getDoctors(
        pagination.current,
        pagination.limit,
        filters.search, // Use the current search term (debounced will trigger the effect)
        filters.specialization
      );

      // Ensure we always have an array
      setDoctors(Array.isArray(response.doctors) ? response.doctors : []);
      setPagination((prev) => ({
        ...prev,
        total: response.total || 0,
        pages: response.pages || 0,
      }));
    } catch (err: any) {
      setError(err.message || "Failed to fetch doctors");
      setDoctors([]); // fallback
    } finally {
      setLoading(false);
    }
  };

  // Fetch specializations safely
  const fetchSpecializations = async () => {
    try {
      const specs = await getSpecializations();
      setSpecializations(Array.isArray(specs) ? specs : []);
    } catch (err) {
      console.error("Failed to fetch specializations");
      setSpecializations([]); // fallback
    }
  };

  const handleFilterChange = (newFilters: { search?: string; specialization?: string }) => {
    setFilters(prev => ({ 
      ...prev, 
      ...newFilters 
    }));
    setPagination(prev => ({ ...prev, current: 1 })); // reset to first page
  };

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, current: page }));
    window.scrollTo(0, 0);
  };

  const handleBookAppointment = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsBookingModalOpen(true);
  };

  if (loading && doctors.length === 0) {
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
            <h1 className="text-3xl font-bold text-gray-900">Find Doctors</h1>
            <p className="text-gray-600 mt-2">
              Search and book appointments with the best doctors in your area
            </p>
          </div>

          <SearchFilters
            specializations={specializations || []}
            filters={filters}
            onFilterChange={handleFilterChange}
          />

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {doctors.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No doctors found</p>
              <p className="text-gray-400 mt-2">
                {filters.search || filters.specialization 
                  ? "Try adjusting your search criteria" 
                  : "No doctors available at the moment"}
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {doctors.map((doctor) => (
                  <DoctorCard
                    key={doctor.id}
                    doctor={doctor}
                    onBookAppointment={handleBookAppointment}
                  />
                ))}
              </div>

              {pagination.pages > 1 && (
                <div className="flex justify-center mt-8">
                  <nav className="flex space-x-2">
                    {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1 rounded-md ${
                          pagination.current === page
                            ? "bg-blue-600 text-white"
                            : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </nav>
                </div>
              )}
            </>
          )}

          {selectedDoctor && (
            <BookingModal
              doctor={selectedDoctor}
              isOpen={isBookingModalOpen}
              onClose={() => {
                setIsBookingModalOpen(false);
                setSelectedDoctor(null);
              }}
              onSuccess={() => {
                setIsBookingModalOpen(false);
                setSelectedDoctor(null);
                fetchDoctors();
              }}
            />
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}