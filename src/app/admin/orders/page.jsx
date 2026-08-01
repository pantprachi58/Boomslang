"use client";

import { useEffect, useMemo, useState } from "react";
import { EyeIcon } from "@/components/admin/icons/AdminIcons";
import { fetchAdminOrders, updateAdminOrderStatus } from "@/lib/ordersApi";
import styles from "./Orders.module.css";

const orderStatuses = ["pending", "accepted", "out_for_delivery", "delivered"];
const statusLabels = {
  pending: "Pending",
  accepted: "Accepted",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
};

function formatPrice(amount) {
  return `₹ ${Number(amount || 0).toLocaleString("en-IN")}`;
}

function getPaymentLabel(method) {
  return method === "cod" ? "COD" : "Online";
}

function getAmountDue(order) {
  return Math.max(Number(order?.totals?.total || 0) - Number(order?.payment?.paidAmount || 0), 0);
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

function getStatusClass(status) {
  switch (status) {
    case "delivered":
      return styles.statusCompleted;
    case "accepted":
      return styles.statusProcessing;
    case "out_for_delivery":
      return styles.statusDelivery;
    case "pending":
      return styles.statusPending;
    default:
      return "";
  }
}

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingOrderId, setUpdatingOrderId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let isCurrent = true;

    async function loadOrders() {
      setIsLoading(true);
      setError("");

      try {
        const nextOrders = await fetchAdminOrders(filterStatus);
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
  }, [filterStatus]);

  const stats = useMemo(
    () => ({
      total: orders.length,
      pending: orders.filter((order) => order.status === "pending").length,
      accepted: orders.filter((order) => order.status === "accepted").length,
      delivered: orders.filter((order) => order.status === "delivered").length,
    }),
    [orders]
  );

  const handleStatusChange = async (orderId, status) => {
    setUpdatingOrderId(orderId);
    setError("");

    try {
      const updatedOrder = await updateAdminOrderStatus(orderId, status);
      setOrders((current) =>
        current.map((order) => (order._id === orderId ? updatedOrder : order))
      );
      setSelectedOrder((current) => (current?._id === orderId ? updatedOrder : current));
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdatingOrderId("");
    }
  };

  return (
    <div className={styles.ordersPage}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Orders</h1>
          <p className={styles.subtitle}>Manage customer orders and delivery status</p>
        </div>
      </div>

      <div className={styles.toolbar}>
        <select
          value={filterStatus}
          onChange={(event) => setFilterStatus(event.target.value)}
          className={styles.filterSelect}
        >
          <option value="all">All Orders</option>
          {orderStatuses.map((status) => (
            <option value={status} key={status}>
              {statusLabels[status]}
            </option>
          ))}
        </select>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Total:</span>
            <span className={styles.statValue}>{stats.total}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Pending:</span>
            <span className={styles.statValue}>{stats.pending}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Accepted:</span>
            <span className={styles.statValue}>{stats.accepted}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Delivered:</span>
            <span className={styles.statValue}>{stats.delivered}</span>
          </div>
        </div>
      </div>

      {error && <p className={styles.errorMessage}>{error}</p>}

      <div className={styles.tableCard}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Quantity</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Date & Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan="9">
                    <div className={styles.loadingState}>Loading orders...</div>
                  </td>
                </tr>
              )}

              {!isLoading && orders.length === 0 && (
                <tr>
                  <td colSpan="9">
                    <div className={styles.loadingState}>No orders found.</div>
                  </td>
                </tr>
              )}

              {!isLoading &&
                orders.map((order) => (
                  <tr key={order._id}>
                    <td className={styles.orderId}>{order.orderNumber}</td>
                    <td>
                      <div className={styles.customerInfo}>
                        <div className={styles.customerName}>{order.customer.name}</div>
                        <div className={styles.customerEmail}>{order.customer.email}</div>
                        <div className={styles.customerEmail}>{order.customer.mobile}</div>
                      </div>
                    </td>
                    <td>
                      <div className={styles.productCell}>
                        {order.items.map((item) => (
                          <span key={`${item.slug}:${item.variantId}`}>
                            {item.name}
                            {item.variant ? ` (${item.variant})` : ""}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className={styles.quantity}>{order.totals.totalQuantity}</td>
                    <td className={styles.amount}>{formatPrice(order.totals.total)}</td>
                    <td>
                      <div className={styles.paymentCell}>
                        <strong>{getPaymentLabel(order.payment.method)}</strong>
                        <span>Paid {formatPrice(order.payment.paidAmount)}</span>
                        <span>UPI {order.payment.upiTransactionId}</span>
                      </div>
                    </td>
                    <td>
                      <select
                        className={`${styles.statusSelect} ${getStatusClass(order.status)}`}
                        value={order.status}
                        onChange={(event) => handleStatusChange(order._id, event.target.value)}
                        disabled={updatingOrderId === order._id}
                      >
                        {orderStatuses.map((status) => (
                          <option value={status} key={status}>
                            {statusLabels[status]}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <div className={styles.dateTime}>
                        <div>{formatDate(order.createdAt)}</div>
                      </div>
                    </td>
                    <td>
                      <div className={styles.actions}>
                        <button
                          type="button"
                          className={styles.viewBtn}
                          title="View details"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <EyeIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedOrder && (
        <div className={styles.modalBackdrop} role="dialog" aria-modal="true">
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <div>
                <h2>{selectedOrder.orderNumber}</h2>
                <p>{formatDate(selectedOrder.createdAt)}</p>
              </div>
              <button type="button" className={styles.closeBtn} onClick={() => setSelectedOrder(null)}>
                Close
              </button>
            </div>

            <div className={styles.detailGrid}>
              <section>
                <h3>Customer</h3>
                <p>{selectedOrder.customer.name}</p>
                <p>{selectedOrder.customer.email}</p>
                <p>{selectedOrder.customer.mobile}</p>
              </section>
              <section>
                <h3>Delivery Address</h3>
                <p>
                  {selectedOrder.deliveryAddress.addressLine1},{" "}
                  {selectedOrder.deliveryAddress.addressLine2}
                </p>
                {selectedOrder.deliveryAddress.landmark && (
                  <p>Landmark: {selectedOrder.deliveryAddress.landmark}</p>
                )}
                <p>
                  {selectedOrder.deliveryAddress.city}, {selectedOrder.deliveryAddress.state} -{" "}
                  {selectedOrder.deliveryAddress.pincode}
                </p>
              </section>
              <section>
                <h3>Payment</h3>
                <p>Method: {getPaymentLabel(selectedOrder.payment.method)}</p>
                <p>Paid: {formatPrice(selectedOrder.payment.paidAmount)}</p>
                <p>Due on delivery: {formatPrice(getAmountDue(selectedOrder))}</p>
                <p>UPI Transaction ID: {selectedOrder.payment.upiTransactionId}</p>
              </section>
              <section>
                <h3>Order Status</h3>
                <p>{statusLabels[selectedOrder.status]}</p>
                <p>Total quantity: {selectedOrder.totals.totalQuantity}</p>
              </section>
            </div>

            <div className={styles.detailItems}>
              {selectedOrder.items.map((item) => (
                <div key={`${item.slug}:${item.variantId}`} className={styles.detailItem}>
                  <span>
                    {item.name}
                    {item.variant ? ` (${item.variant})` : ""}
                  </span>
                  <strong>
                    {item.quantity} x {formatPrice(item.price)} = {formatPrice(item.lineTotal)}
                  </strong>
                </div>
              ))}
            </div>

            <div className={styles.totalBreakdown}>
              <div>
                <span>Subtotal</span>
                <strong>{formatPrice(selectedOrder.totals.subtotal)}</strong>
              </div>
              <div>
                <span>CGST (2.5%)</span>
                <strong>{formatPrice(selectedOrder.totals.cgst)}</strong>
              </div>
              <div>
                <span>SGST (2.5%)</span>
                <strong>{formatPrice(selectedOrder.totals.sgst)}</strong>
              </div>
              <div className={styles.detailTotal}>
                <span>Total</span>
                <strong>{formatPrice(selectedOrder.totals.total)}</strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
