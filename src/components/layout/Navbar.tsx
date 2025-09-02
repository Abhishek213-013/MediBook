//src/components/layout/Navbar.tsx
"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/auth";

export default function Navbar() {
  const { isAuthenticated, user, role, logout } = useAuthStore();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 font-bold text-xl text-blue-600">
              MediBook
            </Link>
            {isAuthenticated && (
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                {role === "PATIENT" ? (
                  <>
                    <Link 
                      href="/patient/splash" 
                      className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Home
                    </Link>
                    <Link 
                      href="/patient/dashboard" 
                      className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Dashboard
                    </Link>
                    <Link 
                      href="/patient/appointments" 
                      className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      My Appointments
                    </Link>
                  </>
                ) : (
                  <>
                    <Link 
                      href="/doctor/splash" 
                      className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Home
                    </Link>
                    <Link 
                      href="/doctor/dashboard" 
                      className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Dashboard
                    </Link>
                    <Link 
                      href="/doctor/working-hours" 
                      className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Working Hours
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
          
          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 text-sm">Hello, {user?.name}</span>
                <button
                  onClick={logout}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link href="/login" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  Login
                </Link>
                <Link href="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}