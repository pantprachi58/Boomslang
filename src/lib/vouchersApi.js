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

export async function validateVoucher(code) {
  try {
    const { data } = await api.post(
      "/vouchers/validate",
      { code },
      { headers: getAuthHeaders() }
    );
    return data.data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Unable to apply voucher"));
  }
}

export async function fetchAdminVouchers() {
  try {
    const { data } = await api.get("/vouchers", {
      headers: getAuthHeaders(),
    });
    return data.data || [];
  } catch (error) {
    throw new Error(getErrorMessage(error, "Unable to load vouchers"));
  }
}

export async function createAdminVoucher(payload) {
  try {
    const { data } = await api.post("/vouchers", payload, {
      headers: getAuthHeaders(),
    });
    return data.data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Unable to create voucher"));
  }
}

export async function updateAdminVoucher(voucherId, payload) {
  try {
    const { data } = await api.put(`/vouchers/${voucherId}`, payload, {
      headers: getAuthHeaders(),
    });
    return data.data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Unable to update voucher"));
  }
}

export async function deleteAdminVoucher(voucherId) {
  try {
    const { data } = await api.delete(`/vouchers/${voucherId}`, {
      headers: getAuthHeaders(),
    });
    return data.data || null;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Unable to delete voucher"));
  }
}

export async function fetchVoucherUsages(voucherId) {
  try {
    const { data } = await api.get(`/vouchers/${voucherId}/usages`, {
      headers: getAuthHeaders(),
    });
    return data.data || { voucher: null, usages: [] };
  } catch (error) {
    throw new Error(getErrorMessage(error, "Unable to load voucher usage"));
  }
}
