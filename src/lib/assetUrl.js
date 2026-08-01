import { getApiBaseUrl } from "./authStorage";

export function resolveAssetUrl(url) {
  if (!url) return "";
  if (url.startsWith("/uploads")) return `${getApiBaseUrl()}${url}`;
  return url;
}
