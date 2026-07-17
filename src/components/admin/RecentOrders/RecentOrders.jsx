"use client";

import { useState } from "react";
import Link from "next/link";
import { EyeIcon } from "@/components/admin/icons/AdminIcons";
import styles from "./RecentOrders.module.css";

export default function RecentOrders() {
  const [orders] = useState([
    {
      id: "#1234",
      customer: "John Doe",
      product: "Goku Gainz Pre-Workout",
      amount: "$89.99",
      status: "completed",
      date: "2024-01-15",
    },
    {
      id: "#1235",
      customer: "Jane Smith",
      product: "Ember Weight Gain",
      amount: "$129.99",
      status: "processing",
      date: "2024-01-15",
    },
    {
      id: "#1236",
      customer: "Mike Johnson",
      product: "Strycnnine Mango",
      amount: "$79.99",
      status: "pending",
      date: "2024-01-14",
    },
    {
      id: "#1237",
      customer: "Sarah Williams",
      product: "Goku Gainz Pre-Workout",
      amount: "$89.99",
      status: "completed",
      date: "2024-01-14",
    },
    {
      id: "#1238",
      customer: "David Brown",
      product: "Ember Weight Gain",
      amount: "$129.99",
      status: "cancelled",
      date: "2024-01-13",
    },
  ]);

  const getStatusClass = (status) => {
    switch (status) {
      case "completed":
        return styles.statusCompleted;
      case "processing":
        return styles.statusProcessing;
      case "pending":
        return styles.statusPending;
      case "cancelled":
        return styles.statusCancelled;
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className={styles.orderId}>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.product}</td>
                <td className={styles.amount}>{order.amount}</td>
                <td>
                  <span className={`${styles.status} ${getStatusClass(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td>{order.date}</td>
                <td>
                  <button className={styles.actionBtn} title="View details">
                    <EyeIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
