"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/auth";

export default function LoggedInHome() {
  const { user, role, logout } = useAuthStore();

  if (role === "PATIENT") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex-shrink-0 font-bold text-2xl text-blue-600">
                MediBook
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Welcome back, {user?.name}</span>
                <button
                  onClick={logout}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Welcome back to MediBook!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Ready to continue your healthcare journey?
          </p>
          
          <div className="flex justify-center space-x-4">
            <Link
              href="/patient/splash"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Go to Patient Portal
            </Link>
            <Link
              href="/patient/appointments"
              className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              View My Appointments
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (role === "DOCTOR") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex-shrink-0 font-bold text-2xl text-green-600">
                MediBook
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Welcome, Dr. {user?.name}</span>
                <button
                  onClick={logout}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Welcome back, Doctor!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Ready to manage your appointments and help patients?
          </p>
          
          <div className="flex justify-center space-x-4">
            <Link
              href="/doctor/splash"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Go to Doctor Portal
            </Link>
            <Link
              href="/doctor/dashboard"
              className="border border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              View Appointments
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return null;
}