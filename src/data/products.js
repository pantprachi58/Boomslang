import products from "./products.json";

export const allProducts = products;

export const defaultProductSlug = "goku-gainz";

export function getProductBySlug(slug) {
  return allProducts.find((product) => product.slug === slug);
}

export function getDefaultProduct() {
  return getProductBySlug(defaultProductSlug);
}

export function getProductPath(product) {
  return `/shop/${product.slug}`;
}

export function getShopProducts() {
  return allProducts.map((product) => ({
    cartId: product.weights?.[0]?.id
      ? `${product.slug}:${product.weights[0].id}`
      : product.slug,
    id: product.id,
    slug: product.slug,
    href: getProductPath(product),
    name: product.name,
    description: product.flavour || product.subtitle,
    category: product.category,
    image: product.image,
    originalPrice: product.oldPrice,
    discountedPrice: product.price,
    percentOff: product.percentOff,
    availability: product.availability,
    variant: product.weights?.[0]?.name,
  }));
}
