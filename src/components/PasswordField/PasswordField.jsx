"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import styles from "./PasswordField.module.css";

export default function PasswordField({ label, required = false, className = "", ...inputProps }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <label className={`${styles.field} ${className}`}>
      {label && (
        <span>
          {label}
          {required && <b className={styles.required}> *</b>}
        </span>
      )}
      <span className={styles.inputWrap}>
        <input
          {...inputProps}
          type={isVisible ? "text" : "password"}
          required={required}
          className={styles.input}
        />
        <button
          type="button"
          className={styles.toggle}
          onClick={() => setIsVisible((value) => !value)}
          aria-label={isVisible ? "Hide password" : "Show password"}
        >
          {isVisible ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
        </button>
      </span>
    </label>
  );
}
