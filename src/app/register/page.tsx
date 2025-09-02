// src/app/register/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { registerPatient, registerDoctor } from "@/services/auth";
import { useAuthStore } from "@/store/auth";
import { Role } from "@/types";

const patientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  photo_url: z.string().optional(),
});

const doctorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  specialization: z.string().min(1, "Specialization is required"),
  photo_url: z.string().optional(),
});

type PatientForm = z.infer<typeof patientSchema>;
type DoctorForm = z.infer<typeof doctorSchema>;

export default function RegisterPage() {
  const [role, setRole] = useState<Role>("PATIENT");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login: setAuth } = useAuthStore();

  const patientForm = useForm<PatientForm>({
    resolver: zodResolver(patientSchema),
  });

  const doctorForm = useForm<DoctorForm>({
    resolver: zodResolver(doctorSchema),
  });

  const onPatientSubmit = async (data: PatientForm) => {
    setIsLoading(true);
    setError("");
    
    try {
      const response = await registerPatient(data);
      setAuth(response.user, response.token, "PATIENT");
      router.push("/patient/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const onDoctorSubmit = async (data: DoctorForm) => {
    setIsLoading(true);
    setError("");
    
    try {
      const response = await registerDoctor(data);
      setAuth(response.user, response.token, "DOCTOR");
      router.push("/doctor/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Select your role to continue
          </p>
        </div>
        
        {/* Role Selection */}
        <div className="flex justify-center space-x-4">
          <button
            type="button"
            onClick={() => setRole("PATIENT")}
            className={`px-4 py-2 rounded-md ${
              role === "PATIENT"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Patient
          </button>
          <button
            type="button"
            onClick={() => setRole("DOCTOR")}
            className={`px-4 py-2 rounded-md ${
              role === "DOCTOR"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Doctor
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {role === "PATIENT" ? (
          <form className="mt-8 space-y-6" onSubmit={patientForm.handleSubmit(onPatientSubmit)}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <input
                  {...patientForm.register("name")}
                  type="text"
                  required
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Full Name"
                />
                {patientForm.formState.errors.name && (
                  <p className="mt-1 text-sm text-red-600">{patientForm.formState.errors.name.message}</p>
                )}
              </div>
              <div>
                <input
                  {...patientForm.register("email")}
                  type="email"
                  required
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
                {patientForm.formState.errors.email && (
                  <p className="mt-1 text-sm text-red-600">{patientForm.formState.errors.email.message}</p>
                )}
              </div>
              <div>
                <input
                  {...patientForm.register("password")}
                  type="password"
                  required
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
                {patientForm.formState.errors.password && (
                  <p className="mt-1 text-sm text-red-600">{patientForm.formState.errors.password.message}</p>
                )}
              </div>
              <div>
                <input
                  {...patientForm.register("photo_url")}
                  type="url"
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Photo URL (optional)"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isLoading ? "Creating account..." : "Register as Patient"}
              </button>
            </div>
          </form>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={doctorForm.handleSubmit(onDoctorSubmit)}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <input
                  {...doctorForm.register("name")}
                  type="text"
                  required
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Full Name"
                />
                {doctorForm.formState.errors.name && (
                  <p className="mt-1 text-sm text-red-600">{doctorForm.formState.errors.name.message}</p>
                )}
              </div>
              <div>
                <input
                  {...doctorForm.register("email")}
                  type="email"
                  required
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
                {doctorForm.formState.errors.email && (
                  <p className="mt-1 text-sm text-red-600">{doctorForm.formState.errors.email.message}</p>
                )}
              </div>
              <div>
                <input
                  {...doctorForm.register("password")}
                  type="password"
                  required
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
                {doctorForm.formState.errors.password && (
                  <p className="mt-1 text-sm text-red-600">{doctorForm.formState.errors.password.message}</p>
                )}
              </div>
              <div>
                <input
                  {...doctorForm.register("specialization")}
                  type="text"
                  required
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Specialization"
                />
                {doctorForm.formState.errors.specialization && (
                  <p className="mt-1 text-sm text-red-600">{doctorForm.formState.errors.specialization.message}</p>
                )}
              </div>
              <div>
                <input
                  {...doctorForm.register("photo_url")}
                  type="url"
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Photo URL (optional)"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isLoading ? "Creating account..." : "Register as Doctor"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}