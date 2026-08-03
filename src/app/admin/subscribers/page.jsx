"use client";

import { useEffect, useMemo, useState } from "react";
import { Mail, RefreshCw, Search, Trash2, X } from "lucide-react";
import { deleteAdminSubscriber, fetchAdminSubscribers } from "@/lib/subscribersApi";
import styles from "./Subscribers.module.css";

function formatDate(date) {
  if (!date) return "-";
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);

  async function loadSubscribers() {
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      setSubscribers(await fetchAdminSubscribers());
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadSubscribers();
  }, []);

  const filteredSubscribers = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();
    if (!search) return subscribers;

    return subscribers.filter((subscriber) =>
      [subscriber.email, subscriber.source, subscriber.status]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(search))
    );
  }, [searchTerm, subscribers]);

  async function handleDelete() {
    if (!deleteTarget) return;

    setIsDeleting(true);
    setError("");
    setSuccess("");

    try {
      await deleteAdminSubscriber(deleteTarget._id);
      setSubscribers((current) =>
        current.filter((subscriber) => subscriber._id !== deleteTarget._id)
      );
      setDeleteTarget(null);
      setSuccess("Subscriber deleted successfully.");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Subscribers</h1>
          <p className={styles.subtitle}>Newsletter emails collected from website subscribe forms.</p>
        </div>
        <button type="button" className={styles.refreshBtn} onClick={loadSubscribers}>
          <RefreshCw aria-hidden="true" /> Refresh
        </button>
      </div>

      {error && <p className={styles.errorMessage}>{error}</p>}
      {success && <p className={styles.successMessage}>{success}</p>}

      <div className={styles.toolbar}>
        <div className={styles.search}>
          <Search className={styles.searchIcon} aria-hidden="true" />
          <input
            type="search"
            placeholder="Search subscribers..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className={styles.searchInput}
          />
        </div>
        <div className={styles.countBadge}>{filteredSubscribers.length} subscribers</div>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Email</th>
              <th>Source</th>
              <th>Status</th>
              <th>Subscribed At</th>
              <th>Confirmation Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan="6" className={styles.emptyCell}>Loading subscribers...</td>
              </tr>
            )}

            {!isLoading && filteredSubscribers.length === 0 && (
              <tr>
                <td colSpan="6" className={styles.emptyCell}>No subscribers found.</td>
              </tr>
            )}

            {!isLoading &&
              filteredSubscribers.map((subscriber) => (
                <tr key={subscriber._id}>
                  <td>
                    <div className={styles.emailCell}>
                      <span className={styles.emailIcon}><Mail aria-hidden="true" /></span>
                      <strong>{subscriber.email}</strong>
                    </div>
                  </td>
                  <td>{subscriber.source || "website"}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles[subscriber.status]}`}>
                      {subscriber.status}
                    </span>
                  </td>
                  <td>{formatDate(subscriber.subscribedAt || subscriber.createdAt)}</td>
                  <td>{subscriber.lastEmailSentAt ? formatDate(subscriber.lastEmailSentAt) : "Not sent"}</td>
                  <td>
                    <button
                      type="button"
                      className={styles.deleteBtn}
                      onClick={() => setDeleteTarget(subscriber)}
                      aria-label={`Delete ${subscriber.email}`}
                    >
                      <Trash2 aria-hidden="true" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {deleteTarget && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>Delete Subscriber</h2>
              <button
                type="button"
                className={styles.iconBtn}
                onClick={() => setDeleteTarget(null)}
                aria-label="Close"
              >
                <X aria-hidden="true" />
              </button>
            </div>
            <p>
              Are you sure you want to delete <strong>{deleteTarget.email}</strong> from subscribers?
            </p>
            <div className={styles.modalActions}>
              <button type="button" className={styles.cancelBtn} onClick={() => setDeleteTarget(null)}>
                Cancel
              </button>
              <button
                type="button"
                className={styles.deleteConfirmBtn}
                disabled={isDeleting}
                onClick={handleDelete}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
