import { allProducts, getShopProducts } from "@/data/products";
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

function normalizeFallbackProduct(product) {
  return normalizeProduct({
    ...product,
    _id: product._id || String(product.id || product.slug),
    status: product.status || "active",
  });
}

function filterFallbackProducts(params = {}) {
  let products = getShopProducts().map((cardProduct) => {
    const fullProduct = allProducts.find((item) => item.slug === cardProduct.slug) || {};
    return normalizeFallbackProduct({ ...fullProduct, ...cardProduct });
  });

  if (params.featured) {
    products = allProducts
      .filter((product) => product.isFeatured)
      .map(normalizeFallbackProduct);
  }

  if (params.category && params.category !== "all") {
    const categories = String(params.category).split(",");
    products = products.filter((product) => categories.includes(product.category));
  }

  if (params.search) {
    const search = String(params.search).toLowerCase();
    products = products.filter((product) =>
      [product.name, product.description, product.category, product.flavour]
        .join(" ")
        .toLowerCase()
        .includes(search)
    );
  }

  if (params.minPrice !== undefined) {
    products = products.filter((product) => Number(product.discountedPrice || 0) >= Number(params.minPrice));
  }

  if (params.maxPrice !== undefined) {
    products = products.filter((product) => Number(product.discountedPrice || 0) <= Number(params.maxPrice));
  }

  if (params.minDiscount !== undefined) {
    products = products.filter((product) => Number(product.percentOff || 0) >= Number(params.minDiscount));
  }

  if (params.maxDiscount !== undefined) {
    products = products.filter((product) => Number(product.percentOff || 0) <= Number(params.maxDiscount));
  }

  products.sort((a, b) => Number(Boolean(b.isFeatured)) - Number(Boolean(a.isFeatured)));

  const page = Math.max(Number(params.page || 1), 1);
  const limit = Math.max(Number(params.limit || products.length || 1), 1);
  const start = (page - 1) * limit;
  const pagedProducts = products.slice(start, start + limit);
  const categoryCounts = products.reduce((result, product) => {
    result[product.category] = (result[product.category] || 0) + 1;
    return result;
  }, {});
  const prices = products.map((product) => Number(product.discountedPrice || 0));

  return {
    products: pagedProducts,
    source: "fallback",
    pagination: {
      page,
      limit,
      total: products.length,
      pages: Math.max(Math.ceil(products.length / limit), 1),
    },
    facets: {
      categories: Object.entries(categoryCounts).map(([name, count]) => ({ name, count })),
      price: { min: 0, max: Math.max(...prices, 0) },
      discount: { min: 0, max: 100 },
    },
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
      source: "api",
      pagination: payload.pagination || {
        page: Number(params.page || 1),
        limit: Number(params.limit || products.length || 1),
        total: products.length,
        pages: 1,
      },
      facets: payload.facets || filterFallbackProducts(params).facets,
    };
  } catch {
    if (options.fallback === false) {
    return {
      products: [],
      source: "api",
      pagination: { page: 1, limit: Number(params.limit || 10), total: 0, pages: 1 },
        facets: { categories: [], price: { min: 0, max: 0 }, discount: { min: 0, max: 100 } },
      };
    }

    return filterFallbackProducts(params);
  }
}

export async function fetchFeaturedProduct() {
  const result = await fetchPublicProducts({ featured: true, limit: 1 });
  if (result.products[0]) return result.products[0];
  if (result.source === "fallback") {
    return normalizeFallbackProduct(allProducts.find((product) => product.isFeatured) || allProducts[0]);
  }
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
    const fallback = allProducts.find((product) => product.slug === slug);
    return fallback ? normalizeFallbackProduct(fallback) : null;
  }
}
