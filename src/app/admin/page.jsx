"use client";

import { useEffect, useState } from "react";
import DashboardCard from "@/components/admin/DashboardCard/DashboardCard";
import RecentOrders from "@/components/admin/RecentOrders/RecentOrders";
import { fetchAdminDashboard } from "@/lib/dashboardApi";
import styles from "./Dashboard.module.css";

function formatPrice(amount) {
  return `₹ ${Number(amount || 0).toLocaleString("en-IN")}`;
}

export default function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isCurrent = true;

    async function loadDashboard() {
      setIsLoading(true);
      setError("");

      try {
        const data = await fetchAdminDashboard();
        if (isCurrent) setDashboard(data);
      } catch (err) {
        if (isCurrent) setError(err.message);
      } finally {
        if (isCurrent) setIsLoading(false);
      }
    }

    loadDashboard();

    return () => {
      isCurrent = false;
    };
  }, []);

  const stats = dashboard?.stats || {
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0,
    todayOrders: 0,
    monthRevenue: 0,
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1 className={styles.title}>Dashboard</h1>
        <p className={styles.subtitle}>Welcome back! Here's what's happening today.</p>
      </div>

      {error && <p className={styles.errorMessage}>{error}</p>}

      <div className={styles.statsGrid}>
        <DashboardCard
          title="Total Revenue"
          value={isLoading ? "Loading..." : formatPrice(stats.totalRevenue)}
          icon="revenue"
        />
        <DashboardCard
          title="Total Orders"
          value={isLoading ? "Loading..." : stats.totalOrders}
          icon="orders"
        />
        <DashboardCard
          title="Total Products"
          value={isLoading ? "Loading..." : stats.totalProducts}
          icon="products"
        />
        <DashboardCard
          title="Total Customers"
          value={isLoading ? "Loading..." : stats.totalCustomers.toLocaleString("en-IN")}
          icon="customers"
        />
      </div>

      <div className={styles.recentSection}>
        <RecentOrders orders={(dashboard?.recentOrders || []).slice(0, 10)} isLoading={isLoading} />
      </div>
    </div>
  );
}
