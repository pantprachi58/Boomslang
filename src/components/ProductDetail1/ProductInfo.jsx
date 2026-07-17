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
  const [selectedFlavour, setSelectedFlavour] = useState(
    product.flavours?.[0]?.id || null
  );
  const [selectedWeight, setSelectedWeight] = useState(
    product.weights?.[0]?.id || null
  );

  const shortDescription = `${product.description.slice(0, 90)}… `;

  // Get current price based on selected weight
  const currentWeight = product.weights?.find((w) => w.id === selectedWeight);
  const displayPrice = currentWeight?.price || product.price;
  const displayOldPrice = currentWeight?.oldPrice || product.oldPrice;

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

      {/* Flavour Selection */}
      {product.flavours && product.flavours.length > 0 && (
        <div className={styles.optionGroup}>
          <span className={styles.optionLabel}>Flavour</span>
          <div className={styles.optionButtons}>
            {product.flavours.map((flavour) => (
              <button
                key={flavour.id}
                type="button"
                className={`${styles.optionBtn} ${
                  selectedFlavour === flavour.id ? styles.optionBtnActive : ""
                } ${!flavour.available ? styles.optionBtnDisabled : ""}`}
                onClick={() => flavour.available && setSelectedFlavour(flavour.id)}
                disabled={!flavour.available}
              >
                {flavour.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Weight Selection */}
      {product.weights && product.weights.length > 0 && (
        <div className={styles.optionGroup}>
          <span className={styles.optionLabel}>Weight</span>
          <div className={styles.optionButtons}>
            {product.weights.map((weight) => (
              <button
                key={weight.id}
                type="button"
                className={`${styles.optionBtn} ${styles.weightBtn} ${
                  selectedWeight === weight.id ? styles.optionBtnActive : ""
                }`}
                onClick={() => setSelectedWeight(weight.id)}
              >
                <span className={styles.weightName}>{weight.name}</span>
                <span className={styles.weightPrice}>₹{weight.price}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className={styles.priceRow}>
        <span className={styles.discount}>{product.discountLabel}</span>
        <span className={styles.oldPrice}>₹{displayOldPrice}</span>
        <span className={styles.price}>₹ {displayPrice}</span>
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
