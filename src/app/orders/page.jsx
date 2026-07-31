"use client";

import AccountGuard from "@/components/account/AccountGuard";
import styles from "@/components/account/AccountPages.module.css";

export default function OrdersPage() {
  return (
    <AccountGuard title="Orders" subtitle="Your recent purchases will appear here.">
      <div className={styles.emptyPanel}>
        <h2>No Orders Yet</h2>
        <p>Orders are not connected yet. Once we add order history, this page will show it.</p>
      </div>
    </AccountGuard>
  );
}
