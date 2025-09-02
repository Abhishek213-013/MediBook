//src/services/doctors.ts
import api from "@/lib/axios";
import { Doctor } from "@/types";

export const getDoctors = async (page: number = 1, limit: number = 10, search?: string, specialization?: string) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });
  
  if (search) params.append('search', search);
  if (specialization) params.append('specialization', specialization);
  
  const res = await api.get(`/doctors?${params}`);
  return res.data;
};

export const getSpecializations = async () => {
  const res = await api.get("/specializations");
  return res.data;
};