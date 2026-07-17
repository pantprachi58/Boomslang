"use client";

import { useState } from "react";
import { SearchIcon } from "@/components/icons/Icons";
import { BellIcon, HelpIcon, SettingsIcon, LogoutIcon } from "@/components/admin/icons/AdminIcons";
import { UserIcon } from "@/components/icons/Icons";
import styles from "./AdminHeader.module.css";

export default function AdminHeader() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notifications = [
    { id: 1, text: "New order received (#1234)", time: "5 min ago", unread: true },
    { id: 2, text: "Product stock running low", time: "1 hour ago", unread: true },
    { id: 3, text: "New customer registered", time: "2 hours ago", unread: false },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.searchBar}>
        <span className={styles.searchIcon}>
          <SearchIcon />
        </span>
        <input
          type="search"
          placeholder="Search products, orders, customers..."
          className={styles.searchInput}
        />
      </div>

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
              <span>AD</span>
            </div>
            <div className={styles.profileInfo}>
              <span className={styles.profileName}>Admin User</span>
              <span className={styles.profileRole}>Administrator</span>
            </div>
          </button>

          {showProfile && (
            <div className={styles.dropdown}>
              <div className={styles.profileDropdownItem}>
                <UserIcon /> My Profile
              </div>
              <div className={styles.profileDropdownItem}>
                <SettingsIcon /> Settings
              </div>
              <div className={styles.profileDropdownItem}>
                <HelpIcon /> Help & Support
              </div>
              <hr className={styles.divider} />
              <div className={styles.profileDropdownItem}>
                <LogoutIcon /> Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
