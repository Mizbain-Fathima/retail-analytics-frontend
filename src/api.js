// src/api.js
import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Global success & error interceptors
api.interceptors.response.use(
  (response) => {
    // Optional: show toast for success
    // toast.success("Request successful!");
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with a status code
      toast.error(
        `Error ${error.response.status}: ${error.response.data.message || "Something went wrong"}`
      );
    } else if (error.request) {
      // No response from server
      toast.error("No response from server. Please try again later.");
    } else {
      // Axios config error
      toast.error(`Request error: ${error.message}`);
    }
    return Promise.reject(error);
  }
);

export default api;
