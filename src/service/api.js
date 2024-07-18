import axios from "axios";
import { getToken } from "./auth";

export const apiURL = "https://gestao.onrender.com";
export const clienteId = "my-angular-app";
export const clientSecret = "@54321";

const API = axios.create({
  baseURL: apiURL,
});

API.interceptors.request.use(async (config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { API };
