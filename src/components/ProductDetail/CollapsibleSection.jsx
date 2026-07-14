"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@/components/icons/Icons";
import styles from "./CollapsibleSection.module.css";

export default function CollapsibleSection({ title, headerExtra, defaultOpen = true, children }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={styles.card}>
      <div className={styles.headerRow}>
        <button
          type="button"
          className={styles.collapseHeader}
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
        >
          <span className={styles.collapseTitle}>{title}</span>
        </button>
        <div className={styles.headerActions}>
          {headerExtra}
          <button
            type="button"
            className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-label={`Toggle ${title}`}
          >
            <ChevronDownIcon />
          </button>
        </div>
      </div>

      {open && <div className={styles.body}>{children}</div>}
    </div>
  );
}
