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

export async function createOrder(payload) {
  try {
    const { data } = await api.post("/orders", payload, {
      headers: getAuthHeaders(),
    });
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Unable to place order"));
  }
}

export async function fetchMyOrders() {
  try {
    const { data } = await api.get("/orders/my", {
      headers: getAuthHeaders(),
    });
    return data.data || [];
  } catch (error) {
    throw new Error(getErrorMessage(error, "Unable to load orders"));
  }
}

export async function fetchAdminOrders(status = "all") {
  try {
    const { data } = await api.get("/orders/admin", {
      params: { status },
      headers: getAuthHeaders(),
    });
    return data.data || [];
  } catch (error) {
    throw new Error(getErrorMessage(error, "Unable to load orders"));
  }
}

export async function updateAdminOrderStatus(orderId, status) {
  try {
    const { data } = await api.patch(
      `/orders/${orderId}/status`,
      { status },
      {
        headers: getAuthHeaders(),
      }
    );
    return data.data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Unable to update order status"));
  }
}
