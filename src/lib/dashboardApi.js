import axios from "axios";
import { AUTH_TOKEN_STORAGE_KEY, getApiBaseUrl } from "./authStorage";

const api = axios.create({
  baseURL: `${getApiBaseUrl()}/api`,
});

function getAuthHeaders() {
  if (typeof window === "undefined") return {};
  const token = window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function getErrorMessage(error, fallback) {
  return error?.response?.data?.message || error?.response?.data?.error || fallback;
}

export async function fetchAdminDashboard() {
  try {
    const { data } = await api.get("/dashboard/admin", {
      headers: getAuthHeaders(),
    });
    return data.data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Unable to load dashboard"));
  }
}
