"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Eye,
  Mail,
  Phone,
  RefreshCw,
  Search,
  Trash2,
  X,
} from "lucide-react";
import {
  deleteAdminContactQuery,
  fetchAdminContactQueries,
} from "@/lib/contactApi";
import styles from "./ContactQueries.module.css";

const pageSize = 20;

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

function truncate(value, length = 90) {
  if (!value) return "-";
  return value.length > length ? `${value.slice(0, length)}...` : value;
}

export default function ContactQueriesPage() {
  const [queries, setQueries] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: pageSize, total: 0, pages: 1 });
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  async function loadQueries(page = 1, search = submittedSearch) {
    setIsLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetchAdminContactQueries({
        page,
        limit: pageSize,
        search: search || undefined,
      });
      setQueries(response.queries);
      setPagination(response.pagination);
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadQueries(1, "");
  }, []);

  const stats = useMemo(
    () => ({
      total: pagination.total || 0,
      emailSent: queries.filter((query) => query.emailSent).length,
      emailPending: queries.filter((query) => !query.emailSent).length,
    }),
    [pagination.total, queries]
  );

  function handleSearch(event) {
    event.preventDefault();
    const search = searchTerm.trim();
    setSubmittedSearch(search);
    loadQueries(1, search);
  }

  async function handleDelete() {
    if (!deleteTarget) return;

    setIsDeleting(true);
    setStatus({ type: "", message: "" });

    try {
      await deleteAdminContactQuery(deleteTarget._id);
      setQueries((current) => current.filter((query) => query._id !== deleteTarget._id));
      setPagination((current) => ({
        ...current,
        total: Math.max(Number(current.total || 0) - 1, 0),
      }));
      if (selectedQuery?._id === deleteTarget._id) {
        setSelectedQuery(null);
      }
      setDeleteTarget(null);
      setStatus({ type: "success", message: "Contact query deleted successfully." });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Contacts</h1>
          <p className={styles.subtitle}>Review customer support messages submitted from the website contact form.</p>
        </div>
        <button type="button" className={styles.refreshBtn} onClick={() => loadQueries(pagination.page)}>
          <RefreshCw aria-hidden="true" /> Refresh
        </button>
      </div>

      {status.message && <p className={`${styles.status} ${styles[status.type]}`}>{status.message}</p>}

      <div className={styles.stats}>
        <div>
          <span>Total Contacts</span>
          <strong>{stats.total}</strong>
        </div>
        <div>
          <span>Email Sent</span>
          <strong>{stats.emailSent}</strong>
        </div>
        <div>
          <span>Email Pending</span>
          <strong>{stats.emailPending}</strong>
        </div>
      </div>

      <form className={styles.toolbar} onSubmit={handleSearch}>
        <div className={styles.search}>
          <Search className={styles.searchIcon} aria-hidden="true" />
          <input
            type="search"
            placeholder="Search name, email, phone, subject..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className={styles.searchInput}
          />
        </div>
        <button type="submit" className={styles.searchBtn}>Search</button>
      </form>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Phone</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Email</th>
              <th>Submitted</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan="7" className={styles.emptyCell}>Loading contacts...</td>
              </tr>
            )}

            {!isLoading && queries.length === 0 && (
              <tr>
                <td colSpan="7" className={styles.emptyCell}>No contacts found.</td>
              </tr>
            )}

            {!isLoading &&
              queries.map((query) => (
                <tr key={query._id}>
                  <td>
                    <div className={styles.customerCell}>
                      <div>
                        <strong>{query.name}</strong>
                        <span>{query.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>{query.phone || "-"}</td>
                  <td><strong>{query.subject}</strong></td>
                  <td>{truncate(query.message)}</td>
                  <td>
                    <span className={`${styles.emailBadge} ${query.emailSent ? styles.sent : styles.pending}`}>
                      {query.emailSent ? "Sent" : "Pending"}
                    </span>
                  </td>
                  <td>{formatDate(query.createdAt)}</td>
                  <td>
                    <div className={styles.actions}>
                      <button
                        type="button"
                        className={styles.viewBtn}
                        onClick={() => setSelectedQuery(query)}
                        aria-label={`View ${query.subject}`}
                      >
                        <Eye aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        className={styles.deleteBtn}
                        onClick={() => setDeleteTarget(query)}
                        aria-label={`Delete ${query.subject}`}
                      >
                        <Trash2 aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <button
          type="button"
          className={styles.pageBtn}
          disabled={pagination.page <= 1 || isLoading}
          onClick={() => loadQueries(pagination.page - 1)}
        >
          Previous
        </button>
        <span>
          Page {pagination.page || 1} of {pagination.pages || 1}
        </span>
        <button
          type="button"
          className={styles.pageBtn}
          disabled={pagination.page >= pagination.pages || isLoading}
          onClick={() => loadQueries(pagination.page + 1)}
        >
          Next
        </button>
      </div>

      {selectedQuery && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <div>
                <h2>{selectedQuery.subject}</h2>
                <p>{formatDate(selectedQuery.createdAt)}</p>
              </div>
              <button
                type="button"
                className={styles.iconBtn}
                onClick={() => setSelectedQuery(null)}
                aria-label="Close"
              >
                <X aria-hidden="true" />
              </button>
            </div>

            <div className={styles.detailGrid}>
              <div className={styles.detailCard}>
                <Mail aria-hidden="true" />
                <span>Name</span>
                <strong>{selectedQuery.name}</strong>
              </div>
              <div className={styles.detailCard}>
                <Mail aria-hidden="true" />
                <span>Email</span>
                <strong>{selectedQuery.email}</strong>
              </div>
              <div className={styles.detailCard}>
                <Phone aria-hidden="true" />
                <span>Phone</span>
                <strong>{selectedQuery.phone || "-"}</strong>
              </div>
            </div>

            <div className={styles.messageBox}>
              <h3>Message</h3>
              <p>{selectedQuery.message}</p>
            </div>

            <div className={styles.metaGrid}>
              <div>
                <span>Email Status</span>
                <strong>{selectedQuery.emailSent ? "Sent" : "Pending"}</strong>
              </div>
              <div>
                <span>Email Sent At</span>
                <strong>{formatDate(selectedQuery.emailSentAt)}</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className={styles.modalBackdrop}>
          <div className={`${styles.modal} ${styles.smallModal}`}>
            <div className={styles.modalHeader}>
              <h2>Delete Contact</h2>
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
              Are you sure you want to delete the contact from <strong>{deleteTarget.name}</strong>?
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
