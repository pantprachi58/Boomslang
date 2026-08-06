"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container/Container";
import Button from "@/components/Button/Button";
import { useCart } from "@/components/CartProvider/CartProvider";
import { CartIcon } from "@/components/icons/Icons";
import { useAuth } from "@/components/AuthProvider/AuthProvider";
import { calculateCartTotals, hydrateCartItems } from "@/lib/cartHydration";
import { createOrder } from "@/lib/ordersApi";
import { validateVoucher } from "@/lib/vouchersApi";
import { resolveAssetUrl } from "@/lib/assetUrl";
import { buildCheckoutMetaParams, trackMetaEvent } from "@/lib/metaPixel";
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
const COD_PREPAID_AMOUNT = 99;
const emptyAddressForm = {
  pincode: "",
  addressLine1: "",
  addressLine2: "",
  landmark: "",
  city: "",
  state: "",
  isDefault: false,
};

function RequiredMark() {
  return <span className={styles.required}>*</span>;
}

function formatPrice(amount) {
  return `₹ ${amount.toLocaleString("en-IN")}`;
}

function PreparingCheckout() {
  return (
    <main className={styles.page}>
      <Container>
        <section className={styles.loadingState} aria-live="polite">
          <div className={styles.loadingDots} aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <h1 className={styles.title}>Preparing Checkout</h1>
          <p className={styles.emptyText}>Getting your cart and account details ready.</p>
        </section>
      </Container>
    </main>
  );
}

export default function CheckoutContent() {
  const { items, clearCart } = useCart();
  const { user, isAuthenticated, isLoading: isAuthLoading, addAddress } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submittedOrder, setSubmittedOrder] = useState(null);
  const [directItem, setDirectItem] = useState(null);
  const [checkoutMode, setCheckoutMode] = useState("cart");
  const [paymentMethod, setPaymentMethod] = useState("prepaid");
  const [isReady, setIsReady] = useState(false);
  const [hydratedCartItems, setHydratedCartItems] = useState([]);
  const [isHydratingCart, setIsHydratingCart] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [addressMode, setAddressMode] = useState("saved");
  const [addressForm, setAddressForm] = useState(emptyAddressForm);
  const [voucherCode, setVoucherCode] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState(null);
  const [voucherStatus, setVoucherStatus] = useState({ type: "", message: "" });
  const [isApplyingVoucher, setIsApplyingVoucher] = useState(false);
  const initiateCheckoutKeyRef = useRef("");

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

  useEffect(() => {
    let isCurrent = true;

    async function loadCartItems() {
      if (!isReady || checkoutMode !== "cart") return;

      if (items.length === 0) {
        setHydratedCartItems([]);
        setIsHydratingCart(false);
        return;
      }

      setIsHydratingCart(true);
      const nextItems = await hydrateCartItems(items);
      if (!isCurrent) return;

      setHydratedCartItems(nextItems);
      setIsHydratingCart(false);
    }

    loadCartItems();

    return () => {
      isCurrent = false;
    };
  }, [checkoutMode, isReady, items]);

  useEffect(() => {
    const addresses = user?.addresses || [];

    if (!addresses.length) {
      setSelectedAddressId("");
      setAddressMode("new");
      return;
    }

    setAddressMode("saved");
    setSelectedAddressId((current) => {
      if (addresses.some((address) => address._id === current || address.id === current)) {
        return current;
      }

      const defaultAddress = addresses.find((address) => address.isDefault) || addresses[0];
      return defaultAddress._id || defaultAddress.id || "";
    });
  }, [user]);

  const checkoutItems = checkoutMode === "direct" && directItem ? [directItem] : hydratedCartItems;
  const checkoutTotals = useMemo(() => {
    if (checkoutMode !== "direct" || !directItem) {
      return calculateCartTotals(hydratedCartItems);
    }

    const subtotal = directItem.price * directItem.quantity;
    const directTotals = calculateCartTotals([
      {
        ...directItem,
        purchasableQuantity: directItem.quantity,
      },
    ]);

    return {
      ...directTotals,
      subtotal,
      totalQuantity: directItem.quantity,
    };
  }, [checkoutMode, directItem, hydratedCartItems]);
  const discountedCheckoutTotals = useMemo(() => {
    if (!appliedVoucher) return checkoutTotals;

    const grossTotal = checkoutTotals.subtotal + checkoutTotals.cgst + checkoutTotals.sgst;
    const discount = Math.round(
      (grossTotal * Number(appliedVoucher.discountPercent || 0)) / 100
    );

    return {
      ...checkoutTotals,
      discount,
      total: Math.max(grossTotal - discount, 0),
    };
  }, [appliedVoucher, checkoutTotals]);

  useEffect(() => {
    if (!isReady || submittedOrder || checkoutItems.length === 0) {
      return;
    }

    if (checkoutMode === "cart" && isHydratingCart) {
      return;
    }

    const eventKey = JSON.stringify({
      mode: checkoutMode,
      items: checkoutItems.map((item) => ({
        id: item.id || `${item.slug}:${item.variantId || ""}`,
        quantity: item.purchasableQuantity || item.quantity,
      })),
    });

    if (initiateCheckoutKeyRef.current === eventKey) {
      return;
    }

    initiateCheckoutKeyRef.current = eventKey;
    trackMetaEvent(
      "InitiateCheckout",
      buildCheckoutMetaParams(checkoutItems, discountedCheckoutTotals)
    );
  }, [
    checkoutItems,
    checkoutMode,
    discountedCheckoutTotals,
    isHydratingCart,
    isReady,
    submittedOrder,
  ]);

  const savedAddresses = user?.addresses || [];
  const selectedAddress =
    savedAddresses.find((address) => address._id === selectedAddressId || address.id === selectedAddressId) ||
    null;

  const handleAddressFieldChange = (field, value) => {
    setAddressForm((current) => ({ ...current, [field]: value }));
  };

  const handleAddAddress = async () => {
    setStatus({ type: "", message: "" });

    if (
      !addressForm.pincode ||
      !addressForm.addressLine1 ||
      !addressForm.addressLine2 ||
      !addressForm.city ||
      !addressForm.state
    ) {
      setStatus({
        type: "error",
        message: "Please fill in all required address fields.",
      });
      return;
    }

    setIsAddingAddress(true);

    try {
      const response = await addAddress({
        ...addressForm,
        isDefault: addressForm.isDefault || savedAddresses.length === 0,
      });
      const nextAddresses = response.data || response.user?.addresses || [];
      const nextAddress = nextAddresses[nextAddresses.length - 1];

      setAddressForm(emptyAddressForm);
      setAddressMode("saved");
      setSelectedAddressId(nextAddress?._id || nextAddress?.id || "");
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message,
      });
    } finally {
      setIsAddingAddress(false);
    }
  };

  const handleVoucherCodeChange = (value) => {
    const normalizedValue = value.replace(/[^a-z0-9]/gi, "").toUpperCase().slice(0, 10);
    setVoucherCode(normalizedValue);

    if (appliedVoucher && normalizedValue !== appliedVoucher.code) {
      setAppliedVoucher(null);
      setVoucherStatus({ type: "", message: "" });
    }
  };

  const handleApplyVoucher = async () => {
    const normalizedCode = voucherCode.trim().toUpperCase();
    setVoucherStatus({ type: "", message: "" });

    if (!/^[A-Z0-9]{6,10}$/.test(normalizedCode)) {
      setVoucherStatus({
        type: "error",
        message: "Enter a valid 6 to 10 character voucher code.",
      });
      return;
    }

    setIsApplyingVoucher(true);

    try {
      const voucher = await validateVoucher(normalizedCode);
      setAppliedVoucher(voucher);
      setVoucherCode(voucher.code);
      setVoucherStatus({
        type: "success",
        message: `${voucher.code} applied for ${voucher.discountPercent}% off.`,
      });
    } catch (error) {
      setAppliedVoucher(null);
      setVoucherStatus({ type: "error", message: error.message });
    } finally {
      setIsApplyingVoucher(false);
    }
  };

  const handleRemoveVoucher = () => {
    setAppliedVoucher(null);
    setVoucherCode("");
    setVoucherStatus({ type: "", message: "" });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    if (!selectedAddress) {
      setStatus({
        type: "error",
        message: "Please select or add a delivery address.",
      });
      setIsSubmitting(false);
      return;
    }

    if (
      isHydratingCart ||
      checkoutItems.some((item) => item.isOutOfStock || item.isUnavailable || item.purchasableQuantity <= 0)
    ) {
      setStatus({
        type: "error",
        message: "Please remove out of stock products before placing your order.",
      });
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData(form);
    const selectedPaymentMethod = String(formData.get("paymentMethod") || "prepaid");
    const payload = {
      checkoutMode,
      deliveryAddress: selectedAddress,
      payment: {
        method: selectedPaymentMethod,
        upiTransactionId: String(formData.get("upiTransactionId") || ""),
      },
      items: checkoutItems.map((item) => ({
        slug: item.slug,
        variantId: item.variantId,
        quantity: item.purchasableQuantity || item.quantity,
      })),
      voucherCode: appliedVoucher?.code || "",
    };

    try {
      const data = await createOrder(payload);
      const order = data.data;
      const orderItems = order.items || checkoutItems;
      const orderTotals = order.totals || discountedCheckoutTotals;

      setSubmittedOrder({
        orderId: order.orderNumber,
        items: orderItems,
        totals: orderTotals,
        payment: order.payment,
        voucher: order.voucher,
      });
      trackMetaEvent(
        "Purchase",
        buildCheckoutMetaParams(orderItems, orderTotals, {
          order_id: order.orderNumber,
        })
      );
      setSubmitted(true);
      setStatus({
        type: "success",
        message: "Order placed successfully.",
      });

      if (checkoutMode === "cart") {
        clearCart();
      } else {
        window.sessionStorage.removeItem("boomslang-direct-checkout-item");
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const displayItems = submittedOrder?.items || checkoutItems;
  const displayTotals = submittedOrder?.totals || discountedCheckoutTotals;
  const displayVoucher =
    submittedOrder?.voucher?.code
      ? submittedOrder.voucher
      : appliedVoucher
        ? {
            code: appliedVoucher.code,
            discountPercent: appliedVoucher.discountPercent,
            discountAmount: displayTotals.discount || 0,
          }
        : null;
  const activePaymentMethod = submittedOrder?.payment?.method || paymentMethod;
  const payableAmount = submittedOrder?.payment?.paidAmount || (
    activePaymentMethod === "cod" ? Math.min(COD_PREPAID_AMOUNT, displayTotals.total) : displayTotals.total
  );
  const paymentMethodLabel =
    activePaymentMethod === "cod" ? "Cash on Delivery" : "Full QR Payment";
  const amountDueOnDelivery = Math.max(displayTotals.total - payableAmount, 0);
  const isPreparingCartCheckout =
    isReady &&
    checkoutMode === "cart" &&
    items.length > 0 &&
    displayItems.length === 0;

  if (!isReady || isAuthLoading) {
    return <PreparingCheckout />;
  }

  if (isPreparingCartCheckout) {
    return <PreparingCheckout />;
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

  if (!isAuthenticated) {
    return (
      <main className={styles.page}>
        <Container>
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon} aria-hidden="true">
              <CartIcon />
            </span>
            <h1 className={styles.title}>Login To Checkout</h1>
            <p className={styles.emptyText}>
              Please login so we can use your saved addresses and keep your order history.
            </p>
            <Button href="/login?redirect=/checkout" size="small">
              Login
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
              <div className={styles.sectionHeader}>
                <div>
                  <h2 className={styles.sectionTitle}>Delivery Address</h2>
                  <p className={styles.sectionHint}>
                    Delivering to {user?.name || user?.email}
                  </p>
                </div>
                {savedAddresses.length > 0 && (
                  <button
                    type="button"
                    className={styles.changeAddressBtn}
                    onClick={() => setAddressMode(addressMode === "new" ? "saved" : "new")}
                  >
                    {addressMode === "new" ? "Saved Addresses" : "Add New Address"}
                  </button>
                )}
              </div>

              {savedAddresses.length > 0 && addressMode === "saved" && (
                <div className={styles.addressList}>
                  {savedAddresses.map((address) => {
                    const addressId = address._id || address.id;
                    const isSelected = selectedAddressId === addressId;

                    return (
                      <label
                        key={addressId}
                        className={`${styles.addressOption} ${
                          isSelected ? styles.addressOptionActive : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="selectedAddress"
                          value={addressId}
                          checked={isSelected}
                          onChange={() => setSelectedAddressId(addressId)}
                        />
                        <span>
                          <strong>{user?.name || user?.email}</strong>
                          <small className={styles.addressPhone}>{user?.mobile}</small>
                          <small>{address.addressLine1}</small>
                          <small>{address.addressLine2}</small>
                          {address.landmark && <small>Landmark: {address.landmark}</small>}
                          <small>
                            {address.city}, {address.state} - {address.pincode}
                          </small>
                          {address.isDefault && <em>Default address</em>}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}

              {(addressMode === "new" || savedAddresses.length === 0) && (
                <div className={styles.addressForm}>
                  <label className={styles.field}>
                    <span className={styles.label}>
                      Pincode <RequiredMark />
                    </span>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]{6}"
                      title="Enter a 6 digit PIN code"
                      placeholder="6 digits [0-9] PIN code"
                      required
                      className={styles.input}
                      value={addressForm.pincode}
                      onChange={(event) => handleAddressFieldChange("pincode", event.target.value)}
                    />
                  </label>

                  <label className={styles.field}>
                    <span className={styles.label}>
                      Flat, House no., Building, Company, Apartment <RequiredMark />
                    </span>
                    <input
                      type="text"
                      required
                      className={styles.input}
                      value={addressForm.addressLine1}
                      onChange={(event) =>
                        handleAddressFieldChange("addressLine1", event.target.value)
                      }
                    />
                  </label>

                  <label className={styles.field}>
                    <span className={styles.label}>
                      Area, Street, Sector, Village <RequiredMark />
                    </span>
                    <input
                      type="text"
                      required
                      className={styles.input}
                      value={addressForm.addressLine2}
                      onChange={(event) =>
                        handleAddressFieldChange("addressLine2", event.target.value)
                      }
                    />
                  </label>

                  <label className={styles.field}>
                    <span className={styles.label}>Landmark</span>
                    <input
                      type="text"
                      placeholder="E.g. near apollo hospital"
                      className={styles.input}
                      value={addressForm.landmark}
                      onChange={(event) => handleAddressFieldChange("landmark", event.target.value)}
                    />
                  </label>

                  <div className={styles.twoCol}>
                    <label className={styles.field}>
                      <span className={styles.label}>
                        Town/City <RequiredMark />
                      </span>
                      <input
                        type="text"
                        required
                        className={styles.input}
                        value={addressForm.city}
                        onChange={(event) => handleAddressFieldChange("city", event.target.value)}
                      />
                    </label>

                    <label className={styles.field}>
                      <span className={styles.label}>
                        State <RequiredMark />
                      </span>
                      <select
                        required
                        className={styles.input}
                        value={addressForm.state}
                        onChange={(event) => handleAddressFieldChange("state", event.target.value)}
                      >
                        <option value="">Choose a state</option>
                        {states.map((state) => (
                          <option value={state} key={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <label className={styles.saveDefault}>
                    <input
                      type="checkbox"
                      checked={addressForm.isDefault}
                      onChange={(event) =>
                        handleAddressFieldChange("isDefault", event.target.checked)
                      }
                    />
                    Make this my default delivery address
                  </label>

                  <div className={styles.addressActions}>
                    <button
                      type="button"
                      className={styles.saveAddressBtn}
                      onClick={handleAddAddress}
                      disabled={isAddingAddress}
                    >
                      {isAddingAddress ? "Saving Address..." : "Save & Use Address"}
                    </button>
                    {savedAddresses.length > 0 && (
                      <button
                        type="button"
                        className={styles.cancelAddressBtn}
                        onClick={() => setAddressMode("saved")}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              )}
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Payment Confirmation</h2>
              <div className={styles.paymentMethods}>
                <label
                  className={`${styles.paymentMethod} ${
                    paymentMethod === "prepaid" ? styles.paymentMethodActive : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="prepaid"
                    checked={paymentMethod === "prepaid"}
                    onChange={() => setPaymentMethod("prepaid")}
                  />
                  <span>
                    <strong>Pay Online</strong>
                    <small>Pay full order amount by QR code.</small>
                  </span>
                </label>

                <label
                  className={`${styles.paymentMethod} ${
                    paymentMethod === "cod" ? styles.paymentMethodActive : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                  />
                  <span>
                    <strong>Cash on Delivery</strong>
                    <small>Pay ₹99 now using QR. Remaining amount on delivery.</small>
                  </span>
                </label>
              </div>

              <div className={styles.paymentBox}>
                <div>
                  <p className={styles.paymentTitle}>Scan and pay</p>
                  <p className={styles.paymentText}>
                    {paymentMethod === "cod"
                      ? "For Cash on Delivery, pay ₹99 using the QR code in the order summary, then enter the transaction ID below."
                      : "Pay the order total using the QR code in the order summary, then enter the transaction ID below."}
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
                disabled={isSubmitting || submitted || !selectedAddress || isAddingAddress}
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
              <p>Scan this QR and pay exactly {formatPrice(payableAmount)}.</p>
              <p className={styles.paymentModeText}>{paymentMethodLabel}</p>
            </div>

            <div className={styles.items}>
              {displayItems.map((item) => (
                <div className={styles.item} key={item.id || `${item.slug}:${item.variantId}`}>
                  <Image
                    src={resolveAssetUrl(item.image || "/images/logo.png")}
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
                      {item.purchasableQuantity || item.quantity} x {formatPrice(item.price)}
                    </span>
                  </div>
                  <strong className={styles.itemTotal}>
                    {formatPrice(item.price * (item.purchasableQuantity || item.quantity))}
                  </strong>
                </div>
              ))}
            </div>

            {!submittedOrder && (
              <div className={styles.voucherBox}>
                <label className={styles.voucherLabel} htmlFor="checkout-voucher">
                  Voucher Code
                </label>
                <div className={styles.voucherControls}>
                  <input
                    id="checkout-voucher"
                    type="text"
                    value={voucherCode}
                    onChange={(event) => handleVoucherCodeChange(event.target.value)}
                    placeholder="ENTER CODE"
                    className={styles.voucherInput}
                    disabled={isApplyingVoucher}
                  />
                  {appliedVoucher ? (
                    <button type="button" className={styles.removeVoucherBtn} onClick={handleRemoveVoucher}>
                      Remove
                    </button>
                  ) : (
                    <button
                      type="button"
                      className={styles.applyVoucherBtn}
                      onClick={handleApplyVoucher}
                      disabled={isApplyingVoucher}
                    >
                      {isApplyingVoucher ? "Checking..." : "Apply"}
                    </button>
                  )}
                </div>
                {voucherStatus.message && (
                  <p className={`${styles.voucherStatus} ${styles[voucherStatus.type]}`}>
                    {voucherStatus.message}
                  </p>
                )}
              </div>
            )}

            <div className={styles.summaryRows}>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <strong>{formatPrice(displayTotals.subtotal)}</strong>
              </div>
              {displayVoucher?.code && (
                <div className={`${styles.summaryRow} ${styles.discountRow}`}>
                  <span>
                    Voucher {displayVoucher.code} ({displayVoucher.discountPercent}%)
                  </span>
                  <strong>-{formatPrice(displayVoucher.discountAmount || displayTotals.discount || 0)}</strong>
                </div>
              )}
              <div className={styles.summaryRow}>
                <span>CGST (2.5%)</span>
                <strong>{formatPrice(displayTotals.cgst)}</strong>
              </div>
              <div className={styles.summaryRow}>
                <span>SGST (2.5%)</span>
                <strong>{formatPrice(displayTotals.sgst)}</strong>
              </div>
            </div>

            <div className={styles.totalRow}>
              <span>Total Amount</span>
              <strong>{formatPrice(displayTotals.total)}</strong>
            </div>
            <div className={styles.payableRow}>
              <span>Payable Now</span>
              <strong>{formatPrice(payableAmount)}</strong>
            </div>
            {activePaymentMethod === "cod" && (
              <div className={styles.dueRow}>
                <span>Due On Delivery</span>
                <strong>{formatPrice(amountDueOnDelivery)}</strong>
              </div>
            )}
          </aside>
        </div>
      </Container>

      {submittedOrder && (
        <div className={styles.successOverlay} role="dialog" aria-modal="true">
          <div className={styles.successPopup}>
            <span className={styles.successIcon} aria-hidden="true" />
            <h2>Order Placed Successfully</h2>
            <p>
              Your order has been saved successfully.
              {submittedOrder.orderId ? ` Order ID: ${submittedOrder.orderId}` : ""}
            </p>
            <Button href="/orders" size="small">
              View Orders
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}
