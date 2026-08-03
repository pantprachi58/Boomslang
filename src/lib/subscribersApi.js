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

export async function subscribeEmail(email, source = "website") {
  try {
    const { data } = await api.post("/subscribers", { email, source });
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Unable to subscribe"));
  }
}

export async function fetchAdminSubscribers() {
  try {
    const { data } = await api.get("/subscribers", {
      headers: getAuthHeaders(),
    });
    return data.data || [];
  } catch (error) {
    throw new Error(getErrorMessage(error, "Unable to load subscribers"));
  }
}

export async function deleteAdminSubscriber(id) {
  try {
    const { data } = await api.delete(`/subscribers/${id}`, {
      headers: getAuthHeaders(),
    });
    return data.data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Unable to delete subscriber"));
  }
}
