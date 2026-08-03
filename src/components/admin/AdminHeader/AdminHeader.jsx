"use client";

import { useState } from "react";
import Link from "next/link";
import { BellIcon, LogoutIcon } from "@/components/admin/icons/AdminIcons";
import { UserIcon } from "@/components/icons/Icons";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider/AuthProvider";
import styles from "./AdminHeader.module.css";

export default function AdminHeader() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const displayName = user?.name || "Admin User";
  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const notifications = [
    { id: 1, text: "New order received (#1234)", time: "5 min ago", unread: true },
    { id: 2, text: "Product stock running low", time: "1 hour ago", unread: true },
    { id: 3, text: "New customer registered", time: "2 hours ago", unread: false },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.actions}>
        <div className={styles.notificationWrapper}>
          <button
            className={styles.iconButton}
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
          >
            <BellIcon />
            <span className={styles.badge}>3</span>
          </button>

          {showNotifications && (
            <div className={styles.dropdown}>
              <div className={styles.dropdownHeader}>
                <h3>Notifications</h3>
                <button className={styles.markAllRead}>Mark all as read</button>
              </div>
              <div className={styles.notificationList}>
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`${styles.notificationItem} ${
                      notif.unread ? styles.unread : ""
                    }`}
                  >
                    <p className={styles.notificationText}>{notif.text}</p>
                    <span className={styles.notificationTime}>{notif.time}</span>
                  </div>
                ))}
              </div>
              <div className={styles.dropdownFooter}>
                <button>View all notifications</button>
              </div>
            </div>
          )}
        </div>

        <div className={styles.profileWrapper}>
          <button
            className={styles.profileButton}
            onClick={() => setShowProfile(!showProfile)}
          >
            <div className={styles.avatar}>
              <span>{initials || "AD"}</span>
            </div>
            <div className={styles.profileInfo}>
              <span className={styles.profileName}>{displayName}</span>
              <span className={styles.profileRole}>Administrator</span>
            </div>
          </button>

          {showProfile && (
            <div className={styles.dropdown}>
              <Link href="/profile" className={styles.profileDropdownItem}>
                <UserIcon /> My Profile
              </Link>
              <hr className={styles.divider} />
              <button
                type="button"
                className={styles.profileDropdownItem}
                onClick={async () => {
                  await logout();
                  router.replace("/login");
                  router.refresh();
                }}
              >
                <LogoutIcon /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
