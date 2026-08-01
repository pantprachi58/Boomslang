"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import AccountGuard from "@/components/account/AccountGuard";
import { fetchMyOrders } from "@/lib/ordersApi";
import { resolveAssetUrl } from "@/lib/assetUrl";
import styles from "@/components/account/AccountPages.module.css";

const statusLabels = {
  pending: "Pending",
  accepted: "Accepted",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
};

function formatPrice(amount) {
  return `₹ ${Number(amount || 0).toLocaleString("en-IN")}`;
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isCurrent = true;

    async function loadOrders() {
      try {
        const nextOrders = await fetchMyOrders();
        if (isCurrent) setOrders(nextOrders);
      } catch (err) {
        if (isCurrent) setError(err.message);
      } finally {
        if (isCurrent) setIsLoading(false);
      }
    }

    loadOrders();

    return () => {
      isCurrent = false;
    };
  }, []);

  return (
    <AccountGuard title="Orders" subtitle="Track your Boomslang Nutrition purchases.">
      {isLoading && (
        <div className={styles.loadingPanel}>
          <div className={styles.loadingSpinner} aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <p>Loading your orders</p>
        </div>
      )}

      {!isLoading && error && <p className={`${styles.status} ${styles.error}`}>{error}</p>}

      {!isLoading && !error && orders.length === 0 && (
        <div className={styles.emptyPanel}>
          <h2>No Orders Yet</h2>
          <p>Your placed orders will appear here with delivery status updates.</p>
        </div>
      )}

      {!isLoading && orders.length > 0 && (
        <div className={styles.orderList}>
          {orders.map((order) => (
            <article className={styles.orderCard} key={order._id}>
              <div className={styles.orderHeader}>
                <div>
                  <span className={styles.mutedText}>Order ID</span>
                  <h2>{order.orderNumber}</h2>
                  <p className={styles.mutedText}>{formatDate(order.createdAt)}</p>
                </div>
                <span className={`${styles.orderStatus} ${styles[`orderStatus_${order.status}`] || ""}`}>
                  {statusLabels[order.status] || order.status}
                </span>
              </div>

              <div className={styles.orderItems}>
                {order.items.map((item) => (
                  <div className={styles.orderItem} key={`${item.slug}:${item.variantId}`}>
                    <Image
                      src={resolveAssetUrl(item.image || "/images/logo.png")}
                      alt={item.name}
                      width={64}
                      height={64}
                      className={styles.orderImage}
                    />
                    <div>
                      <strong>{item.name}</strong>
                      <p className={styles.mutedText}>
                        {item.variant ? `${item.variant} · ` : ""}
                        {item.quantity} x {formatPrice(item.price)}
                      </p>
                    </div>
                    <span>{formatPrice(item.lineTotal)}</span>
                  </div>
                ))}
              </div>

              <div className={styles.orderFooter}>
                <div>
                  <span className={styles.mutedText}>Deliver To</span>
                  <p>
                    {order.deliveryAddress.addressLine1}, {order.deliveryAddress.addressLine2},{" "}
                    {order.deliveryAddress.city}, {order.deliveryAddress.state} -{" "}
                    {order.deliveryAddress.pincode}
                  </p>
                </div>
                <strong>{formatPrice(order.totals.total)}</strong>
              </div>
            </article>
          ))}
        </div>
      )}
    </AccountGuard>
  );
}
