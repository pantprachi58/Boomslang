"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { KeyRound, LogOut, MapPin, ShoppingBag, UserRound } from "lucide-react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useAuth } from "@/components/AuthProvider/AuthProvider";
import styles from "./AccountPages.module.css";

export default function AccountGuard({ title, subtitle, children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading, logout } = useAuth();
  const [confirmLogout, setConfirmLogout] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  const handleLogout = () => {
    logout();
    setConfirmLogout(false);
    router.replace("/");
    router.refresh();
  };

  if (isLoading || !isAuthenticated) {
    return (
      <>
        <Header />
        <main className={styles.page}>
          <section className={styles.loadingPanel} aria-live="polite">
            <div className={styles.loadingSpinner} aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <p>Loading your account</p>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className={styles.page}>
        <div className={styles.shell}>
          <aside className={styles.sidebar}>
            <Link href="/profile" className={styles.sideLink}>
              <UserRound aria-hidden="true" />
              Profile
            </Link>
            <Link href="/orders" className={styles.sideLink}>
              <ShoppingBag aria-hidden="true" />
              Orders
            </Link>
            <Link href="/address" className={styles.sideLink}>
              <MapPin aria-hidden="true" />
              Address
            </Link>
            <Link href="/change-password" className={styles.sideLink}>
              <KeyRound aria-hidden="true" />
              Change Password
            </Link>
            <button type="button" className={styles.sideButton} onClick={() => setConfirmLogout(true)}>
              <LogOut aria-hidden="true" />
              Logout
            </button>
          </aside>

          <section className={styles.content}>
            <div className={styles.heading}>
              <div>
                <h1>{title}</h1>
                {subtitle && <p>{subtitle}</p>}
              </div>
            </div>
            {children}
          </section>
        </div>
      </main>
      {confirmLogout && (
        <div className={styles.modalBackdrop} role="dialog" aria-modal="true">
          <div className={`${styles.modal} ${styles.confirmModal}`}>
            <div className={styles.modalHeader}>
              <div>
                <h2>Logout?</h2>
                <p className={styles.confirmText}>
                  Are you sure you want to sign out of your account?
                </p>
              </div>
            </div>
            <div className={styles.modalActions}>
              <button type="button" className={styles.dangerBtn} onClick={handleLogout}>
                Logout
              </button>
              <button
                type="button"
                className={styles.ghostBtn}
                onClick={() => setConfirmLogout(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
