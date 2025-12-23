import axios from "axios";
import * as SecureStore from "expo-secure-store";

const EXPO_PUBLIC_API_URL = "TOSPECIFY_API_URL_HERE";

const api = axios.create({
  baseURL: EXPO_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use(async config => {
  const token = await SecureStore.getItemAsync("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
