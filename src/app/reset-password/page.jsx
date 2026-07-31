"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import PasswordField from "@/components/PasswordField/PasswordField";
import { useAuth } from "@/components/AuthProvider/AuthProvider";
import { PASSWORD_POLICY_MESSAGE, isStrongPassword } from "@/lib/passwordPolicy";
import styles from "../login/Auth.module.css";

export default function ResetPasswordPage() {
  const router = useRouter();
  const { resetPassword } = useAuth();
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    const token = new URLSearchParams(window.location.search).get("token") || "";
    const formData = new FormData(event.currentTarget);
    const password = String(formData.get("password") || "");
    const confirmPassword = String(formData.get("confirmPassword") || "");

    if (!token) {
      setStatus({
        type: "error",
        message: "Reset token is missing. Please request a new reset link.",
      });
      setIsSubmitting(false);
      return;
    }

    if (password !== confirmPassword) {
      setStatus({
        type: "error",
        message: "Password and confirm password do not match.",
      });
      setIsSubmitting(false);
      return;
    }

    if (!isStrongPassword(password)) {
      setStatus({
        type: "error",
        message: PASSWORD_POLICY_MESSAGE,
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const data = await resetPassword({
        token,
        password,
        confirmPassword,
      });

      router.replace(data.user?.role === "admin" ? "/admin" : "/");
      router.refresh();
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Unable to reset password. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className={styles.panel}>
          <div className={styles.copy}>
            <span className={styles.kicker}>Secure reset</span>
            <h1>Reset Password</h1>
            <p>Choose a new password. Your email will be verified automatically after reset.</p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <PasswordField
              label="New password"
              name="password"
              autoComplete="new-password"
              minLength={8}
              required
            />

            <PasswordField
              label="Confirm new password"
              name="confirmPassword"
              autoComplete="new-password"
              minLength={8}
              required
            />

            {status.message && (
              <p className={`${styles.status} ${styles[status.type]}`}>{status.message}</p>
            )}

            <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
              {isSubmitting ? "Resetting..." : "Reset Password"}
            </button>

            <p className={styles.switchText}>
              Need another link? <Link href="/forgot-password">Request reset link</Link>
            </p>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}
