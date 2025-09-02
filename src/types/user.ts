//src/types/user.ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: "DOCTOR" | "PATIENT";
  photo_url?: string;
}
