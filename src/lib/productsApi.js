import { getApiBaseUrl } from "./authStorage";
import { resolveAssetUrl } from "./assetUrl";

const API_BASE = `${getApiBaseUrl()}/api`;
const FALLBACK_IMAGE = "/images/logo.png";

export function getProductHref(product) {
  return `/shop/${product.slug}`;
}

export function getCartItemId(slug, variantId) {
  return variantId ? `${slug}:${variantId}` : slug;
}

export function getVariantStock(product, variantId) {
  const variant = product.weights?.find((weight) => weight.id === variantId) || product.weights?.[0];
  return Number(variant?.quantity ?? product.quantity ?? 0);
}

export function normalizeProduct(product) {
  const firstWeight = product.weights?.[0];
  const variantId = firstWeight?.id || "";
  const stock = Number(firstWeight?.quantity ?? product.quantity ?? 0);
  const image = resolveAssetUrl(product.image || product.images?.[0] || FALLBACK_IMAGE);
  const images = (product.images?.length ? product.images : [product.image])
    .filter(Boolean)
    .map(resolveAssetUrl);

  return {
    ...product,
    id: product._id || product.id || product.slug,
    variantId,
    cartId: getCartItemId(product.slug, variantId),
    href: getProductHref(product),
    image,
    images: images.length ? images : [FALLBACK_IMAGE],
    description: product.description || "",
    cardDescription: product.flavour || product.subtitle || product.description || "",
    originalPrice: firstWeight?.oldPrice ?? product.oldPrice,
    discountedPrice: firstWeight?.price ?? product.price,
    percentOff: firstWeight?.discount ?? product.discount ?? product.percentOff ?? 0,
    variant: firstWeight?.name,
    stock,
    isOutOfStock: stock <= 0,
  };
}

export async function fetchPublicProducts(params = {}, options = {}) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "" && value !== false) {
      query.set(key, String(value));
    }
  });

  try {
    const response = await fetch(`${API_BASE}/products?${query.toString()}`, {
      cache: options.cache || "no-store",
    });

    if (!response.ok) throw new Error("Unable to load products");

    const payload = await response.json();
    const products = (payload.data || []).map(normalizeProduct);

    return {
      products,
      pagination: payload.pagination || {
        page: Number(params.page || 1),
        limit: Number(params.limit || products.length || 1),
        total: products.length,
        pages: 1,
      },
      facets: payload.facets || { categories: [], price: { min: 0, max: 0 }, discount: { min: 0, max: 100 } },
    };
  } catch {
    return {
      products: [],
      pagination: { page: 1, limit: Number(params.limit || 10), total: 0, pages: 1 },
      facets: { categories: [], price: { min: 0, max: 0 }, discount: { min: 0, max: 100 } },
    };
  }
}

export async function fetchFeaturedProduct() {
  const result = await fetchPublicProducts({ featured: true, limit: 1 });
  if (result.products[0]) return result.products[0];
  return null;
}

export async function fetchProductBySlug(slug) {
  try {
    const response = await fetch(`${API_BASE}/products/slug/${slug}`, { cache: "no-store" });
    if (response.status === 404) return null;
    if (!response.ok) throw new Error("Unable to load product");
    const payload = await response.json();
    return normalizeProduct(payload.data);
  } catch {
    return null;
  }
}
