import Image from "next/image";
import styles from "./PageBanner.module.css";

export default function PageBanner({ src, alt = "Banner" }) {
  return (
    <div className={styles.banner}>
      <Image
        src={src}
        alt={alt}
        fill
        className={styles.bannerImage}
        priority
        sizes="100vw"
      />
    </div>
  );
}
