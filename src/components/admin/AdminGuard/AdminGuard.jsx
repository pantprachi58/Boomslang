"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader/AdminHeader";
import UnauthorizedPanel from "@/components/UnauthorizedPanel/UnauthorizedPanel";
import { useAuth } from "@/components/AuthProvider/AuthProvider";
import styles from "@/app/admin/AdminLayout.module.css";

export default function AdminGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isAdmin, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <main className={styles.guardPage}>
        <section className={styles.guardLoader} aria-live="polite">
          <div className={styles.guardDots} aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <p>{isLoading ? "Checking admin access" : "Redirecting to login"}</p>
        </section>
      </main>
    );
  }

  if (!isAdmin) {
    return <UnauthorizedPanel />;
  }

  return (
    <div className={styles.adminLayout}>
      <AdminSidebar />
      <div className={styles.mainContent}>
        <AdminHeader />
        <main className={styles.contentArea}>{children}</main>
      </div>
    </div>
  );
}
