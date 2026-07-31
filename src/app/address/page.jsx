"use client";

import { useEffect, useMemo, useState } from "react";
import AccountGuard from "@/components/account/AccountGuard";
import { useAuth } from "@/components/AuthProvider/AuthProvider";
import indianStates from "@/data/indianStates";
import styles from "@/components/account/AccountPages.module.css";

const emptyAddress = {
  pincode: "",
  addressLine1: "",
  addressLine2: "",
  landmark: "",
  city: "",
  state: "",
  isDefault: false,
};

export default function AddressPage() {
  const {
    user,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
  } = useAuth();
  const addresses = useMemo(() => user?.addresses || [], [user]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [form, setForm] = useState(emptyAddress);
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [pendingDelete, setPendingDelete] = useState(false);

  useEffect(() => {
    if (!modalOpen) {
      setEditingAddress(null);
      setForm(emptyAddress);
      setPendingDelete(false);
    }
  }, [modalOpen]);

  const openAddModal = () => {
    setStatus({ type: "", message: "" });
    setEditingAddress(null);
    setForm({
      ...emptyAddress,
      isDefault: addresses.length === 0,
    });
    setModalOpen(true);
  };

  const openEditModal = (address) => {
    setStatus({ type: "", message: "" });
    setEditingAddress(address);
    setForm({
      pincode: address.pincode || "",
      addressLine1: address.addressLine1 || "",
      addressLine2: address.addressLine2 || "",
      landmark: address.landmark || "",
      city: address.city || "",
      state: address.state || "",
      isDefault: Boolean(address.isDefault),
    });
    setModalOpen(true);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSaving(true);
    setStatus({ type: "", message: "" });

    try {
      const data = editingAddress
        ? await updateAddress(editingAddress._id, form)
        : await addAddress(form);

      setStatus({
        type: "success",
        message: data.message || "Address saved successfully.",
      });
      setModalOpen(false);
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Unable to save address.",
      });
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    if (!editingAddress) return;
    setIsSaving(true);
    setStatus({ type: "", message: "" });

    try {
      await deleteAddress(editingAddress._id);
      setModalOpen(false);
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Unable to delete address.",
      });
    } finally {
      setIsSaving(false);
    }
  }

  async function handleMakeDefault() {
    if (!editingAddress) return;
    setIsSaving(true);
    setStatus({ type: "", message: "" });

    try {
      await setDefaultAddress(editingAddress._id);
      setModalOpen(false);
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Unable to update default address.",
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <AccountGuard title="Address" subtitle="Add and manage your saved delivery addresses.">
      <div className={styles.toolbar}>
        <span className={styles.mutedText}>
          {addresses.length} {addresses.length === 1 ? "address" : "addresses"} saved
        </span>
        <button type="button" className={styles.primaryBtn} onClick={openAddModal}>
          Add Address
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className={styles.emptyPanel}>
          <h2>No Address Saved</h2>
          <p>Add a delivery address using the button above.</p>
        </div>
      ) : (
        <div className={styles.addressGrid}>
          {addresses.map((address) => (
            <button
              type="button"
              key={address._id}
              className={styles.card}
              onClick={() => openEditModal(address)}
            >
              <div className={styles.cardTop}>
                <span className={styles.cardTitle}>
                  {address.city}, {address.state}
                </span>
                {address.isDefault && <span className={styles.badge}>Default</span>}
              </div>
              <p className={styles.cardText}>
                {address.addressLine1}
                <br />
                {address.addressLine2}
                {address.landmark ? (
                  <>
                    <br />
                    Landmark: {address.landmark}
                  </>
                ) : null}
                <br />
                {address.pincode}
              </p>
            </button>
          ))}
        </div>
      )}

      {modalOpen && (
        <div className={styles.modalBackdrop} role="dialog" aria-modal="true">
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <div>
                <h2>{editingAddress ? "Edit Address" : "Add Address"}</h2>
                <p className={styles.mutedText}>
                  Fields marked with <b className={styles.required}>*</b> are required.
                </p>
              </div>
              <button type="button" className={styles.ghostBtn} onClick={() => setModalOpen(false)}>
                Close
              </button>
            </div>

            {status.message && (
              <p className={`${styles.status} ${styles[status.type]}`}>{status.message}</p>
            )}

            <form className={styles.form} onSubmit={handleSubmit}>
              <label className={styles.field}>
                <span>
                  Pincode <b className={styles.required}>*</b>
                </span>
                <input
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  inputMode="numeric"
                  pattern="[0-9]{6}"
                  placeholder="6 digits [0-9] PIN code"
                  required
                />
              </label>

              <label className={styles.field}>
                <span>
                  Flat, House no., Building, Company, Apartment <b className={styles.required}>*</b>
                </span>
                <input
                  name="addressLine1"
                  value={form.addressLine1}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className={styles.field}>
                <span>
                  Area, Street, Sector, Village <b className={styles.required}>*</b>
                </span>
                <input
                  name="addressLine2"
                  value={form.addressLine2}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className={styles.field}>
                <span>Landmark</span>
                <input
                  name="landmark"
                  value={form.landmark}
                  onChange={handleChange}
                  placeholder="E.g. near apollo hospital"
                />
              </label>

              <div className={styles.twoCol}>
                <label className={styles.field}>
                  <span>
                    Town/City <b className={styles.required}>*</b>
                  </span>
                  <input name="city" value={form.city} onChange={handleChange} required />
                </label>

                <label className={styles.field}>
                  <span>
                    State <b className={styles.required}>*</b>
                  </span>
                  <select name="state" value={form.state} onChange={handleChange} required>
                    <option value="">Choose a state</option>
                    {indianStates.map((state) => (
                      <option value={state} key={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className={styles.checkbox}>
                <input
                  name="isDefault"
                  type="checkbox"
                  checked={form.isDefault}
                  onChange={handleChange}
                />
                Make this my default delivery address
              </label>

              <div className={styles.modalActions}>
                <button type="submit" className={styles.primaryBtn} disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Address"}
                </button>

                {editingAddress && !editingAddress.isDefault && (
                  <button
                    type="button"
                    className={styles.secondaryBtn}
                    onClick={handleMakeDefault}
                    disabled={isSaving}
                  >
                    Make Default
                  </button>
                )}

                {editingAddress && (
                  <button
                    type="button"
                    className={styles.dangerBtn}
                    onClick={() => setPendingDelete(true)}
                    disabled={isSaving}
                  >
                    Delete
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {pendingDelete && (
        <div className={styles.modalBackdrop} role="dialog" aria-modal="true">
          <div className={`${styles.modal} ${styles.confirmModal}`}>
            <div className={styles.modalHeader}>
              <div>
                <h2>Delete Address?</h2>
                <p className={styles.confirmText}>
                  Are you sure you want to delete this address? This action cannot be undone.
                </p>
              </div>
            </div>
            <div className={styles.modalActions}>
              <button
                type="button"
                className={styles.dangerBtn}
                onClick={handleDelete}
                disabled={isSaving}
              >
                {isSaving ? "Deleting..." : "Delete Address"}
              </button>
              <button
                type="button"
                className={styles.ghostBtn}
                onClick={() => setPendingDelete(false)}
                disabled={isSaving}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </AccountGuard>
  );
}
