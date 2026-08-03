import axios from "axios";
import { AUTH_TOKEN_STORAGE_KEY, getApiBaseUrl } from "./authStorage";
import { resolveAssetUrl } from "./assetUrl";

const API_BASE = `${getApiBaseUrl()}/api`;

function getAuthHeaders(contentType = "application/json") {
  if (typeof window === "undefined") return {};
  const token = window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
  return {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(contentType ? { "Content-Type": contentType } : {}),
  };
}

function getErrorMessage(error, fallback) {
  return error?.response?.data?.message || error?.response?.data?.error || fallback;
}

export function normalizeBlog(blog) {
  const image = blog.image ? resolveAssetUrl(blog.image) : "";

  return {
    ...blog,
    id: blog._id || blog.id || blog.slug,
    rawImage: blog.image || "",
    image,
    href: `/blog/${blog.slug}`,
    tags: Array.isArray(blog.tags) ? blog.tags : [],
    content: Array.isArray(blog.content) ? blog.content : [],
    displayDate: blog.displayDate || blog.date || "",
  };
}

export async function fetchPublicBlogs(params = {}) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "" && value !== false) {
      query.set(key, String(value));
    }
  });

  try {
    const response = await fetch(`${API_BASE}/blogs?${query.toString()}`, { cache: "no-store" });
    if (!response.ok) throw new Error("Unable to load blogs");
    const payload = await response.json();
    const blogs = (payload.data || []).map(normalizeBlog);

    return {
      blogs,
      pagination: payload.pagination || {
        page: Number(params.page || 1),
        limit: Number(params.limit || blogs.length || 1),
        total: blogs.length,
        pages: 1,
      },
      facets: payload.facets || { categories: [] },
    };
  } catch {
    return {
      blogs: [],
      pagination: { page: 1, limit: Number(params.limit || 10), total: 0, pages: 1 },
      facets: { categories: [] },
    };
  }
}

export async function fetchRecentBlogs(limit = 4) {
  const result = await fetchPublicBlogs({ limit });
  return result.blogs;
}

export async function fetchBlogBySlug(slug) {
  try {
    const response = await fetch(`${API_BASE}/blogs/slug/${slug}`, { cache: "no-store" });
    if (response.status === 404) return null;
    if (!response.ok) throw new Error("Unable to load blog");
    const payload = await response.json();
    return normalizeBlog(payload.data);
  } catch {
    return null;
  }
}

export async function fetchAdminBlogs(params = {}) {
  try {
    const { data } = await axios.get(`${API_BASE}/blogs/all`, {
      params,
      headers: getAuthHeaders(null),
    });

    return {
      blogs: (data.data || []).map(normalizeBlog),
      pagination: data.pagination || {
        page: Number(params.page || 1),
        limit: Number(params.limit || 10),
        total: data.data?.length || 0,
        pages: 1,
      },
    };
  } catch (error) {
    throw new Error(getErrorMessage(error, "Unable to load blogs"));
  }
}

export async function fetchAdminBlogBySlug(slug) {
  try {
    const { data } = await axios.get(`${API_BASE}/blogs/admin/slug/${slug}`, {
      headers: getAuthHeaders(null),
    });
    return normalizeBlog(data.data);
  } catch (error) {
    throw new Error(getErrorMessage(error, "Unable to load blog"));
  }
}

export async function createAdminBlog(payload) {
  try {
    const { data } = await axios.post(`${API_BASE}/blogs`, payload, {
      headers: getAuthHeaders(),
    });
    return data.data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Unable to create blog"));
  }
}

export async function updateAdminBlog(blogId, payload) {
  try {
    const { data } = await axios.put(`${API_BASE}/blogs/${blogId}`, payload, {
      headers: getAuthHeaders(),
    });
    return data.data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Unable to update blog"));
  }
}

export async function deleteAdminBlog(blogId) {
  try {
    await axios.delete(`${API_BASE}/blogs/${blogId}`, {
      headers: getAuthHeaders(null),
    });
  } catch (error) {
    throw new Error(getErrorMessage(error, "Unable to delete blog"));
  }
}

export async function uploadBlogImage(file) {
  const payload = new FormData();
  payload.append("image", file);

  try {
    const { data } = await axios.post(`${API_BASE}/uploads/image`, payload, {
      headers: getAuthHeaders(null),
    });
    return data.url;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Unable to upload image"));
  }
}
