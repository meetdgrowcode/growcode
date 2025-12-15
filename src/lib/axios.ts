import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const ADMIN_AUTH_URL = import.meta.env.VITE_ADMIN_AUTH_ENDPOINT;

export const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

// attach token for admin-protected APIs
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
