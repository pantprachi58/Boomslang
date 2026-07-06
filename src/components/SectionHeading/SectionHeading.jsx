import styles from "./SectionHeading.module.css";

export default function SectionHeading({
  title,
  highlight,
  subtitle,
  theme = "default",
  className = "",
}) {
  const parts = highlight ? title.split(highlight) : [title];

  return (
    <div className={`${styles.wrap} ${theme === "light" ? styles.light : ""} ${className}`}>
      <h2 className={styles.title}>
        {highlight ? (
          <>
            {parts[0]}
            <span className={styles.highlight}>{highlight}</span>
            {parts[1]}
          </>
        ) : (
          title
        )}
      </h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}
