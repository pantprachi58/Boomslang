"use client";

import { useState, useEffect } from "react";
import DashboardCard from "@/components/admin/DashboardCard/DashboardCard";
import RecentOrders from "@/components/admin/RecentOrders/RecentOrders";
import SalesChart from "@/components/admin/SalesChart/SalesChart";
import styles from "./Dashboard.module.css";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0,
  });

  useEffect(() => {
    // Fetch dashboard stats
    // This would be replaced with actual API calls
    setStats({
      totalRevenue: 45280,
      totalOrders: 328,
      totalProducts: 12,
      totalCustomers: 1456,
    });
  }, []);

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1 className={styles.title}>Dashboard</h1>
        <p className={styles.subtitle}>Welcome back! Here's what's happening today.</p>
      </div>

      <div className={styles.statsGrid}>
        <DashboardCard
          title="Total Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          change="+12.5%"
          changeType="positive"
          icon="revenue"
        />
        <DashboardCard
          title="Total Orders"
          value={stats.totalOrders}
          change="+8.2%"
          changeType="positive"
          icon="orders"
        />
        <DashboardCard
          title="Total Products"
          value={stats.totalProducts}
          change="0%"
          changeType="neutral"
          icon="products"
        />
        <DashboardCard
          title="Total Customers"
          value={stats.totalCustomers.toLocaleString()}
          change="+15.3%"
          changeType="positive"
          icon="customers"
        />
      </div>

      <div className={styles.chartsSection}>
        <SalesChart />
      </div>

      <div className={styles.recentSection}>
        <RecentOrders />
      </div>
    </div>
  );
}
