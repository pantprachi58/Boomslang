"use client";

import Image from "next/image";
import Button from "@/components/Button/Button";
import { useCart } from "@/components/CartProvider/CartProvider";
import { resolveAssetUrl } from "@/lib/assetUrl";
import { getCartItemId } from "@/lib/productsApi";
import styles from "./ProductCard.module.css";

export default function ProductCard({ 
  slug,
  image, 
  name, 
  description,
  cardDescription,
  originalPrice, 
  discountedPrice, 
  percentOff, 
  variantId = "",
  stock = 0,
  isOutOfStock = false,
  href = "/shop" 
}) {
  const { addItem, decreaseItem, getItemQuantity } = useCart();
  const displayImage = resolveAssetUrl(image || "/images/logo.png");
  const itemId = getCartItemId(slug || href, variantId);
  const quantity = getItemQuantity(itemId);
  const availableStock = Number(stock || 0);
  const outOfStock = isOutOfStock || availableStock <= 0;
  const canAddMore = !outOfStock && quantity < availableStock;
  const cartItem = {
    id: itemId,
    slug,
    variantId,
    stock: availableStock,
  };

  return (
    <div className={styles.card}>
      {outOfStock ? (
        <span className={styles.stockBadge}>Out of Stock</span>
      ) : quantity > 0 ? (
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
            disabled={!canAddMore}
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
          disabled={!canAddMore}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
      <div className={styles.imageWrap}>
        <Image src={displayImage} alt={name} width={400} height={480} className={styles.image} />
      </div>
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.description}>{cardDescription || description}</p>
      
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
