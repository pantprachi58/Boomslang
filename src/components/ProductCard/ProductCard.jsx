"use client";

import Image from "next/image";
import Button from "@/components/Button/Button";
import { useCart } from "@/components/CartProvider/CartProvider";
import styles from "./ProductCard.module.css";

export default function ProductCard({ 
  slug,
  image, 
  name, 
  description, 
  originalPrice, 
  discountedPrice, 
  percentOff, 
  href = "/shop" 
}) {
  const { addItem, decreaseItem, getItemQuantity } = useCart();
  const itemId = slug || href;
  const quantity = getItemQuantity(itemId);
  const cartItem = {
    id: itemId,
    slug,
    name,
    description,
    image,
    price: discountedPrice,
    oldPrice: originalPrice,
    percentOff,
    href,
  };

  return (
    <div className={styles.card}>
      {quantity > 0 ? (
        <div className={styles.quantityControl} aria-label={`${name} quantity`}>
          <button
            type="button"
            className={styles.quantityBtn}
            onClick={() => decreaseItem(itemId)}
            aria-label={`Remove one ${name}`}
          >
            -
          </button>
          <span className={styles.quantityValue}>{quantity}</span>
          <button
            type="button"
            className={styles.quantityBtn}
            onClick={() => addItem(cartItem)}
            aria-label={`Add one ${name}`}
          >
            +
          </button>
        </div>
      ) : (
        <button
          type="button"
          className={styles.addButton}
          aria-label={`Add ${name} to cart`}
          onClick={() => addItem(cartItem)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
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
