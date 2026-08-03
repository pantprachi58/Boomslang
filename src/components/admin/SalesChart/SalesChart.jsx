"use client";

import { useState } from "react";
import styles from "./SalesChart.module.css";

const emptySeries = {
  week: [],
  month: [],
  year: [],
};

function formatPrice(amount) {
  return `₹ ${Number(amount || 0).toLocaleString("en-IN")}`;
}

function formatShortPrice(amount) {
  const value = Number(amount || 0);
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(1)}k`;
  return `₹${value}`;
}

export default function SalesChart({ data = emptySeries, isLoading = false }) {
  const [period, setPeriod] = useState("week");

  const currentData = data?.[period] || [];
  const maxValue = Math.max(...currentData.map((item) => Number(item.value || 0)), 1);

  return (
    <div className={styles.chartCard}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Sales Overview</h2>
          <p className={styles.subtitle}>Track your sales performance</p>
        </div>
        <div className={styles.periodSelector}>
          <button
            className={`${styles.periodBtn} ${period === "week" ? styles.active : ""}`}
            onClick={() => setPeriod("week")}
          >
            Week
          </button>
          <button
            className={`${styles.periodBtn} ${period === "month" ? styles.active : ""}`}
            onClick={() => setPeriod("month")}
          >
            Month
          </button>
          <button
            className={`${styles.periodBtn} ${period === "year" ? styles.active : ""}`}
            onClick={() => setPeriod("year")}
          >
            Year
          </button>
        </div>
      </div>

      <div className={styles.chartContainer}>
        {isLoading ? (
          <div className={styles.emptyChart}>Loading sales data...</div>
        ) : currentData.length === 0 ? (
          <div className={styles.emptyChart}>No sales data available.</div>
        ) : (
          <div className={styles.chart}>
            {currentData.map((item) => {
              const value = Number(item.value || 0);
              const height = Math.max((value / maxValue) * 100, value > 0 ? 8 : 0);
              return (
                <div key={item.key || item.label} className={styles.barWrapper}>
                  <div className={styles.barContainer}>
                    <div
                      className={styles.bar}
                      style={{ height: `${height}%` }}
                      title={formatPrice(value)}
                    >
                      <span className={styles.barValue}>{formatShortPrice(value)}</span>
                    </div>
                  </div>
                  <span className={styles.label}>{item.label}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
