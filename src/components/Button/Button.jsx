import Link from "next/link";
import styles from "./Button.module.css";

export default function Button({
  href,
  children,
  variant = "primary",
  size,
  fullWidth = false,
  className = "",
  type = "button",
  ...rest
}) {
  const classes = [
    styles.btn,
    styles[variant],
    size === "small" ? styles.small : "",
    fullWidth ? styles.full : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
