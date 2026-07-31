"use client";

import { useState } from "react";
import AccountGuard from "@/components/account/AccountGuard";
import PasswordField from "@/components/PasswordField/PasswordField";
import { useAuth } from "@/components/AuthProvider/AuthProvider";
import { PASSWORD_POLICY_MESSAGE, isStrongPassword } from "@/lib/passwordPolicy";
import styles from "@/components/account/AccountPages.module.css";

const INITIAL_FORM = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default function ChangePasswordPage() {
  const { changePassword } = useAuth();
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ type: "", message: "" });

    if (form.newPassword !== form.confirmPassword) {
      setStatus({
        type: "error",
        message: "New password and confirm password do not match.",
      });
      return;
    }

    if (!isStrongPassword(form.newPassword)) {
      setStatus({
        type: "error",
        message: PASSWORD_POLICY_MESSAGE,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const data = await changePassword(form);
      setForm(INITIAL_FORM);
      setStatus({
        type: "success",
        message: data.message || "Password changed successfully.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Unable to change password. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AccountGuard
      title="Change Password"
      subtitle="Update your account password securely."
    >
      <form className={styles.form} onSubmit={handleSubmit}>
        <PasswordField
          label="Old password"
          name="oldPassword"
          autoComplete="current-password"
          value={form.oldPassword}
          onChange={(event) => updateField("oldPassword", event.target.value)}
          required
        />

        <div className={styles.twoCol}>
          <PasswordField
            label="New password"
            name="newPassword"
            autoComplete="new-password"
            minLength={8}
            value={form.newPassword}
            onChange={(event) => updateField("newPassword", event.target.value)}
            required
          />

          <PasswordField
            label="Confirm password"
            name="confirmPassword"
            autoComplete="new-password"
            minLength={8}
            value={form.confirmPassword}
            onChange={(event) => updateField("confirmPassword", event.target.value)}
            required
          />
        </div>

        {status.message && (
          <p className={`${styles.status} ${styles[status.type]}`}>{status.message}</p>
        )}

        <div className={styles.formActions}>
          <button type="submit" className={styles.primaryBtn} disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Change Password"}
          </button>
        </div>
      </form>
    </AccountGuard>
  );
}
