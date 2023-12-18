import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const Service = axios.create({
  baseURL: "http://192.168.1.66:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

Service.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;  
  },
  (error) => {
    return Promise.reject(error);
  }
);
