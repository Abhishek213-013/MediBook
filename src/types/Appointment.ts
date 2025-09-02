
export interface Appointment {
  id: string;
  date: string;
  status: "PENDING" | "CANCELLED" | "COMPLETED";
  doctor?: {
    name: string;
    specialization: string;
    photo_url?: string;
  };
  patient?: {
    name: string;
    email: string;
    photo_url?: string;
  };
}
