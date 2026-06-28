import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5099/api", // change if your .NET runs on different port
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
