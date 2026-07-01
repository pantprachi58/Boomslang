import styles from "./SectionHeading.module.css";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  withLines = false,
  wide = false,
  className = "",
}) {
  return (
    <div className={`${styles.heading} ${styles[align]} ${className}`}>
      {eyebrow && (
        <div className={styles.eyebrowRow}>
          {withLines && <span className={styles.line} aria-hidden="true" />}
          {title ? (
            <span className={styles.eyebrow}>{eyebrow}</span>
          ) : (
            <h2 className={`${styles.eyebrow} ${styles.eyebrowLarge}`}>{eyebrow}</h2>
          )}
          {withLines && <span className={styles.line} aria-hidden="true" />}
        </div>
      )}
      {title && <h2 className={styles.title}>{title}</h2>}
      {description && (
        <p className={`${styles.description} ${wide ? styles.wide : ""}`}>
          {description}
        </p>
      )}
    </div>
  );
}
