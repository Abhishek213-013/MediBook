// src/services/auth.ts
import { Role, User } from "@/types";

interface AuthResponse {
  user: User;
  token: string;
}

// Helpers
const generateId = () => Date.now().toString();

const loadUsers = (): { [email: string]: User & { password: string; role: Role; specialization?: string } } => {
  if (typeof window === "undefined") return {};
  return JSON.parse(localStorage.getItem("mockUsers") || "{}");
};

const saveUsers = (users: any) => {
  localStorage.setItem("mockUsers", JSON.stringify(users));
};

// Register Patient
export const registerPatient = async (data: {
  name: string;
  email: string;
  password: string;
  photo_url?: string;
}): Promise<AuthResponse> => {
  const users = loadUsers();

  const newUser = {
    id: generateId(),
    name: data.name,
    email: data.email,
    photo_url: data.photo_url,
    password: data.password,
    role: "PATIENT" as Role,
  };

  users[data.email] = newUser;
  saveUsers(users);

  const { password, ...userWithoutPassword } = newUser;
  return { user: userWithoutPassword, token: "fake-jwt-token" };
};

// Register Doctor
export const registerDoctor = async (data: {
  name: string;
  email: string;
  password: string;
  specialization: string;
  photo_url?: string;
}): Promise<AuthResponse> => {
  const users = loadUsers();

  const newUser = {
    id: generateId(),
    name: data.name,
    email: data.email,
    photo_url: data.photo_url,
    password: data.password,
    role: "DOCTOR" as Role,
    specialization: data.specialization,
  };

  users[data.email] = newUser;
  saveUsers(users);

  const { password, ...userWithoutPassword } = newUser;
  return { user: userWithoutPassword, token: "fake-jwt-token" };
};

// Login
export const login = async (
  email: string,
  password: string,
  role: Role
): Promise<AuthResponse> => {
  const users = loadUsers();
  const user = users[email];

  if (!user) throw new Error("User not found");
  if (user.password !== password) throw new Error("Invalid password");
  if (user.role !== role) throw new Error("Role mismatch");

  const { password: _, ...userWithoutPassword } = user;
  return { user: userWithoutPassword, token: "fake-jwt-token" };
};
