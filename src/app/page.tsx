"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { isAuthenticated, user, role } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect authenticated users to their respective dashboards
  useEffect(() => {
    if (isAuthenticated) {
      if (role === "PATIENT") {
        router.push("/patient/splash");
      } else if (role === "DOCTOR") {
        router.push("/doctor/splash");
      }
    }
  }, [isAuthenticated, role, router]);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    // Show loading state while redirecting
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="ml-4 text-gray-600">Redirecting to your dashboard...</p>
      </div>
    );
  }

  // Original landing page for unauthenticated users
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* REMOVED DUPLICATE NAVBAR - Using the one from layout.tsx instead */}
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Welcome to MediBook
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Your trusted platform for managing doctor appointments. Book consultations with the best healthcare professionals from the comfort of your home.
          </p>
          
          <div className="flex justify-center space-x-4">
            <Link
              href="/register?role=patient"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Get Started as Patient
            </Link>
            <Link
              href="/register?role=doctor"
              className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Join as Doctor
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Find Best Doctors</h3>
            <p className="text-gray-600">Connect with qualified healthcare professionals across various specialties.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Easy Booking</h3>
            <p className="text-gray-600">Schedule appointments with just a few clicks at your convenience.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Secure & Private</h3>
            <p className="text-gray-600">Your health information is protected with industry-standard security measures.</p>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover why doctors and patients trust MediBook for their healthcare needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Patient Testimonial 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold">SJ</span>
              </div>
              <div className="ml-4">
                <h4 className="text-gray-500 text-sm font-semibold">Sarah Johnson</h4>
                <p className="text-gray-500 text-sm">Patient</p>
              </div>
            </div>
            <div className="flex text-yellow-400 mb-3">
              ★★★★★
            </div>
            <p className="text-gray-600 italic">
              "MediBook made finding the right specialist so easy. Booked my appointment in minutes and the doctor was fantastic!"
            </p>
          </div>

          {/* Doctor Testimonial */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-semibold">MC</span>
              </div>
              <div className="ml-4">
                <h4 className="text-gray-500 text-sm font-semibold">Dr. Michael Chen</h4>
                <p className="text-gray-500 text-sm">Cardiologist</p>
              </div>
            </div>
            <div className="flex text-yellow-400 mb-3">
              ★★★★★
            </div>
            <p className="text-gray-600 italic">
              "This platform has streamlined my practice management. The appointment system is intuitive and my patients love it."
            </p>
          </div>

          {/* Patient Testimonial 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold">JR</span>
              </div>
              <div className="ml-4">
                <h4 className="text-gray-500 text-sm font-semibold">James Rodriguez</h4>
                <p className="text-gray-500 text-sm">Patient</p>
              </div>
            </div>
            <div className="flex text-yellow-400 mb-3">
              ★★★★★
            </div>
            <p className="text-gray-600 italic">
              "The reminder system is fantastic! Never missed an appointment since I started using MediBook."
            </p>
          </div>

          {/* Doctor Testimonial 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-semibold">EW</span>
              </div>
              <div className="ml-4">
                <h4 className="text-gray-500 text-sm font-semibold">Dr. Emily Watson</h4>
                <p className="text-gray-500 text-sm">Pediatrician</p>
              </div>
            </div>
            <div className="flex text-yellow-400 mb-3">
              ★★★★★
            </div>
            <p className="text-gray-600 italic">
              "Excellent platform for connecting with patients. The scheduling system saves me hours each week."
            </p>
          </div>

          {/* Patient Testimonial 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold">LP</span>
              </div>
              <div className="ml-4">
                <h4 className="text-gray-500 text-sm font-semibold">Lisa Parker</h4>
                <p className="text-gray-500 text-sm">Patient</p>
              </div>
            </div>
            <div className="flex text-yellow-400 mb-3">
              ★★★★★
            </div>
            <p className="text-gray-600 italic">
              "I love how I can see doctor availability in real-time. No more phone tag to schedule appointments!"
            </p>
          </div>

          {/* Doctor Testimonial 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-semibold">DR</span>
              </div>
              <div className="ml-4">
                <h4 className="text-gray-500 text-sm font-semibold">Dr. Robert Davis</h4>
                <p className="text-gray-500 text-sm">Neurologist</p>
              </div>
            </div>
            <div className="flex text-yellow-400 mb-3">
              ★★★★★
            </div>
            <p className="text-gray-600 italic">
              "The patient management tools are exceptional. It's made my practice so much more efficient."
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-16 text-center">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-blue-600">500+</div>
            <div className="text-gray-600 mt-2">Happy Patients</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-green-600">50+</div>
            <div className="text-gray-600 mt-2">Expert Doctors</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-purple-600">1k+</div>
            <div className="text-gray-600 mt-2">Appointments</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-orange-600">98%</div>
            <div className="text-gray-600 mt-2">Satisfaction Rate</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white mt-20 py-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">© 2024 MediBook. All rights reserved.</p>
          <p className="text-gray-500 text-sm mt-2">
            Need help? Contact us at{" "}
            <a href="mailto:support@medibook.com" className="text-blue-600 hover:underline">
              support@medibook.com
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}