"use client";

import { useState } from "react";
import { SearchIcon } from "@/components/icons/Icons";
import { EyeIcon, MailEnvelopeIcon } from "@/components/admin/icons/AdminIcons";
import styles from "./Customers.module.css";

export default function CustomersPage() {
  const [customers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 234 567 8900",
      orders: 12,
      totalSpent: "$1,248.88",
      joined: "2023-05-15",
      status: "active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1 234 567 8901",
      orders: 8,
      totalSpent: "$892.34",
      joined: "2023-06-20",
      status: "active",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "+1 234 567 8902",
      orders: 5,
      totalSpent: "$456.78",
      joined: "2023-08-10",
      status: "active",
    },
    {
      id: 4,
      name: "Sarah Williams",
      email: "sarah@example.com",
      phone: "+1 234 567 8903",
      orders: 15,
      totalSpent: "$1,876.45",
      joined: "2023-03-25",
      status: "vip",
    },
    {
      id: 5,
      name: "David Brown",
      email: "david@example.com",
      phone: "+1 234 567 8904",
      orders: 2,
      totalSpent: "$189.98",
      joined: "2024-01-05",
      status: "inactive",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusClass = (status) => {
    switch (status) {
      case "active":
        return styles.statusActive;
      case "vip":
        return styles.statusVip;
      case "inactive":
        return styles.statusInactive;
      default:
        return "";
    }
  };

  return (
    <div className={styles.customersPage}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Customers</h1>
          <p className={styles.subtitle}>Manage your customer database</p>
        </div>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.search}>
          <span className={styles.searchIcon}>
            <SearchIcon />
          </span>
          <input
            type="search"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Total Customers:</span>
            <span className={styles.statValue}>{customers.length}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>VIP:</span>
            <span className={styles.statValue}>
              {customers.filter((c) => c.status === "vip").length}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Contact</th>
                <th>Orders</th>
                <th>Total Spent</th>
                <th>Joined</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>
                    <div className={styles.customerInfo}>
                      <div className={styles.avatar}>
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <div className={styles.customerName}>{customer.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={styles.contact}>
                      <div>{customer.email}</div>
                      <div className={styles.phone}>{customer.phone}</div>
                    </div>
                  </td>
                  <td className={styles.orders}>{customer.orders}</td>
                  <td className={styles.totalSpent}>{customer.totalSpent}</td>
                  <td>{customer.joined}</td>
                  <td>
                    <span className={`${styles.status} ${getStatusClass(customer.status)}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button className={styles.viewBtn} title="View details">
                        <EyeIcon />
                      </button>
                      <button className={styles.emailBtn} title="Send email">
                        <MailEnvelopeIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
