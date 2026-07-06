import Image from "next/image";
import styles from "./IconFeature.module.css";

export default function IconFeature({ icon, title, description }) {
  return (
    <div className={styles.card}>
      <div className={styles.iconWrap}>
        <Image src={icon} alt="" width={64} height={64} className={styles.icon} aria-hidden="true" />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
