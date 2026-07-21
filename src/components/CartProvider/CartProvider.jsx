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
const GST_COMPONENT_RATE = 0.025;
const CartContext = createContext(null);

function readStoredCart() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(CART_STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function normalizeQuantity(quantity) {
  const value = Number(quantity);
  return Number.isFinite(value) && value > 0 ? Math.floor(value) : 1;
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
    const amount = normalizeQuantity(quantity);

    setItems((currentItems) => {
      const existing = currentItems.find((cartItem) => cartItem.id === item.id);

      if (existing) {
        return currentItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + amount }
            : cartItem
        );
      }

      return [
        ...currentItems,
        {
          ...item,
          quantity: amount,
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

  const getItemQuantity = useCallback(
    (id) => items.find((item) => item.id === id)?.quantity || 0,
    [items]
  );

  const totals = useMemo(() => {
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const cgst = Math.round(subtotal * GST_COMPONENT_RATE);
    const sgst = Math.round(subtotal * GST_COMPONENT_RATE);

    return {
      subtotal,
      cgst,
      sgst,
      total: subtotal + cgst + sgst,
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
      getItemQuantity,
    }),
    [items, totals, addItem, decreaseItem, removeItem, clearCart, getItemQuantity]
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
