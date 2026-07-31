import AdminGuard from "@/components/admin/AdminGuard/AdminGuard";

export const metadata = {
  title: "Admin Panel - Boomslang Nutrition",
  description: "Manage your nutrition supplement store",
};

export default function AdminLayout({ children }) {
  return <AdminGuard>{children}</AdminGuard>;
}
