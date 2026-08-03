"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider/AuthProvider";
import {
  DashboardIcon,
  PackageIcon,
  ShoppingCartIcon,
  UsersIcon,
  DocumentIcon,
  GlobeIcon,
  LogoutIcon,
  TagIcon,
  MailEnvelopeIcon,
} from "@/components/admin/icons/AdminIcons";
import { HamburgerIcon } from "@/components/icons/Icons";
import styles from "./AdminSidebar.module.css";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { name: "Dashboard", path: "/admin", Icon: DashboardIcon },
    { name: "Products", path: "/admin/products", Icon: PackageIcon },
    { name: "Ingredients", path: "/admin/ingredients", Icon: DocumentIcon },
    { name: "Orders", path: "/admin/orders", Icon: ShoppingCartIcon },
    { name: "Vouchers", path: "/admin/vouchers", Icon: TagIcon },
    { name: "Contacts", path: "/admin/contact-queries", Icon: MailEnvelopeIcon },
    { name: "Subscribers", path: "/admin/subscribers", Icon: MailEnvelopeIcon },
    { name: "Customers", path: "/admin/customers", Icon: UsersIcon },
    { name: "Blogs", path: "/admin/blog", Icon: DocumentIcon },
  ];

  return (
    <>
      <button 
        className={styles.mobileToggle}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle sidebar"
      >
        <HamburgerIcon />
      </button>

      <aside className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
        <div className={styles.logo}>
          <Link href="/admin">
            <Image
              src="/images/logo.png"
              alt="Boomslang Nutrition"
              width={160}
              height={80}
              className={styles.logoImg}
              priority
            />
          </Link>
          <span className={styles.adminBadge}>Admin Panel</span>
        </div>

        <nav className={styles.nav}>
          <ul className={styles.menuList}>
            {menuItems.map((item) => {
              const IconComponent = item.Icon;
              return (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={`${styles.menuItem} ${
                      pathname === item.path ? styles.active : ""
                    }`}
                  >
                    <span className={styles.icon}>
                      <IconComponent />
                    </span>
                    <span className={styles.label}>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.footer}>
          <Link href="/" className={styles.viewSite}>
            <GlobeIcon />
            <span>View Website</span>
          </Link>
          <button
            className={styles.logout}
            onClick={async () => {
              await logout();
              router.replace("/login");
              router.refresh();
            }}
          >
            <LogoutIcon />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {isOpen && (
        <div 
          className={styles.overlay}
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
