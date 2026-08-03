"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Eye,
  Percent,
  Plus,
  RefreshCw,
  Tag,
  Trash2,
  X,
} from "lucide-react";
import {
  createAdminVoucher,
  deleteAdminVoucher,
  fetchAdminVouchers,
  fetchVoucherUsages,
  updateAdminVoucher,
} from "@/lib/vouchersApi";
import styles from "./Vouchers.module.css";

const emptyForm = {
  code: "",
  discountPercent: "",
  neverExpires: false,
  expiresAt: "",
  isActive: true,
};

function formatDate(date) {
  if (!date) return "Never";
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function formatDateTime(date) {
  if (!date) return "-";
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

function formatPrice(amount) {
  return `₹ ${Number(amount || 0).toLocaleString("en-IN")}`;
}

function getExpiryValue(date) {
  if (!date) return "";
  return new Date(date).toISOString().slice(0, 10);
}

function isExpired(voucher) {
  return !voucher.neverExpires && voucher.expiresAt && new Date(voucher.expiresAt).getTime() < Date.now();
}

export default function VouchersPage() {
  const [vouchers, setVouchers] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingVoucher, setEditingVoucher] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [usageState, setUsageState] = useState({ voucher: null, usages: [] });
  const [isUsageOpen, setIsUsageOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUsageLoading, setIsUsageLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  async function loadVouchers() {
    setIsLoading(true);
    setStatus({ type: "", message: "" });

    try {
      setVouchers(await fetchAdminVouchers());
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadVouchers();
  }, []);

  const stats = useMemo(
    () => ({
      total: vouchers.length,
      active: vouchers.filter((voucher) => voucher.isActive && !isExpired(voucher)).length,
      used: vouchers.reduce((sum, voucher) => sum + Number(voucher.usageCount || voucher.usages?.length || 0), 0),
    }),
    [vouchers]
  );

  function resetForm() {
    setEditingVoucher(null);
    setForm(emptyForm);
  }

  function editVoucher(voucher) {
    setEditingVoucher(voucher);
    setForm({
      code: voucher.code || "",
      discountPercent: String(voucher.discountPercent || ""),
      neverExpires: Boolean(voucher.neverExpires),
      expiresAt: getExpiryValue(voucher.expiresAt),
      isActive: Boolean(voucher.isActive),
    });
  }

  function handleCodeChange(value) {
    setForm((current) => ({
      ...current,
      code: value.replace(/[^a-z0-9]/gi, "").toUpperCase().slice(0, 10),
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    const payload = {
      code: form.code,
      discountPercent: Number(form.discountPercent),
      neverExpires: form.neverExpires,
      expiresAt: form.neverExpires ? null : form.expiresAt,
      isActive: form.isActive,
    };

    try {
      if (editingVoucher) {
        const updatedVoucher = await updateAdminVoucher(editingVoucher._id, payload);
        setVouchers((current) =>
          current.map((voucher) => (voucher._id === updatedVoucher._id ? updatedVoucher : voucher))
        );
        setStatus({ type: "success", message: "Voucher updated successfully." });
      } else {
        const createdVoucher = await createAdminVoucher(payload);
        setVouchers((current) => [createdVoucher, ...current]);
        setStatus({ type: "success", message: `Voucher ${createdVoucher.code} created successfully.` });
      }

      resetForm();
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;

    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const updatedVoucher = await deleteAdminVoucher(deleteTarget._id);
      setVouchers((current) =>
        updatedVoucher
          ? current.map((voucher) => (voucher._id === updatedVoucher._id ? updatedVoucher : voucher))
          : current.filter((voucher) => voucher._id !== deleteTarget._id)
      );
      setDeleteTarget(null);
      setStatus({
        type: "success",
        message: updatedVoucher
          ? "Voucher has usage history, so it was deactivated."
          : "Voucher deleted successfully.",
      });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function openUsage(voucher) {
    setIsUsageOpen(true);
    setUsageState({ voucher, usages: [] });
    setIsUsageLoading(true);

    try {
      setUsageState(await fetchVoucherUsages(voucher._id));
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setIsUsageLoading(false);
    }
  }

  return (
    <div className={styles.vouchersPage}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Vouchers</h1>
          <p className={styles.subtitle}>Create percent based checkout vouchers and audit usage.</p>
        </div>
        <button type="button" className={styles.refreshBtn} onClick={loadVouchers}>
          <RefreshCw aria-hidden="true" /> Refresh
        </button>
      </div>

      {status.message && <p className={`${styles.status} ${styles[status.type]}`}>{status.message}</p>}

      <div className={styles.stats}>
        <div>
          <span>Total Vouchers</span>
          <strong>{stats.total}</strong>
        </div>
        <div>
          <span>Active</span>
          <strong>{stats.active}</strong>
        </div>
        <div>
          <span>Total Uses</span>
          <strong>{stats.used}</strong>
        </div>
      </div>

      <section className={styles.formCard}>
        <div className={styles.formHeader}>
          <div>
            <h2>{editingVoucher ? `Edit ${editingVoucher.code}` : "Create Voucher"}</h2>
            <p>
              Voucher codes must be unique, 6 to 10 characters, uppercase, and without spaces.
            </p>
          </div>
          {editingVoucher && (
            <button type="button" className={styles.cancelBtn} onClick={resetForm}>
              <X aria-hidden="true" /> Cancel Edit
            </button>
          )}
        </div>

        <form className={styles.formGrid} onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span>Voucher Code</span>
            <div className={styles.iconInput}>
              <Tag aria-hidden="true" />
              <input
                type="text"
                minLength="6"
                maxLength="10"
                pattern="[A-Z0-9]{6,10}"
                title="Use 6 to 10 uppercase letters or numbers without spaces"
                required
                value={form.code}
                onChange={(event) => handleCodeChange(event.target.value)}
                placeholder="GOKU10"
              />
            </div>
          </label>

          <label className={styles.field}>
            <span>Discount Percent</span>
            <div className={styles.iconInput}>
              <Percent aria-hidden="true" />
              <input
                type="number"
                min="1"
                max="100"
                required
                value={form.discountPercent}
                onChange={(event) =>
                  setForm((current) => ({ ...current, discountPercent: event.target.value }))
                }
                placeholder="10"
              />
            </div>
          </label>

          <label className={styles.toggleField}>
            <input
              type="checkbox"
              checked={form.neverExpires}
              onChange={(event) =>
                setForm((current) => ({ ...current, neverExpires: event.target.checked }))
              }
            />
            Never expires
          </label>

          {!form.neverExpires && (
            <label className={styles.field}>
              <span>Expiry Date</span>
              <div className={styles.iconInput}>
                <CalendarDays aria-hidden="true" />
                <input
                  type="date"
                  required
                  value={form.expiresAt}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, expiresAt: event.target.value }))
                  }
                />
              </div>
            </label>
          )}

          <label className={styles.field}>
            <span>Status</span>
            <select
              value={form.isActive ? "active" : "inactive"}
              onChange={(event) =>
                setForm((current) => ({ ...current, isActive: event.target.value === "active" }))
              }
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </label>

          <button type="submit" className={styles.saveBtn} disabled={isSubmitting}>
            <Plus aria-hidden="true" /> {isSubmitting ? "Saving..." : editingVoucher ? "Update Voucher" : "Create Voucher"}
          </button>
        </form>
      </section>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Voucher</th>
              <th>Discount</th>
              <th>Expiry</th>
              <th>Usage</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan="6" className={styles.emptyCell}>Loading vouchers...</td>
              </tr>
            )}

            {!isLoading && vouchers.length === 0 && (
              <tr>
                <td colSpan="6" className={styles.emptyCell}>No vouchers created yet.</td>
              </tr>
            )}

            {!isLoading &&
              vouchers.map((voucher) => (
                <tr key={voucher._id}>
                  <td>
                    <div className={styles.codeCell}>
                      <Tag aria-hidden="true" />
                      <strong>{voucher.code}</strong>
                    </div>
                  </td>
                  <td>{voucher.discountPercent}% off</td>
                  <td>{voucher.neverExpires ? "Never" : formatDate(voucher.expiresAt)}</td>
                  <td>{voucher.usageCount || voucher.usages?.length || 0}</td>
                  <td>
                    <span
                      className={`${styles.statusBadge} ${
                        voucher.isActive && !isExpired(voucher) ? styles.active : styles.inactive
                      }`}
                    >
                      {voucher.isActive && !isExpired(voucher) ? "Active" : isExpired(voucher) ? "Expired" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button type="button" className={styles.iconBtn} title="View usage" onClick={() => openUsage(voucher)}>
                        <Eye aria-hidden="true" />
                      </button>
                      <button type="button" className={styles.editBtn} onClick={() => editVoucher(voucher)}>
                        Edit
                      </button>
                      <button type="button" className={styles.deleteBtn} title="Delete" onClick={() => setDeleteTarget(voucher)}>
                        <Trash2 aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {deleteTarget && (
        <div className={styles.modalBackdrop} role="dialog" aria-modal="true">
          <div className={`${styles.modal} ${styles.smallModal}`}>
            <h2>Delete Voucher</h2>
            <p>
              Delete voucher <strong>{deleteTarget.code}</strong>? If it already has usage history,
              it will be deactivated instead so the audit trail stays available.
            </p>
            <div className={styles.modalActions}>
              <button type="button" className={styles.cancelBtn} onClick={() => setDeleteTarget(null)}>
                Cancel
              </button>
              <button type="button" className={styles.deleteConfirmBtn} onClick={handleDelete} disabled={isSubmitting}>
                Delete Voucher
              </button>
            </div>
          </div>
        </div>
      )}

      {isUsageOpen && (
        <div className={styles.modalBackdrop} role="dialog" aria-modal="true">
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <div>
                <h2>{usageState.voucher?.code || "Voucher"} Usage</h2>
                <p>Customers and orders where this voucher was used.</p>
              </div>
              <button type="button" className={styles.iconBtn} onClick={() => setIsUsageOpen(false)}>
                <X aria-hidden="true" />
              </button>
            </div>

            {isUsageLoading && <div className={styles.emptyPanel}>Loading usage...</div>}

            {!isUsageLoading && usageState.usages.length === 0 && (
              <div className={styles.emptyPanel}>No usage found for this voucher.</div>
            )}

            {!isUsageLoading && usageState.usages.length > 0 && (
              <div className={styles.usageList}>
                {usageState.usages.map((usage) => (
                  <article className={styles.usageCard} key={`${usage.order?.id || usage.usedAt}`}>
                    <div>
                      <span className={styles.muted}>Customer</span>
                      <h3>{usage.user.name || "Customer"}</h3>
                      <p>{usage.user.email}</p>
                      <p>{usage.user.mobile}</p>
                    </div>
                    <div>
                      <span className={styles.muted}>Order</span>
                      <h3>{usage.order?.orderNumber || "Order removed"}</h3>
                      <p>{formatDateTime(usage.usedAt)}</p>
                      <p>Total: {formatPrice(usage.order?.totals?.total)}</p>
                    </div>
                    <div className={styles.usageItems}>
                      <span className={styles.muted}>Items</span>
                      {usage.order?.items?.map((item) => (
                        <p key={`${item.slug}:${item.variantId}`}>
                          {item.name}
                          {item.variant ? ` (${item.variant})` : ""} - {item.quantity} qty
                        </p>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
