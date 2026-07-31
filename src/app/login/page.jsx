"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import OtpInput from "react-otp-input";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import PasswordField from "@/components/PasswordField/PasswordField";
import { useAuth } from "@/components/AuthProvider/AuthProvider";
import styles from "./Auth.module.css";

export default function LoginPage() {
  const router = useRouter();
  const { login, verifyEmailOtp, resendOtp } = useAuth();
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState("");
  const [otp, setOtp] = useState("");

  function redirectAfterAuth(user) {
    const redirect = new URLSearchParams(window.location.search).get("redirect");
    const target =
      redirect && !(redirect.startsWith("/admin") && user.role !== "admin")
        ? redirect
        : user.role === "admin"
          ? "/admin"
          : "/";

    router.replace(target);
    router.refresh();
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    const formData = new FormData(event.currentTarget);

    try {
      const data = await login({
        email: String(formData.get("email") || ""),
        password: String(formData.get("password") || ""),
      });

      if (data.requiresEmailVerification) {
        setVerificationEmail(data.email || String(formData.get("email") || ""));
        setStatus({
          type: "success",
          message: data.message || "OTP sent to your email. Please verify to continue.",
        });
        return;
      }

      redirectAfterAuth(data.user);
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Login failed. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleVerifyOtp(event) {
    event.preventDefault();

    if (otp.length !== 6) {
      setStatus({ type: "error", message: "Please enter the 6 digit OTP." });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const data = await verifyEmailOtp({
        email: verificationEmail,
        otp,
      });

      redirectAfterAuth(data.user);
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "OTP verification failed. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleResendOtp() {
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const data = await resendOtp({ email: verificationEmail });
      setStatus({
        type: "success",
        message: data.message || "OTP sent successfully.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Unable to resend OTP.",
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
            <span className={styles.kicker}>Welcome back</span>
            <h1>Login</h1>
            <p>Access your Boomslang Nutrition account and continue where you left off.</p>
          </div>

          {verificationEmail ? (
            <form className={styles.form} onSubmit={handleVerifyOtp}>
              <div className={styles.otpIntro}>
                <h2>Verify Email</h2>
                <p>Enter the 6 digit OTP sent to {verificationEmail}.</p>
              </div>

              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                inputType="tel"
                shouldAutoFocus
                containerStyle={styles.otpContainer}
                inputStyle={styles.otpInput}
                renderInput={(props) => <input {...props} />}
              />

              {status.message && (
                <p className={`${styles.status} ${styles[status.type]}`}>{status.message}</p>
              )}

              <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                {isSubmitting ? "Verifying..." : "Verify And Login"}
              </button>

              <button
                type="button"
                className={styles.linkButton}
                onClick={handleResendOtp}
                disabled={isSubmitting}
              >
                Resend OTP
              </button>
            </form>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <label className={styles.field}>
                <span>Email</span>
                <input name="email" type="email" autoComplete="email" required />
              </label>

              <PasswordField
                label="Password"
                name="password"
                autoComplete="current-password"
                required
              />

              {status.message && (
                <p className={`${styles.status} ${styles[status.type]}`}>{status.message}</p>
              )}

              <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Login"}
              </button>

              <p className={styles.switchText}>
                <Link href="/forgot-password">Forgot password?</Link>
              </p>
              <p className={styles.switchText}>
                New to Boomslang? <Link href="/signup">Create an account</Link>
              </p>
            </form>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
