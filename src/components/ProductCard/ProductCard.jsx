import Image from "next/image";
import Button from "@/components/Button/Button";
import styles from "./ProductCard.module.css";

export default function ProductCard({ 
  image, 
  name, 
  description, 
  originalPrice, 
  discountedPrice, 
  percentOff, 
  href = "/shop" 
}) {
  return (
    <div className={styles.card}>
      <button className={styles.addButton} aria-label="Add to cart">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <div className={styles.imageWrap}>
        <Image src={image} alt={name} width={400} height={480} className={styles.image} />
      </div>
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.description}>{description}</p>
      
      {(originalPrice && discountedPrice && percentOff) && (
        <div className={styles.pricing}>
          <span className={styles.percentOff}>{percentOff}% Off</span>
          <span className={styles.originalPrice}>₹ {originalPrice}</span>
          <span className={styles.discountedPrice}>₹ {discountedPrice}</span>
        </div>
      )}
      
      <Button href={href} size="small" fullWidth>
        Shop Now
      </Button>
    </div>
  );
}
