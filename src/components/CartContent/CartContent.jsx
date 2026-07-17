"use client";

import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container/Container";
import Button from "@/components/Button/Button";
import { useCart } from "@/components/CartProvider/CartProvider";
import { CartIcon } from "@/components/icons/Icons";
import styles from "./CartContent.module.css";

function formatPrice(amount) {
  return `₹ ${amount.toLocaleString("en-IN")}`;
}

export default function CartContent() {
  const { items, totals, addItem, decreaseItem, removeItem, clearCart } = useCart();

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
              {totals.totalQuantity} {totals.totalQuantity === 1 ? "item" : "items"} in your cart
            </p>
          </div>
          <button type="button" className={styles.clearBtn} onClick={clearCart}>
            Clear Cart
          </button>
        </div>

        <div className={styles.layout}>
          <section className={styles.items} aria-label="Cart items">
            {items.map((item) => (
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
                    onClick={() => addItem(item)}
                    aria-label={`Add one ${item.name}`}
                  >
                    +
                  </button>
                </div>

                <div className={styles.priceBlock}>
                  <span className={styles.linePrice}>
                    {formatPrice(item.price * item.quantity)}
                  </span>
                  <span className={styles.unitPrice}>
                    {formatPrice(item.price)} each
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
                <span>CGST (9%)</span>
                <strong>{formatPrice(totals.cgst)}</strong>
              </div>
              <div className={styles.summaryRow}>
                <span>SGST (9%)</span>
                <strong>{formatPrice(totals.sgst)}</strong>
              </div>
            </div>
            <div className={styles.totalRow}>
              <span>Total Amount</span>
              <strong>{formatPrice(totals.total)}</strong>
            </div>
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
            <Link href="/shop" className={styles.continueLink}>
              Continue Shopping
            </Link>
          </aside>
        </div>
      </Container>
    </main>
  );
}
