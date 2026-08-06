"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartProvider/CartProvider";
import { resolveAssetUrl } from "@/lib/assetUrl";
import { getCartItemId } from "@/lib/productsApi";
import styles from "./ShopProductCard.module.css";

export default function ShopProductCard({
  cartId,
  slug,
  name,
  description,
  cardDescription,
  image,
  originalPrice,
  discountedPrice,
  percentOff,
  availability,
  href,
  variant,
  variantId = "",
  stock = 0,
  isOutOfStock = false,
}) {
  const { addItem, decreaseItem, getItemQuantity } = useCart();
  const itemId = cartId || getCartItemId(slug || href, variantId);
  const quantity = getItemQuantity(itemId);
  const productHref = href || `/shop/${slug}`;
  const displayImage = resolveAssetUrl(image || "/images/logo.png");
  const availableStock = Number(stock || 0);
  const outOfStock = isOutOfStock || availableStock <= 0;
  const canAddMore = !outOfStock && quantity < availableStock;
  const cartItem = {
    id: itemId,
    slug,
    variantId,
    name,
    price: discountedPrice,
    stock: availableStock,
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={displayImage}
          alt={name}
          width={300}
          height={360}
          className={styles.image}
        />
        {availability === "Coming Soon" && (
          <div className={styles.comingSoonBadge}>Coming Soon</div>
        )}
        {outOfStock && (
          <div className={styles.stockBadge}>Out of Stock</div>
        )}
      </div>

      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.description}>{cardDescription || description}</p>

        <div className={styles.pricing}>
          <span className={styles.percentOff}>{percentOff}% Off</span>
          <span className={styles.originalPrice}>₹ {originalPrice}</span>
          <span className={styles.discountedPrice}>₹ {discountedPrice}</span>
        </div>

        <div className={styles.actions}>
          {outOfStock ? (
            <button type="button" className={styles.addToCart} disabled>
              Out of Stock
            </button>
          ) : quantity > 0 ? (
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
                disabled={!canAddMore}
              >
                +
              </button>
            </div>
          ) : (
            <button
              type="button"
              className={styles.addToCart}
              onClick={() => addItem(cartItem)}
              disabled={!canAddMore}
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
