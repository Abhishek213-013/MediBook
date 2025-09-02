//src/services/appointments.ts
import api from "@/lib/axios";

export const createAppointment = async (doctorId: string, date: string) => {
  const res = await api.post("/appointments", { doctorId, date });
  return res.data;
};

export const getPatientAppointments = async (status?: string, page: number = 1) => {
  const params = new URLSearchParams({ page: page.toString() });
  if (status) params.append('status', status);
  
  const res = await api.get(`/appointments/patient?${params}`);
  return res.data;
};

export const getDoctorAppointments = async (status?: string, date?: string, page: number = 1) => {
  const params = new URLSearchParams({ page: page.toString() });
  if (status) params.append('status', status);
  if (date) params.append('date', date);
  
  const res = await api.get(`/appointments/doctor?${params}`);
  return res.data;
};

export const updateAppointmentStatus = async (appointmentId: string, status: string) => {
  const res = await api.patch("/appointments/update-status", { 
    appointment_id: appointmentId, 
    status 
  });
  return res.data;
};