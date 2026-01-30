import axios from "axios";

const api = axios.create({
  baseURL: "https://authapp-qvua.onrender.com",
  withCredentials: true, // REQUIRED for sessions
});

export default api;
