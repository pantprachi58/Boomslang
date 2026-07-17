"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartProvider/CartProvider";
import styles from "./ShopProductCard.module.css";

export default function ShopProductCard({
  cartId,
  slug,
  name,
  description,
  image,
  originalPrice,
  discountedPrice,
  percentOff,
  availability,
  href,
  variant,
}) {
  const { addItem, decreaseItem, getItemQuantity } = useCart();
  const itemId = cartId || slug || href;
  const quantity = getItemQuantity(itemId);
  const productHref = href || `/shop/${slug}`;
  const cartItem = {
    id: itemId,
    slug,
    name,
    description,
    image,
    price: discountedPrice,
    oldPrice: originalPrice,
    percentOff,
    href: productHref,
    variant,
  };

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
          {quantity > 0 ? (
            <div className={styles.quantityControl}>
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
              className={styles.addToCart}
              onClick={() => addItem(cartItem)}
            >
              Add To Cart
            </button>
          )}
          <Link href={productHref} className={styles.shopNow}>
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
}
