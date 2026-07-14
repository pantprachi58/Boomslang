import Image from "next/image";
import Link from "next/link";
import styles from "./ShopProductCard.module.css";

export default function ShopProductCard({
  id,
  name,
  description,
  image,
  originalPrice,
  discountedPrice,
  percentOff,
  availability,
}) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={image}
          alt={name}
          width={300}
          height={360}
          className={styles.image}
        />
        {availability === "Coming Soon" && (
          <div className={styles.comingSoonBadge}>Coming Soon</div>
        )}
      </div>

      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.description}>{description}</p>

        <div className={styles.pricing}>
          <span className={styles.percentOff}>{percentOff}% Off</span>
          <span className={styles.originalPrice}>₹ {originalPrice}</span>
          <span className={styles.discountedPrice}>₹ {discountedPrice}</span>
        </div>

        <div className={styles.actions}>
          <button className={styles.addToCart}>Add To Cart</button>
          <Link href={`/product?id=${id}`} className={styles.shopNow}>
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
}
