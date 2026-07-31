"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useAuth } from "@/components/AuthProvider/AuthProvider";
import styles from "../login/Auth.module.css";

export default function ForgotPasswordPage() {
  const { forgotPassword } = useAuth();
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    const formData = new FormData(event.currentTarget);

    try {
      const data = await forgotPassword({
        email: String(formData.get("email") || ""),
      });
      setStatus({
        type: "success",
        message: data.message || "Password reset link sent to your email.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Unable to send reset link. Please try again.",
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
            <span className={styles.kicker}>Account recovery</span>
            <h1>Forgot Password</h1>
            <p>Enter the registered email address and we will send a secure reset link.</p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.field}>
              <span>Email</span>
              <input name="email" type="email" autoComplete="email" required />
            </label>

            {status.message && (
              <p className={`${styles.status} ${styles[status.type]}`}>{status.message}</p>
            )}

            <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Reset Link"}
            </button>

            <p className={styles.switchText}>
              Remembered it? <Link href="/login">Back to login</Link>
            </p>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}
