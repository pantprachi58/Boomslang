"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import OtpInput from "react-otp-input";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import PasswordField from "@/components/PasswordField/PasswordField";
import { useAuth } from "@/components/AuthProvider/AuthProvider";
import { PASSWORD_POLICY_MESSAGE, isStrongPassword } from "@/lib/passwordPolicy";
import styles from "../login/Auth.module.css";

export default function SignupPage() {
  const router = useRouter();
  const { signup, verifyEmailOtp, resendOtp } = useAuth();
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
    const password = String(formData.get("password") || "");
    const confirmPassword = String(formData.get("confirmPassword") || "");

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
      const data = await signup({
        firstName: String(formData.get("firstName") || ""),
        lastName: String(formData.get("lastName") || ""),
        email: String(formData.get("email") || ""),
        mobile: String(formData.get("mobile") || ""),
        password,
        confirmPassword,
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
        message: error.message || "Signup failed. Please try again.",
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
        <section className={`${styles.panel} ${styles.widePanel}`}>
          <div className={styles.copy}>
            <span className={styles.kicker}>Join Boomslang</span>
            <h1>Sign Up</h1>
            <p>Create your account with a few details. Admin access is handled separately.</p>
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
                {isSubmitting ? "Verifying..." : "Verify And Continue"}
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
            <div className={styles.twoCol}>
              <label className={styles.field}>
                <span>First name</span>
                <input name="firstName" type="text" autoComplete="given-name" required />
              </label>

              <label className={styles.field}>
                <span>Last name</span>
                <input name="lastName" type="text" autoComplete="family-name" required />
              </label>
            </div>

            <label className={styles.field}>
              <span>Email</span>
              <input name="email" type="email" autoComplete="email" required />
            </label>

            <label className={styles.field}>
              <span>Mobile number</span>
              <input name="mobile" type="tel" autoComplete="tel" required />
            </label>

            <div className={styles.twoCol}>
              <PasswordField
                label="Password"
                name="password"
                autoComplete="new-password"
                minLength={8}
                required
              />

              <PasswordField
                label="Confirm password"
                name="confirmPassword"
                autoComplete="new-password"
                minLength={8}
                required
              />
            </div>

            {status.message && (
              <p className={`${styles.status} ${styles[status.type]}`}>{status.message}</p>
            )}

            <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
              {isSubmitting ? "Creating account..." : "Create Account"}
            </button>

            <p className={styles.switchText}>
              Already have an account? <Link href="/login">Login</Link>
            </p>
          </form>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
