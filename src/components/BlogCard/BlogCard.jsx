import Image from "next/image";
import Link from "next/link";
import { CalendarIcon } from "@/components/icons/Icons";
import styles from "./BlogCard.module.css";

export default function BlogCard({
  image,
  title,
  description,
  displayDate,
  date,
  category,
  readTime,
  tone = "dark",
  href = "#",
}) {
  return (
    <Link
      href={href}
      className={`${styles.card} ${tone === "light" ? styles.cardLight : ""}`}
    >
      <div className={styles.imageWrap}>
        <Image src={image} alt={title} fill className={styles.image} sizes="(max-width: 768px) 100vw, 25vw" />
      </div>
      <div className={styles.body}>
        {category && <span className={styles.category}>{category}</span>}
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <span className={styles.meta}>
          <CalendarIcon className={styles.metaIcon} aria-hidden="true" />
          {displayDate || date}
          {readTime ? ` • ${readTime}` : ""}
        </span>
      </div>
    </Link>
  );
}
