// services/api.js
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "http://localhost:3000", // Replace with your server's IP if testing on a device
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token to requests if available
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("userToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("Token en la solicitud:", config.headers.Authorization); // Verifica el token
  }
  return config;
});

export default api;
