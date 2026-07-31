"use client";

import { useEffect, useState } from "react";
import AccountGuard from "@/components/account/AccountGuard";
import { useAuth } from "@/components/AuthProvider/AuthProvider";
import styles from "@/components/account/AccountPages.module.css";

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        mobile: user.mobile || "",
      });
    }
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSaving(true);
    setStatus({ type: "", message: "" });

    try {
      const data = await updateProfile({
        firstName: form.firstName,
        lastName: form.lastName,
        mobile: form.mobile,
      });

      setStatus({
        type: "success",
        message: data.message || "Profile updated successfully.",
      });
      setIsEditing(false);
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Unable to update profile.",
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <AccountGuard
      title="Profile"
      subtitle="View and manage your Boomslang Nutrition account details."
    >
      <div className={styles.toolbar}>
        <span className={styles.mutedText}>Email cannot be changed from profile.</span>
        {!isEditing && (
          <button type="button" className={styles.primaryBtn} onClick={() => setIsEditing(true)}>
            Edit
          </button>
        )}
      </div>

      {status.message && (
        <p className={`${styles.status} ${styles[status.type]}`}>{status.message}</p>
      )}

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.twoCol}>
          <label className={styles.field}>
            <span>
              First Name <b className={styles.required}>*</b>
            </span>
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              disabled={!isEditing}
              required
            />
          </label>
          <label className={styles.field}>
            <span>
              Last Name <b className={styles.required}>*</b>
            </span>
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              disabled={!isEditing}
              required
            />
          </label>
        </div>

        <label className={styles.field}>
          <span>Email</span>
          <input value={form.email} disabled />
        </label>

        <label className={styles.field}>
          <span>
            Mobile Number <b className={styles.required}>*</b>
          </span>
          <input
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            disabled={!isEditing}
            required
          />
        </label>

        {isEditing && (
          <div className={styles.formActions}>
            <button type="submit" className={styles.primaryBtn} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Profile"}
            </button>
            <button
              type="button"
              className={styles.ghostBtn}
              onClick={() => setIsEditing(false)}
              disabled={isSaving}
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </AccountGuard>
  );
}
