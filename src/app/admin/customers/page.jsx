"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Eye,
  Mail,
  MapPin,
  Phone,
  RefreshCw,
  Search,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import { fetchAdminCustomers } from "@/lib/customersApi";
import styles from "./Customers.module.css";

const pageSize = 20;

function formatDate(date) {
  if (!date) return "-";
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function formatPrice(amount) {
  return `₹ ${Number(amount || 0).toLocaleString("en-IN")}`;
}

function formatAddress(address) {
  if (!address) return "No address saved";
  return [
    address.addressLine1,
    address.addressLine2,
    address.landmark ? `Landmark: ${address.landmark}` : null,
    `${address.city}, ${address.state} - ${address.pincode}`,
  ].filter(Boolean).join(", ");
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: pageSize, total: 0, pages: 1 });
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadCustomers(page = 1, search = submittedSearch) {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetchAdminCustomers({
        page,
        limit: pageSize,
        search: search || undefined,
      });
      setCustomers(response.customers);
      setPagination(response.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadCustomers(1, "");
  }, []);

  const stats = useMemo(
    () => ({
      total: pagination.total || 0,
      verified: customers.filter((customer) => customer.isEmailVerified).length,
    }),
    [customers, pagination.total]
  );

  function handleSearch(event) {
    event.preventDefault();
    const search = searchTerm.trim();
    setSubmittedSearch(search);
    loadCustomers(1, search);
  }

  return (
    <div className={styles.customersPage}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Customers</h1>
          <p className={styles.subtitle}>View registered users and customer order value.</p>
        </div>
        <button type="button" className={styles.refreshBtn} onClick={() => loadCustomers(pagination.page)}>
          <RefreshCw aria-hidden="true" /> Refresh
        </button>
      </div>

      {error && <p className={styles.errorMessage}>{error}</p>}

      <div className={styles.statsGrid}>
        <div>
          <span>Total Customers</span>
          <strong>{stats.total}</strong>
        </div>
        <div>
          <span>Mail Verified</span>
          <strong>{stats.verified}</strong>
        </div>
      </div>

      <form className={styles.toolbar} onSubmit={handleSearch}>
        <div className={styles.search}>
          <Search className={styles.searchIcon} aria-hidden="true" />
          <input
            type="search"
            placeholder="Search name, email or mobile..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className={styles.searchInput}
          />
        </div>
        <button type="submit" className={styles.searchBtn}>Search</button>
      </form>

      <div className={styles.tableCard}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Contact</th>
                <th>Orders</th>
                <th>Total Spent</th>
                <th>Latest Order</th>
                <th>Joined</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan="8" className={styles.emptyCell}>Loading customers...</td>
                </tr>
              )}

              {!isLoading && customers.length === 0 && (
                <tr>
                  <td colSpan="8" className={styles.emptyCell}>No customers found.</td>
                </tr>
              )}

              {!isLoading && customers.map((customer) => (
                <tr key={customer._id}>
                  <td>
                    <div className={styles.customerInfo}>
                      <div className={styles.avatar}>
                        {(customer.name || customer.email || "C").charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className={styles.customerName}>{customer.name || "Customer"}</div>
                        <div className={styles.addressCount}>{customer.addressCount} saved address{customer.addressCount === 1 ? "" : "es"}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={styles.contact}>
                      <div>{customer.email}</div>
                      <div className={styles.phone}>{customer.mobile || "-"}</div>
                    </div>
                  </td>
                  <td className={styles.orders}>{customer.orders || 0}</td>
                  <td className={styles.totalSpent}>{formatPrice(customer.totalSpent)}</td>
                  <td>{formatDate(customer.latestOrderAt)}</td>
                  <td>{formatDate(customer.joinedAt)}</td>
                  <td>
                    <span
                      className={`${styles.status} ${
                        customer.isEmailVerified ? styles.statusActive : styles.statusUnverified
                      }`}
                    >
                      {customer.isEmailVerified ? "Mail Verified" : "Mail Pending"}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button
                        type="button"
                        className={styles.viewBtn}
                        title="View details"
                        onClick={() => setSelectedCustomer(customer)}
                      >
                        <Eye aria-hidden="true" />
                      </button>
                      <a
                        className={styles.emailBtn}
                        href={`mailto:${customer.email}`}
                        title="Send email"
                      >
                        <Mail aria-hidden="true" />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.pagination}>
        <button
          type="button"
          className={styles.pageBtn}
          disabled={pagination.page <= 1 || isLoading}
          onClick={() => loadCustomers(pagination.page - 1)}
        >
          Previous
        </button>
        <span>Page {pagination.page || 1} of {pagination.pages || 1}</span>
        <button
          type="button"
          className={styles.pageBtn}
          disabled={pagination.page >= pagination.pages || isLoading}
          onClick={() => loadCustomers(pagination.page + 1)}
        >
          Next
        </button>
      </div>

      {selectedCustomer && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <div>
                <h2>{selectedCustomer.name || "Customer"}</h2>
                <p>Joined {formatDate(selectedCustomer.joinedAt)}</p>
              </div>
              <button
                type="button"
                className={styles.iconBtn}
                onClick={() => setSelectedCustomer(null)}
                aria-label="Close"
              >
                <X aria-hidden="true" />
              </button>
            </div>

            <div className={styles.detailGrid}>
              <div className={styles.detailCard}>
                <User aria-hidden="true" />
                <span>Name</span>
                <strong>{selectedCustomer.name || "-"}</strong>
              </div>
              <div className={styles.detailCard}>
                <Mail aria-hidden="true" />
                <span>Email</span>
                <strong>{selectedCustomer.email}</strong>
              </div>
              <div className={styles.detailCard}>
                <Phone aria-hidden="true" />
                <span>Mobile</span>
                <strong>{selectedCustomer.mobile || "-"}</strong>
              </div>
              <div className={styles.detailCard}>
                <ShoppingBag aria-hidden="true" />
                <span>Orders</span>
                <strong>{selectedCustomer.orders || 0}</strong>
              </div>
              <div className={styles.detailCard}>
                <ShoppingBag aria-hidden="true" />
                <span>Total Spent</span>
                <strong>{formatPrice(selectedCustomer.totalSpent)}</strong>
              </div>
              <div className={styles.detailCard}>
                <MapPin aria-hidden="true" />
                <span>Addresses</span>
                <strong>{selectedCustomer.addressCount || 0}</strong>
              </div>
            </div>

            <div className={styles.addressPanel}>
              <h3>Saved Addresses</h3>
              {selectedCustomer.addresses?.length ? (
                <div className={styles.addressList}>
                  {selectedCustomer.addresses.map((address) => (
                    <div className={styles.addressCard} key={address._id}>
                      <strong>{address.isDefault ? "Default Address" : "Address"}</strong>
                      <p>{formatAddress(address)}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={styles.emptyAddress}>No saved addresses.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
