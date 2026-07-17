"use client";

import { useState } from "react";
import { EyeIcon, PrintIcon } from "@/components/admin/icons/AdminIcons";
import styles from "./Orders.module.css";

export default function OrdersPage() {
  const [orders] = useState([
    {
      id: "#1234",
      customer: "John Doe",
      email: "john@example.com",
      product: "Goku Gainz Pre-Workout",
      quantity: 2,
      amount: "$179.98",
      status: "completed",
      date: "2024-01-15",
      time: "10:30 AM",
    },
    {
      id: "#1235",
      customer: "Jane Smith",
      email: "jane@example.com",
      product: "Ember Weight Gain",
      quantity: 1,
      amount: "$129.99",
      status: "processing",
      date: "2024-01-15",
      time: "09:15 AM",
    },
    {
      id: "#1236",
      customer: "Mike Johnson",
      email: "mike@example.com",
      product: "Strycnnine Mango",
      quantity: 3,
      amount: "$239.97",
      status: "pending",
      date: "2024-01-14",
      time: "04:20 PM",
    },
    {
      id: "#1237",
      customer: "Sarah Williams",
      email: "sarah@example.com",
      product: "Goku Gainz Pre-Workout",
      quantity: 1,
      amount: "$89.99",
      status: "completed",
      date: "2024-01-14",
      time: "02:45 PM",
    },
    {
      id: "#1238",
      customer: "David Brown",
      email: "david@example.com",
      product: "Ember Weight Gain",
      quantity: 2,
      amount: "$259.98",
      status: "cancelled",
      date: "2024-01-13",
      time: "11:00 AM",
    },
  ]);

  const [filterStatus, setFilterStatus] = useState("all");

  const filteredOrders = orders.filter((order) => {
    return filterStatus === "all" || order.status === filterStatus;
  });

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
    <div className={styles.ordersPage}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Orders</h1>
          <p className={styles.subtitle}>Manage customer orders and transactions</p>
        </div>
      </div>

      <div className={styles.toolbar}>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="all">All Orders</option>
          <option value="completed">Completed</option>
          <option value="processing">Processing</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Total:</span>
            <span className={styles.statValue}>{orders.length}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Pending:</span>
            <span className={styles.statValue}>
              {orders.filter((o) => o.status === "pending").length}
            </span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Processing:</span>
            <span className={styles.statValue}>
              {orders.filter((o) => o.status === "processing").length}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date & Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className={styles.orderId}>{order.id}</td>
                  <td>
                    <div className={styles.customerInfo}>
                      <div className={styles.customerName}>{order.customer}</div>
                      <div className={styles.customerEmail}>{order.email}</div>
                    </div>
                  </td>
                  <td>{order.product}</td>
                  <td className={styles.quantity}>{order.quantity}</td>
                  <td className={styles.amount}>{order.amount}</td>
                  <td>
                    <span className={`${styles.status} ${getStatusClass(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <div className={styles.dateTime}>
                      <div>{order.date}</div>
                      <div className={styles.time}>{order.time}</div>
                    </div>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button className={styles.viewBtn} title="View details">
                        <EyeIcon />
                      </button>
                      <button className={styles.printBtn} title="Print invoice">
                        <PrintIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
