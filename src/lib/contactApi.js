import axios from "axios";
import { AUTH_TOKEN_STORAGE_KEY, getApiBaseUrl } from "./authStorage";

const api = axios.create({
  baseURL: `${getApiBaseUrl()}/api`,
});

function getErrorMessage(error, fallback) {
  return error?.response?.data?.message || error?.response?.data?.error || fallback;
}

function getAuthHeaders() {
  if (typeof window === "undefined") return {};
  const token = window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function submitContactQuery(payload) {
  try {
    const { data } = await api.post("/contact-queries", {
      ...payload,
      source: payload.source || "contact-page",
    });
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Unable to send message"));
  }
}

export async function fetchAdminContactQueries(params = {}) {
  try {
    const { data } = await api.get("/contact-queries", {
      headers: getAuthHeaders(),
      params,
    });
    return {
      queries: data.data || [],
      pagination: data.pagination || { page: 1, limit: 20, total: 0, pages: 1 },
    };
  } catch (error) {
    throw new Error(getErrorMessage(error, "Unable to load contact queries"));
  }
}

export async function deleteAdminContactQuery(id) {
  try {
    const { data } = await api.delete(`/contact-queries/${id}`, {
      headers: getAuthHeaders(),
    });
    return data.data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Unable to delete contact query"));
  }
}
