import AdminSidebar from "@/components/admin/AdminSidebar/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader/AdminHeader";
import styles from "./AdminLayout.module.css";

export const metadata = {
  title: "Admin Panel - Boomslang Nutrition",
  description: "Manage your nutrition supplement store",
};

export default function AdminLayout({ children }) {
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
