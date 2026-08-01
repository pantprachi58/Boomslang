import { fetchProductBySlug } from "./productsApi";

export const GST_COMPONENT_RATE = 0.025;
const FALLBACK_IMAGE = "/images/logo.png";

function getSelectedVariant(product, variantId) {
  return (
    product.weights?.find((weight) => weight.id === variantId) ||
    product.weights?.[0] ||
    null
  );
}

export function calculateCartTotals(items = []) {
  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.purchasableQuantity || 0),
    0
  );
  const cgst = Math.round(subtotal * GST_COMPONENT_RATE);
  const sgst = Math.round(subtotal * GST_COMPONENT_RATE);

  return {
    subtotal,
    cgst,
    sgst,
    total: subtotal + cgst + sgst,
    totalQuantity: items.reduce((sum, item) => sum + Number(item.quantity || 0), 0),
  };
}

export async function hydrateCartItems(items = []) {
  const uniqueSlugs = [...new Set(items.map((item) => item.slug).filter(Boolean))];
  const products = await Promise.all(uniqueSlugs.map((slug) => fetchProductBySlug(slug)));
  const productBySlug = new Map();

  products.forEach((product) => {
    if (product?.slug) {
      productBySlug.set(product.slug, product);
    }
  });

  return items.map((item) => {
    const product = productBySlug.get(item.slug);

    if (!product) {
      return {
        ...item,
        name: "Unavailable product",
        description: "This product is no longer available.",
        variant: "",
        href: "/shop",
        image: FALLBACK_IMAGE,
        price: 0,
        oldPrice: 0,
        percentOff: 0,
        stock: 0,
        isOutOfStock: true,
        isUnavailable: true,
        purchasableQuantity: 0,
      };
    }

    const variant = getSelectedVariant(product, item.variantId);
    const variantId = item.variantId || "";
    const stock = Math.max(Number(variant?.quantity ?? product.quantity ?? 0), 0);
    const quantity = Math.max(Number(item.quantity || 0), 0);
    const purchasableQuantity = stock > 0 ? Math.min(quantity, stock) : 0;

    return {
      ...item,
      id: item.id,
      slug: product.slug,
      variantId,
      selectedVariantId: variant?.id || "",
      name: product.name,
      description: product.flavour || product.subtitle || product.description,
      variant: variant?.name || "",
      href: product.href || `/shop/${product.slug}`,
      image: product.image || FALLBACK_IMAGE,
      price: Number(variant?.price ?? product.price ?? product.discountedPrice ?? 0),
      oldPrice: Number(variant?.oldPrice ?? product.oldPrice ?? product.originalPrice ?? 0),
      percentOff: Number(variant?.discount ?? product.discount ?? product.percentOff ?? 0),
      stock,
      isOutOfStock: stock <= 0,
      isUnavailable: false,
      purchasableQuantity,
      wasAdjusted: stock > 0 && quantity > stock,
    };
  });
}
