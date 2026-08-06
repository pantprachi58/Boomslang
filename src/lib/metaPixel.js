const META_RETRY_DELAY_MS = 500;
const META_MAX_ATTEMPTS = 12;
const DEFAULT_CURRENCY = "INR";

function isBrowser() {
  return typeof window !== "undefined";
}

function toNumber(value, fallback = 0) {
  const amount = Number(value);
  return Number.isFinite(amount) ? amount : fallback;
}

function compactObject(source) {
  return Object.fromEntries(
    Object.entries(source).filter(([, value]) => {
      if (value === undefined || value === null) return false;
      if (typeof value === "string" && value.trim() === "") return false;
      if (Array.isArray(value) && value.length === 0) return false;
      return true;
    })
  );
}

function getContentId(item = {}) {
  if (item.id) return String(item.id);
  if (item.slug && item.variantId) return `${item.slug}:${item.variantId}`;
  return item.slug ? String(item.slug) : "";
}

function getItemPrice(item = {}) {
  return toNumber(
    item.price ??
      item.discountedPrice ??
      item.salePrice ??
      item.value ??
      item.originalPrice
  );
}

function getItemQuantity(item = {}) {
  return Math.max(
    1,
    toNumber(item.purchasableQuantity ?? item.quantity ?? item.qty, 1)
  );
}

function buildCommerceParams(items = [], overrides = {}) {
  const normalizedItems = items
    .map((item) => {
      const id = getContentId(item);
      if (!id) return null;

      const quantity = getItemQuantity(item);
      const itemPrice = getItemPrice(item);

      return compactObject({
        id,
        quantity,
        item_price: itemPrice,
      });
    })
    .filter(Boolean);

  const value =
    overrides.value ??
    normalizedItems.reduce(
      (sum, item) => sum + toNumber(item.item_price) * toNumber(item.quantity, 1),
      0
    );

  return compactObject({
    ...overrides,
    content_ids: normalizedItems.map((item) => item.id),
    contents: normalizedItems,
    content_type: "product",
    currency: overrides.currency || DEFAULT_CURRENCY,
    value: toNumber(value),
    num_items:
      overrides.num_items ??
      normalizedItems.reduce((sum, item) => sum + toNumber(item.quantity, 1), 0),
  });
}

export function buildProductMetaParams(item = {}, overrides = {}) {
  const contentName = item.name || item.title || item.productName;

  return buildCommerceParams([item], {
    content_name: contentName,
    ...overrides,
  });
}

export function buildCheckoutMetaParams(items = [], totals = {}, overrides = {}) {
  return buildCommerceParams(items, {
    value: totals.total ?? totals.subtotal,
    ...overrides,
  });
}

export function trackMetaEvent(eventName, params = {}, attempt = 0) {
  if (!isBrowser() || !eventName) {
    return;
  }

  const eventParams = compactObject(params);

  if (typeof window.fbq === "function") {
    window.fbq("track", eventName, eventParams);
    return;
  }

  if (attempt < META_MAX_ATTEMPTS) {
    window.setTimeout(
      () => trackMetaEvent(eventName, eventParams, attempt + 1),
      META_RETRY_DELAY_MS
    );
  }
}
