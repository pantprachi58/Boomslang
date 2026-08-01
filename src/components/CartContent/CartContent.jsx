"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container/Container";
import Button from "@/components/Button/Button";
import { useCart } from "@/components/CartProvider/CartProvider";
import { CartIcon } from "@/components/icons/Icons";
import { calculateCartTotals, hydrateCartItems } from "@/lib/cartHydration";
import styles from "./CartContent.module.css";

function formatPrice(amount) {
  return `₹ ${amount.toLocaleString("en-IN")}`;
}

export default function CartContent() {
  const { items, addItem, decreaseItem, removeItem, clearCart, updateItemQuantity } = useCart();
  const [hydratedItems, setHydratedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isCurrent = true;

    async function loadCartProducts() {
      if (items.length === 0) {
        setHydratedItems([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      const nextItems = await hydrateCartItems(items);

      if (!isCurrent) return;

      setHydratedItems(nextItems);
      setIsLoading(false);

      nextItems.forEach((item) => {
        if (item.wasAdjusted) {
          updateItemQuantity(item.id, item.purchasableQuantity);
        }
      });
    }

    loadCartProducts();

    return () => {
      isCurrent = false;
    };
  }, [items, updateItemQuantity]);

  const totals = useMemo(() => calculateCartTotals(hydratedItems), [hydratedItems]);
  const isCartHydrating = isLoading && hydratedItems.length === 0;
  const hasUnavailableItems =
    isCartHydrating ||
    hydratedItems.some(
      (item) => item.isOutOfStock || item.isUnavailable || item.purchasableQuantity <= 0
    );

  if (items.length === 0) {
    return (
      <main className={styles.page}>
        <Container>
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon} aria-hidden="true">
              <CartIcon />
            </span>
            <h1 className={styles.title}>Your Cart Is Empty</h1>
            <p className={styles.emptyText}>
              Add your favourite Boomslang Nutrition products and they will appear here.
            </p>
            <Button href="/shop" size="small">
              Shop Products
            </Button>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <Container>
        <div className={styles.headerRow}>
          <div>
            <h1 className={styles.title}>Shopping Cart</h1>
            <p className={styles.subtitle}>
              {items.reduce((sum, item) => sum + item.quantity, 0)}{" "}
              {items.reduce((sum, item) => sum + item.quantity, 0) === 1 ? "item" : "items"} in your cart
            </p>
          </div>
          <button type="button" className={styles.clearBtn} onClick={clearCart}>
            Clear Cart
          </button>
        </div>

        <div className={styles.layout}>
          <section className={styles.items} aria-label="Cart items">
            {isCartHydrating && (
              <div className={styles.loadingState} aria-live="polite">
                <div className={styles.loadingDots} aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <p>Loading cart</p>
              </div>
            )}

            {hydratedItems.map((item) => (
              <article className={styles.item} key={item.id}>
                <Link href={item.href || "/shop"} className={styles.imageWrap}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={130}
                    height={130}
                    className={styles.image}
                  />
                </Link>

                <div className={styles.itemInfo}>
                  <Link href={item.href || "/shop"} className={styles.itemName}>
                    {item.name}
                  </Link>
                  <p className={styles.itemDescription}>
                    {item.variant || item.description}
                  </p>
                  {item.isOutOfStock ? (
                    <p className={styles.stockWarning}>Out of stock</p>
                  ) : item.wasAdjusted ? (
                    <p className={styles.stockWarning}>Quantity adjusted to available stock.</p>
                  ) : null}
                  <button
                    type="button"
                    className={styles.removeBtn}
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>

                <div className={styles.quantityControl}>
                  <button
                    type="button"
                    className={styles.quantityBtn}
                    onClick={() => decreaseItem(item.id)}
                    aria-label={`Remove one ${item.name}`}
                  >
                    -
                  </button>
                  <span className={styles.quantityValue}>{item.quantity}</span>
                  <button
                    type="button"
                    className={styles.quantityBtn}
                    onClick={() => addItem({ id: item.id, slug: item.slug, variantId: item.variantId, stock: item.stock })}
                    aria-label={`Add one ${item.name}`}
                    disabled={item.isOutOfStock || item.quantity >= item.stock}
                  >
                    +
                  </button>
                </div>

                <div className={styles.priceBlock}>
                  <span className={styles.linePrice}>
                    {formatPrice(item.price * item.purchasableQuantity)}
                  </span>
                  <span className={styles.unitPrice}>
                    {item.isOutOfStock ? "Unavailable" : `${formatPrice(item.price)} each`}
                  </span>
                </div>
              </article>
            ))}
          </section>

          <aside className={styles.summary} aria-label="Cart summary">
            <h2 className={styles.summaryTitle}>Order Summary</h2>
            <div className={styles.summaryRows}>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <strong>{formatPrice(totals.subtotal)}</strong>
              </div>
              <div className={styles.summaryRow}>
                <span>CGST (2.5%)</span>
                <strong>{formatPrice(totals.cgst)}</strong>
              </div>
              <div className={styles.summaryRow}>
                <span>SGST (2.5%)</span>
                <strong>{formatPrice(totals.sgst)}</strong>
              </div>
            </div>
            <div className={styles.totalRow}>
              <span>Total Amount</span>
              <strong>{formatPrice(totals.total)}</strong>
            </div>
            {hasUnavailableItems && (
              <p className={styles.checkoutWarning}>
                {isCartHydrating
                  ? "Checking latest product availability."
                  : "Remove out of stock products before checkout."}
              </p>
            )}
            {hasUnavailableItems ? (
              <button type="button" className={styles.checkoutBtn} disabled>
                Checkout
              </button>
            ) : (
              <Link
                href="/checkout"
                className={styles.checkoutBtn}
                onClick={() => {
                  window.sessionStorage.setItem("boomslang-checkout-mode", "cart");
                  window.sessionStorage.removeItem("boomslang-direct-checkout-item");
                }}
              >
                Checkout
              </Link>
            )}
            <Link href="/shop" className={styles.continueLink}>
              Continue Shopping
            </Link>
          </aside>
        </div>
      </Container>
    </main>
  );
}
