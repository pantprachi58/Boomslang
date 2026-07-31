"use client";

import axios from "axios";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  AUTH_TOKEN_STORAGE_KEY,
  AUTH_USER_STORAGE_KEY,
  clearRoleCookie,
  getApiBaseUrl,
  setRoleCookie,
} from "@/lib/authStorage";

const AuthContext = createContext(null);
const api = axios.create({
  baseURL: `${getApiBaseUrl()}/api`,
});

function getStoredToken() {
  if (typeof window === "undefined") {
    return "";
  }

  return window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY) || "";
}

function getStoredUser() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const stored = window.localStorage.getItem(AUTH_USER_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function getErrorMessage(error, fallback) {
  return error?.response?.data?.message || error?.response?.data?.error || fallback;
}

function persistSession(token, user) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
  window.localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(user));
  setRoleCookie(user.role);
}

function clearSession() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
  window.localStorage.removeItem(AUTH_USER_STORAGE_KEY);
  clearRoleCookie();
}

function getAuthHeaders() {
  const token = getStoredToken();

  return token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    const token = getStoredToken();
    const storedUser = getStoredUser();

    if (!token) {
      clearSession();
      setUser(null);
      setIsLoading(false);
      return;
    }

    if (storedUser) {
      setUser(storedUser);
      setRoleCookie(storedUser.role);
    }

    try {
      const { data } = await api.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      persistSession(token, data.user);
      setUser(data.user);
    } catch {
      clearSession();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = useCallback(async (payload) => {
    try {
      const { data } = await api.post("/auth/login", payload);

      if (data.requiresEmailVerification) {
        return data;
      }

      persistSession(data.token, data.user);
      setUser(data.user);
      return data;
    } catch (error) {
      throw new Error(getErrorMessage(error, "Login failed"));
    }
  }, []);

  const signup = useCallback(async (payload) => {
    try {
      const { data } = await api.post("/auth/signup", payload);

      if (data.requiresEmailVerification) {
        return data;
      }

      persistSession(data.token, data.user);
      setUser(data.user);
      return data;
    } catch (error) {
      throw new Error(getErrorMessage(error, "Signup failed"));
    }
  }, []);

  const verifyEmailOtp = useCallback(async (payload) => {
    try {
      const { data } = await api.post("/auth/verify-email", payload);

      persistSession(data.token, data.user);
      setUser(data.user);
      return data;
    } catch (error) {
      throw new Error(getErrorMessage(error, "Email verification failed"));
    }
  }, []);

  const resendOtp = useCallback(async (payload) => {
    try {
      const { data } = await api.post("/auth/resend-otp", payload);
      return data;
    } catch (error) {
      throw new Error(getErrorMessage(error, "Unable to resend OTP"));
    }
  }, []);

  const forgotPassword = useCallback(async (payload) => {
    try {
      const { data } = await api.post("/auth/forgot-password", payload);
      return data;
    } catch (error) {
      throw new Error(getErrorMessage(error, "Unable to send reset link"));
    }
  }, []);

  const resetPassword = useCallback(async (payload) => {
    try {
      const { data } = await api.post("/auth/reset-password", payload);

      persistSession(data.token, data.user);
      setUser(data.user);
      return data;
    } catch (error) {
      throw new Error(getErrorMessage(error, "Unable to reset password"));
    }
  }, []);

  const changePassword = useCallback(async (payload) => {
    try {
      const { data } = await api.put("/auth/change-password", payload, {
        headers: getAuthHeaders(),
      });

      persistSession(getStoredToken(), data.user);
      setUser(data.user);
      return data;
    } catch (error) {
      throw new Error(getErrorMessage(error, "Unable to change password"));
    }
  }, []);

  const updateProfile = useCallback(async (payload) => {
    try {
      const { data } = await api.put("/auth/profile", payload, {
        headers: getAuthHeaders(),
      });

      persistSession(getStoredToken(), data.user);
      setUser(data.user);
      return data;
    } catch (error) {
      throw new Error(getErrorMessage(error, "Unable to update profile"));
    }
  }, []);

  const addAddress = useCallback(async (payload) => {
    try {
      const { data } = await api.post("/auth/addresses", payload, {
        headers: getAuthHeaders(),
      });

      persistSession(getStoredToken(), data.user);
      setUser(data.user);
      return data;
    } catch (error) {
      throw new Error(getErrorMessage(error, "Unable to add address"));
    }
  }, []);

  const updateAddress = useCallback(async (addressId, payload) => {
    try {
      const { data } = await api.put(`/auth/addresses/${addressId}`, payload, {
        headers: getAuthHeaders(),
      });

      persistSession(getStoredToken(), data.user);
      setUser(data.user);
      return data;
    } catch (error) {
      throw new Error(getErrorMessage(error, "Unable to update address"));
    }
  }, []);

  const deleteAddress = useCallback(async (addressId) => {
    try {
      const { data } = await api.delete(`/auth/addresses/${addressId}`, {
        headers: getAuthHeaders(),
      });

      persistSession(getStoredToken(), data.user);
      setUser(data.user);
      return data;
    } catch (error) {
      throw new Error(getErrorMessage(error, "Unable to delete address"));
    }
  }, []);

  const setDefaultAddress = useCallback(async (addressId) => {
    try {
      const { data } = await api.patch(
        `/auth/addresses/${addressId}/default`,
        {},
        {
          headers: getAuthHeaders(),
        }
      );

      persistSession(getStoredToken(), data.user);
      setUser(data.user);
      return data;
    } catch (error) {
      throw new Error(getErrorMessage(error, "Unable to update default address"));
    }
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: Boolean(user),
      isAdmin: user?.role === "admin",
      login,
      signup,
      verifyEmailOtp,
      resendOtp,
      forgotPassword,
      resetPassword,
      changePassword,
      updateProfile,
      addAddress,
      updateAddress,
      deleteAddress,
      setDefaultAddress,
      logout,
      refreshUser,
    }),
    [
      user,
      isLoading,
      login,
      signup,
      verifyEmailOtp,
      resendOtp,
      forgotPassword,
      resetPassword,
      changePassword,
      updateProfile,
      addAddress,
      updateAddress,
      deleteAddress,
      setDefaultAddress,
      logout,
      refreshUser,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}
