import Image from "next/image";
import styles from "./TexturedZone.module.css";

export default function TexturedZone({ children, tone = "red" }) {
  const src =
    tone === "green" ? "/images/green-energy-bg.jpg" : "/images/red-energy-bg.jpg";

  return (
    <div className={`${styles.zone} ${styles[tone]}`}>
      <Image
        src={src}
        alt=""
        fill
        loading="eager"
        className={styles.bgImage}
        aria-hidden="true"
      />
      <div className={`${styles.overlay} ${styles[tone]}`} />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
