"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface DoctorSplashScreenProps {
  userName: string;
}

export default function DoctorSplashScreen({ userName }: DoctorSplashScreenProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 flex items-center justify-center p-4">
      <div className={`bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center transition-all duration-500 ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        
        {/* Welcome Header */}
        <div className="mb-8 fade-in">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 bounce-in">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 fade-in" style={{animationDelay: '0.1s'}}>
            Welcome, Doctor!
          </h1>
          <p className="text-gray-600 fade-in" style={{animationDelay: '0.2s'}}>
            Hello, Dr. {userName}
          </p>
          <p className="text-gray-500 text-sm mt-1 fade-in" style={{animationDelay: '0.3s'}}>
            Ready to manage your appointments?
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={() => router.push("/doctor/dashboard")}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2 btn-primary fade-in"
            style={{animationDelay: '0.4s'}}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span>Go to Dashboard</span>
          </button>

          <button
            onClick={() => router.push("/doctor/working-hours")}
            className="w-full border border-gray-300 hover:border-green-300 hover:bg-green-50 text-gray-700 py-3 px-6 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2 btn-secondary fade-in"
            style={{animationDelay: '0.5s'}}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Manage Working Hours</span>
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-100 fade-in" style={{animationDelay: '0.6s'}}>
          <p className="text-sm text-gray-500">
            Need assistance? Contact admin at{" "}
            <a href="mailto:admin@medibook.com" className="text-green-600 hover:underline transition-colors duration-200">
              admin@medibook.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}