import Image from "next/image";
import Link from "next/link";
import { CalendarIcon } from "@/components/icons/Icons";
import styles from "./BlogCard.module.css";

export default function BlogCard({ image, title, description, date, href = "#" }) {
  return (
    <Link href={href} className={styles.card}>
      <div className={styles.imageWrap}>
        <Image src={image} alt={title} fill className={styles.image} sizes="(max-width: 768px) 100vw, 25vw" />
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <span className={styles.meta}>
          <CalendarIcon className={styles.metaIcon} aria-hidden="true" />
          Date: {date}
        </span>
      </div>
    </Link>
  );
}
