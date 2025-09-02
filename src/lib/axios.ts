//src/lib/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://appointment-manager-node.onrender.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
