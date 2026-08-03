"use client";

import Link from "next/link";
import styles from "./RecentOrders.module.css";

const statusLabels = {
  pending: "Pending",
  accepted: "Accepted",
  out_for_delivery: "Out For Delivery",
  delivered: "Delivered",
};

function formatPrice(amount) {
  return `₹ ${Number(amount || 0).toLocaleString("en-IN")}`;
}

function formatDate(date) {
  if (!date) return "-";
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default function RecentOrders({ orders = [], isLoading = false }) {
  const getStatusClass = (status) => {
    switch (status) {
      case "delivered":
        return styles.statusCompleted;
      case "accepted":
        return styles.statusProcessing;
      case "pending":
        return styles.statusPending;
      case "out_for_delivery":
        return styles.statusDelivery;
      default:
        return "";
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Recent Orders</h2>
          <p className={styles.subtitle}>Latest transactions and order status</p>
        </div>
        <Link href="/admin/orders" className={styles.viewAll}>
          View All Orders →
        </Link>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan="6" className={styles.emptyCell}>Loading recent orders...</td>
              </tr>
            )}

            {!isLoading && orders.length === 0 && (
              <tr>
                <td colSpan="6" className={styles.emptyCell}>No orders yet.</td>
              </tr>
            )}

            {!isLoading &&
              orders.map((order) => (
                <tr key={order.id || order.orderNumber}>
                  <td className={styles.orderId}>{order.orderNumber}</td>
                  <td>{order.customer}</td>
                  <td>{order.product}</td>
                  <td className={styles.amount}>{formatPrice(order.amount)}</td>
                  <td>
                    <span className={`${styles.status} ${getStatusClass(order.status)}`}>
                      {statusLabels[order.status] || order.status}
                    </span>
                  </td>
                  <td>{formatDate(order.date)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
