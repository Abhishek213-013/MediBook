// Remove /types/user.ts and /types/Appointment.ts
// Keep everything in /types/index.ts for consistency

export type Role = "DOCTOR" | "PATIENT";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  photo_url?: string;
}

export interface Doctor extends User {
  specialization: string;
}

export interface Patient extends User {
  // Patient specific fields
}

export interface Appointment {
  id: string;
  doctorId: string;
  patientId: string;
  date: string;
  status: "PENDING" | "CANCELLED" | "COMPLETED";
  doctor?: Doctor;
  patient?: Patient;
}