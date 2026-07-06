import Image from "next/image";
import Button from "@/components/Button/Button";
import styles from "./ProductCard.module.css";

export default function ProductCard({ image, name, description, href = "/shop" }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrap}>
        <Image src={image} alt={name} width={400} height={480} className={styles.image} />
      </div>
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.description}>{description}</p>
      <Button href={href} size="small" fullWidth>
        Shop Now
      </Button>
    </div>
  );
}
