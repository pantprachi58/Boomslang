"use client";

import { useState } from "react";
import styles from "./SalesChart.module.css";

export default function SalesChart() {
  const [period, setPeriod] = useState("week");

  // Mock data - replace with actual data
  const salesData = {
    week: [2400, 3200, 2800, 3600, 4200, 3800, 4500],
    month: [12000, 15000, 13500, 16800, 18200, 17500, 19800, 21000, 19500, 22000, 24500, 26000],
    year: [145000, 178000, 165000, 198000, 215000, 202000, 235000, 248000, 238000, 265000, 282000, 305000],
  };

  const labels = {
    week: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    year: ["2023 Q1", "2023 Q2", "2023 Q3", "2023 Q4", "2024 Q1", "2024 Q2", "2024 Q3", "2024 Q4"],
  };

  const currentData = salesData[period];
  const currentLabels = labels[period];
  const maxValue = Math.max(...currentData);

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
        <div className={styles.chart}>
          {currentData.map((value, index) => {
            const height = (value / maxValue) * 100;
            return (
              <div key={index} className={styles.barWrapper}>
                <div className={styles.barContainer}>
                  <div
                    className={styles.bar}
                    style={{ height: `${height}%` }}
                    title={`$${value.toLocaleString()}`}
                  >
                    <span className={styles.barValue}>${(value / 1000).toFixed(1)}k</span>
                  </div>
                </div>
                <span className={styles.label}>{currentLabels[index]}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
