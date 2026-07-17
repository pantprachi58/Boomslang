"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container/Container";
import Button from "@/components/Button/Button";
import { useCart } from "@/components/CartProvider/CartProvider";
import { CartIcon } from "@/components/icons/Icons";
import styles from "./CheckoutContent.module.css";

const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

function RequiredMark() {
  return <span className={styles.required}>*</span>;
}

function formatPrice(amount) {
  return `₹ ${amount.toLocaleString("en-IN")}`;
}

export default function CheckoutContent() {
  const { items, totals, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submittedOrder, setSubmittedOrder] = useState(null);
  const [directItem, setDirectItem] = useState(null);
  const [checkoutMode, setCheckoutMode] = useState("cart");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const mode = window.sessionStorage.getItem("boomslang-checkout-mode");
    const storedItem = window.sessionStorage.getItem("boomslang-direct-checkout-item");

    if (mode === "direct" && storedItem) {
      try {
        const parsedItem = JSON.parse(storedItem);
        setDirectItem(parsedItem);
        setCheckoutMode("direct");
        setIsReady(true);
        return;
      } catch {
        window.sessionStorage.removeItem("boomslang-direct-checkout-item");
      }
    }

    setCheckoutMode("cart");
    setDirectItem(null);
    setIsReady(true);
  }, []);

  const checkoutItems = checkoutMode === "direct" && directItem ? [directItem] : items;
  const checkoutTotals = useMemo(() => {
    if (checkoutMode !== "direct" || !directItem) {
      return totals;
    }

    const subtotal = directItem.price * directItem.quantity;
    const cgst = Math.round(subtotal * 0.09);
    const sgst = Math.round(subtotal * 0.09);

    return {
      subtotal,
      cgst,
      sgst,
      total: subtotal + cgst + sgst,
      totalQuantity: directItem.quantity,
    };
  }, [checkoutMode, directItem, totals]);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    const formData = new FormData(form);
    const payload = {
      checkoutMode,
      delivery: {
        fullName: String(formData.get("fullName") || ""),
        email: String(formData.get("email") || ""),
        mobile: String(formData.get("mobile") || ""),
        pincode: String(formData.get("pincode") || ""),
        addressLine1: String(formData.get("addressLine1") || ""),
        addressLine2: String(formData.get("addressLine2") || ""),
        landmark: String(formData.get("landmark") || ""),
        city: String(formData.get("city") || ""),
        state: String(formData.get("state") || ""),
      },
      payment: {
        upiTransactionId: String(formData.get("upiTransactionId") || ""),
      },
      items: checkoutItems.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        variant: item.variant,
        quantity: item.quantity,
        price: item.price,
      })),
      totals: checkoutTotals,
    };

    try {
      const response = await fetch("/api/checkout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setStatus({
          type: "error",
          message: data.error || "Failed to send order email. Please try again.",
        });
        return;
      }

      setSubmittedOrder({
        orderId: data.orderId,
        items: checkoutItems,
        totals: checkoutTotals,
      });
      setSubmitted(true);
      setStatus({
        type: "success",
        message: "Order placed successfully.",
      });

      if (checkoutMode === "cart") {
        clearCart();
      }
    } catch {
      setStatus({
        type: "error",
        message: "Failed to send order email. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const displayItems = submittedOrder?.items || checkoutItems;
  const displayTotals = submittedOrder?.totals || checkoutTotals;

  if (!isReady) {
    return (
      <main className={styles.page}>
        <Container>
          <div className={styles.emptyState}>
            <h1 className={styles.title}>Preparing Checkout</h1>
          </div>
        </Container>
      </main>
    );
  }

  if (displayItems.length === 0) {
    return (
      <main className={styles.page}>
        <Container>
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon} aria-hidden="true">
              <CartIcon />
            </span>
            <h1 className={styles.title}>No Items To Checkout</h1>
            <p className={styles.emptyText}>
              Add products to your cart before entering checkout details.
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
        <div className={styles.header}>
          <h1 className={styles.title}>Checkout</h1>
          <p className={styles.subtitle}>
            Enter delivery details and complete payment using the QR code.
          </p>
        </div>

        <div className={styles.layout}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Delivery Details</h2>

              <label className={styles.field}>
                <span className={styles.label}>
                  Full name (First and Last name) <RequiredMark />
                </span>
                <input name="fullName" type="text" required className={styles.input} />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>
                  Email <RequiredMark />
                </span>
                <input name="email" type="email" required className={styles.input} />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>
                  Mobile number <RequiredMark />
                </span>
                <input
                  name="mobile"
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]{10}"
                  title="Enter a 10 digit mobile number"
                  required
                  className={styles.input}
                />
                <span className={styles.helpText}>May be used to assist delivery</span>
              </label>

              <label className={styles.field}>
                <span className={styles.label}>
                  Pincode <RequiredMark />
                </span>
                <input
                  name="pincode"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]{6}"
                  title="Enter a 6 digit PIN code"
                  placeholder="6 digits [0-9] PIN code"
                  required
                  className={styles.input}
                />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>
                  Flat, House no., Building, Company, Apartment <RequiredMark />
                </span>
                <input name="addressLine1" type="text" required className={styles.input} />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>
                  Area, Street, Sector, Village <RequiredMark />
                </span>
                <input name="addressLine2" type="text" required className={styles.input} />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>Landmark</span>
                <input
                  name="landmark"
                  type="text"
                  placeholder="E.g. near apollo hospital"
                  className={styles.input}
                />
              </label>

              <div className={styles.twoCol}>
                <label className={styles.field}>
                  <span className={styles.label}>
                    Town/City <RequiredMark />
                  </span>
                  <input name="city" type="text" required className={styles.input} />
                </label>

                <label className={styles.field}>
                  <span className={styles.label}>
                    State <RequiredMark />
                  </span>
                  <select name="state" required className={styles.input}>
                    <option value="">Choose a state</option>
                    {states.map((state) => (
                      <option value={state} key={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Payment Confirmation</h2>
              <div className={styles.paymentBox}>
                <div>
                  <p className={styles.paymentTitle}>Scan and pay</p>
                  <p className={styles.paymentText}>
                    Pay the order total using the QR code in the order summary, then enter
                    the transaction ID below.
                  </p>
                  <p className={styles.upiText}>UPI ID: 8520320988@indianbk</p>
                </div>
              </div>

              <label className={styles.field}>
                <span className={styles.label}>
                  UPI transaction ID <RequiredMark />
                </span>
                <input
                  name="upiTransactionId"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]{12,}"
                  minLength={12}
                  title="Enter a minimum 12 digit UPI transaction ID"
                  placeholder="Minimum 12 digit transaction ID"
                  required
                  className={styles.input}
                />
              </label>

              {status.type === "error" && status.message && (
                <p className={styles.errorMessage}>
                  {status.message}
                </p>
              )}

              <button
                type="submit"
                className={styles.placeOrderBtn}
                disabled={isSubmitting || submitted}
              >
                {isSubmitting ? "Placing Order..." : submitted ? "Order Placed" : "Place Order"}
              </button>
            </section>
          </form>

          <aside className={styles.summary} aria-label="Order summary">
            <h2 className={styles.summaryTitle}>Order Summary</h2>

            <div className={styles.qrCard}>
              <Image
                src="/images/payment/upi-qr.jpeg"
                alt="UPI payment QR code"
                width={260}
                height={390}
                className={styles.summaryQr}
              />
              <p>Scan this QR and pay exactly {formatPrice(displayTotals.total)}.</p>
            </div>

            <div className={styles.items}>
              {displayItems.map((item) => (
                <div className={styles.item} key={item.id}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={62}
                    height={62}
                    className={styles.itemImage}
                  />
                  <div className={styles.itemInfo}>
                    <Link href={item.href || "/shop"} className={styles.itemName}>
                      {item.name}
                    </Link>
                    <span className={styles.itemMeta}>
                      {item.quantity} x {formatPrice(item.price)}
                    </span>
                  </div>
                  <strong className={styles.itemTotal}>
                    {formatPrice(item.price * item.quantity)}
                  </strong>
                </div>
              ))}
            </div>

            <div className={styles.summaryRows}>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <strong>{formatPrice(displayTotals.subtotal)}</strong>
              </div>
              <div className={styles.summaryRow}>
                <span>CGST (9%)</span>
                <strong>{formatPrice(displayTotals.cgst)}</strong>
              </div>
              <div className={styles.summaryRow}>
                <span>SGST (9%)</span>
                <strong>{formatPrice(displayTotals.sgst)}</strong>
              </div>
            </div>

            <div className={styles.totalRow}>
              <span>Total Amount</span>
              <strong>{formatPrice(displayTotals.total)}</strong>
            </div>
          </aside>
        </div>
      </Container>

      {submittedOrder && (
        <div className={styles.successOverlay} role="dialog" aria-modal="true">
          <div className={styles.successPopup}>
            <span className={styles.successIcon} aria-hidden="true" />
            <h2>Order Placed Successfully</h2>
            <p>
              Your order details have been sent to your email.
              {submittedOrder.orderId ? ` Order ID: ${submittedOrder.orderId}` : ""}
            </p>
            <Button href="/shop" size="small">
              Continue Shopping
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}
