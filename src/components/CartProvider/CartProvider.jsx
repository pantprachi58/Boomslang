"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CART_STORAGE_KEY = "boomslang-cart";
const CartContext = createContext(null);

function getCartItemId(slug, variantId) {
  return variantId ? `${slug}:${variantId}` : slug;
}

function readStoredCart() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(CART_STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed.map(normalizeCartItem).filter(Boolean) : [];
  } catch {
    return [];
  }
}

function normalizeQuantity(quantity) {
  const value = Number(quantity);
  return Number.isFinite(value) && value > 0 ? Math.floor(value) : 1;
}

function normalizeStock(stock) {
  const value = Number(stock);
  return Number.isFinite(value) ? Math.max(Math.floor(value), 0) : null;
}

function normalizeCartItem(item) {
  if (!item || typeof item !== "object") {
    return null;
  }

  const rawId = String(item.id || "");
  const idParts = rawId.split(":");
  const slug = String(item.slug || idParts[0] || "").trim();
  const variantId = String(item.variantId || (idParts.length > 1 ? idParts.slice(1).join(":") : "")).trim();

  if (!slug) {
    return null;
  }

  return {
    id: getCartItemId(slug, variantId),
    slug,
    variantId,
    quantity: normalizeQuantity(item.quantity),
  };
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setItems(readStoredCart());
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items, isReady]);

  useEffect(() => {
    function handleStorage(event) {
      if (event.key === CART_STORAGE_KEY) {
        setItems(readStoredCart());
      }
    }

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const addItem = useCallback((item, quantity = 1) => {
    const normalizedItem = normalizeCartItem(item);
    if (!normalizedItem) return;

    const amount = normalizeQuantity(quantity);
    const stock = normalizeStock(item.stock);

    if (stock !== null && stock <= 0) {
      return;
    }

    setItems((currentItems) => {
      const existing = currentItems.find((cartItem) => cartItem.id === normalizedItem.id);

      if (existing) {
        return currentItems.map((cartItem) =>
          cartItem.id === normalizedItem.id
            ? {
                ...cartItem,
                quantity:
                  stock === null
                    ? cartItem.quantity + amount
                    : Math.min(cartItem.quantity + amount, stock),
              }
            : cartItem
        );
      }

      return [
        ...currentItems,
        {
          ...normalizedItem,
          quantity: stock === null ? amount : Math.min(amount, stock),
        },
      ];
    });
  }, []);

  const decreaseItem = useCallback((id) => {
    setItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const removeItem = useCallback((id) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const updateItemQuantity = useCallback((id, quantity) => {
    const nextQuantity = Number(quantity);

    setItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Number.isFinite(nextQuantity) ? Math.floor(nextQuantity) : item.quantity }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const getItemQuantity = useCallback(
    (id) => items.find((item) => item.id === id)?.quantity || 0,
    [items]
  );

  const totals = useMemo(() => {
    return {
      subtotal: 0,
      cgst: 0,
      sgst: 0,
      total: 0,
      totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0),
    };
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      totals,
      addItem,
      decreaseItem,
      removeItem,
      clearCart,
      updateItemQuantity,
      getItemQuantity,
    }),
    [items, totals, addItem, decreaseItem, removeItem, clearCart, updateItemQuantity, getItemQuantity]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider.");
  }

  return context;
}
