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

export default api;
