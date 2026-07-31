export const AUTH_TOKEN_STORAGE_KEY = "boomslang_auth_token";
export const AUTH_USER_STORAGE_KEY = "boomslang_auth_user";
export const AUTH_ROLE_COOKIE = "boomslang_auth_role";

const cookieMaxAge = 60 * 60 * 24 * 7;

export function getApiBaseUrl() {
  return (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001").replace(/\/$/, "");
}

export function setRoleCookie(role) {
  if (typeof document === "undefined") return;

  document.cookie = `${AUTH_ROLE_COOKIE}=${encodeURIComponent(role)}; path=/; max-age=${cookieMaxAge}; samesite=lax`;
}

export function clearRoleCookie() {
  if (typeof document === "undefined") return;

  document.cookie = `${AUTH_ROLE_COOKIE}=; path=/; max-age=0; samesite=lax`;
}
