import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASEURL,
});

api.interceptors.request.use((config) => {
  const accessToken = sessionStorage.getItem("admin-access-token");
  if (accessToken) {
    config.headers["admin-access-token"] = accessToken;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);

    if (error.response.status === 401) {
      alert("Session Expired. Please log in again.");
      window.location.href = "/admin";
    } else if (error.response?.status === 500) {
      alert("A server error occurred. Please try again later.");
    }
  }
);

export const sanitizeError = (error) => {
  if (error.message) {
    return {
      message: error.response.data.message || "An error occured",
      status: error.response.status,
    };
  }
  return { message: error.message };
};
export default api;
