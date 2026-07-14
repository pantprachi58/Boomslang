"use client";

import { useState } from "react";
import { MinusIcon, PlusIcon, ShippingIcon, CertifiedIcon, TrustIcon } from "./icons";
import styles from "./ProductInfo.module.css";

const features = [
  { label: "Free and Fast Shipping", Icon: ShippingIcon },
  { label: "Certified", Icon: CertifiedIcon },
  { label: "Trusted", Icon: TrustIcon },
];

export default function ProductInfo({ product }) {
  const [quantity, setQuantity] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const shortDescription = `${product.description.slice(0, 90)}… `;

  return (
    <div className={styles.info}>
      <h1 className={styles.title}>{product.name}</h1>
      <p className={styles.subtitle}>{product.subtitle}</p>
      <p className={styles.tagline}>{product.tagline}</p>

      <p className={styles.description}>
        {expanded ? product.description : shortDescription}
        <button
          type="button"
          className={styles.moreBtn}
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
        >
          {expanded ? "less" : "more"}
        </button>
      </p>

      <div className={styles.priceRow}>
        <span className={styles.discount}>{product.discountLabel}</span>
        <span className={styles.oldPrice}>₹{product.oldPrice}</span>
        <span className={styles.price}>₹ {product.price}</span>
      </div>

      <span className={styles.quantityLabel}>Quantity</span>
      <div className={styles.buyRow}>
        <div className={styles.quantity}>
          <button
            type="button"
            className={styles.stepBtn}
            onClick={() => setQuantity((q) => Math.max(0, q - 1))}
            aria-label="Decrease quantity"
          >
            <MinusIcon />
          </button>
          <span className={styles.quantityValue}>{quantity}</span>
          <button
            type="button"
            className={styles.stepBtn}
            onClick={() => setQuantity((q) => q + 1)}
            aria-label="Increase quantity"
          >
            <PlusIcon />
          </button>
        </div>

        <button type="button" className={styles.addToCart}>
          Add to Cart
        </button>
      </div>

      <button type="button" className={styles.buyNow}>
        Buy Now
      </button>

      <div className={styles.featureStrip}>
        {features.map(({ label, Icon }) => (
          <div key={label} className={styles.featureItem}>
            <Icon className={styles.featureIcon} />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
