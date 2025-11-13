// src/api/server.ts
import axios from "axios";

const BASE_URL = "https://fakestoreapi.com";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiGet = async (endpoint: string, params?: any) => {
  try {
    const res = await api.get(endpoint, { params });
    return { success: true, data: res.data };
  } catch (error) {
    console.log("GET ERROR:", error);
    return { success: false, error };
  }
};

export const apiPost = async (endpoint: string, body?: any) => {
  try {
    const res = await api.post(endpoint, body);
    return { success: true, data: res.data };
  } catch (error) {
    console.log("POST ERROR:", error);
    return { success: false, error };
  }
};

export const apiPut = async (endpoint: string, body?: any) => {
  try {
    const res = await api.put(endpoint, body);
    return { success: true, data: res.data };
  } catch (error) {
    console.log("PUT ERROR:", error);
    return { success: false, error };
  }
};

export const apiDelete = async (endpoint: string) => {
  try {
    const res = await api.delete(endpoint);
    return { success: true, data: res.data };
  } catch (error) {
    console.log("DELETE ERROR:", error);
    return { success: false, error };
  }
};
