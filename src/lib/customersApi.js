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

export async function fetchAdminCustomers(params = {}) {
  try {
    const { data } = await api.get("/customers/admin", {
      headers: getAuthHeaders(),
      params,
    });

    return {
      customers: data.data || [],
      pagination: data.pagination || { page: 1, limit: 20, total: 0, pages: 1 },
    };
  } catch (error) {
    throw new Error(getErrorMessage(error, "Unable to load customers"));
  }
}
