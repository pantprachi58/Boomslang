import Link from "next/link";
import styles from "./Button.module.css";

export default function Button({
  children,
  href,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  ...rest
}) {
  const classes = `${styles.btn} ${styles[variant]} ${styles[size]} ${
    fullWidth ? styles.fullWidth : ""
  } ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
