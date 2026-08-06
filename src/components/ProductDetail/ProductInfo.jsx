"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MinusIcon, PlusIcon, ShippingIcon, CertifiedIcon, TrustIcon } from "./icons";
import { useCart } from "@/components/CartProvider/CartProvider";
import { buildProductMetaParams, trackMetaEvent } from "@/lib/metaPixel";
import { getCartItemId } from "@/lib/productsApi";
import styles from "./ProductInfo.module.css";

const features = [
  { label: "Free and Fast Shipping", Icon: ShippingIcon },
  { label: "Certified", Icon: CertifiedIcon },
  { label: "Trusted", Icon: TrustIcon },
];

export default function ProductInfo({ product }) {
  const [expanded, setExpanded] = useState(false);
  const [selectedWeight, setSelectedWeight] = useState(
    product.weights?.[0]?.id || null
  );
  const { addItem, decreaseItem, getItemQuantity } = useCart();
  const router = useRouter();

  const description = product.description || "";
  const shouldTruncateDescription = description.length > 120;
  const shortDescription = shouldTruncateDescription
    ? `${description.slice(0, 120)}... `
    : description;
  const currentWeight = product.weights?.find((weight) => weight.id === selectedWeight);
  const hasMultipleWeights = product.weights?.length > 1;
  const displayPrice = currentWeight?.price ?? product.price;
  const displayOldPrice = currentWeight?.oldPrice ?? product.oldPrice;
  const displayDiscount = currentWeight?.discount ?? product.discount ?? product.percentOff;
  const productHref = `/shop/${product.slug}`;
  const variantId = currentWeight?.id || "";
  const itemId = getCartItemId(product.slug, variantId);
  const availableStock = Math.max(Number(currentWeight?.quantity ?? product.quantity ?? 0), 0);
  const outOfStock = availableStock <= 0;
  const quantity = getItemQuantity(itemId);
  const canAddMore = !outOfStock && quantity < availableStock;
  const cartItem = {
    id: itemId,
    slug: product.slug,
    variantId,
    name: product.name,
    variant: currentWeight?.name,
    price: displayPrice,
    stock: availableStock,
  };
  const checkoutItem = {
    id: itemId,
    slug: product.slug,
    variantId,
    name: product.name,
    description: currentWeight?.name || product.flavour || product.subtitle,
    image: product.image,
    price: displayPrice,
    oldPrice: displayOldPrice,
    percentOff: displayDiscount,
    href: productHref,
    variant: currentWeight?.name,
    stock: availableStock,
  };

  useEffect(() => {
    const firstWeight = product.weights?.[0];
    const firstVariantId = firstWeight?.id || "";

    trackMetaEvent(
      "ViewContent",
      buildProductMetaParams({
        id: getCartItemId(product.slug, firstVariantId),
        slug: product.slug,
        variantId: firstVariantId,
        name: product.name,
        price: firstWeight?.price ?? product.price ?? product.discountedPrice,
      })
    );
  }, [product]);

  return (
    <div className={styles.info}>
      <h1 className={styles.title}>{product.name}</h1>
      <p className={styles.subtitle}>{product.subtitle}</p>
      <p className={styles.tagline}>{product.tagline}</p>

      {description && (
        <p className={styles.description}>
          {expanded ? description : shortDescription}
          {shouldTruncateDescription && (
            <button
              type="button"
              className={styles.moreBtn}
              onClick={() => setExpanded((prev) => !prev)}
              aria-expanded={expanded}
            >
              {expanded ? "less" : "more"}
            </button>
          )}
        </p>
      )}

      {product.flavours?.length > 0 && (
        <div className={styles.optionGroup}>
          <span className={styles.optionLabel}>Flavour</span>
          <div className={styles.optionButtons}>
            {product.flavours.map((flavour) => {
              const isActive = product.selectedFlavourId === flavour.id;
              const className = `${styles.optionBtn} ${
                isActive ? styles.optionBtnActive : ""
              } ${!flavour.available ? styles.optionBtnDisabled : ""}`;

              if (flavour.href && flavour.available) {
                return (
                  <Link key={flavour.id} href={flavour.href} className={className}>
                    {flavour.name}
                  </Link>
                );
              }

              return (
                <button
                  key={flavour.id}
                  type="button"
                  className={className}
                  disabled
                >
                  {flavour.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {hasMultipleWeights && (
        <div className={styles.optionGroup}>
          <span className={styles.optionLabel}>Size</span>
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
        {displayDiscount > 0 && <span className={styles.discount}>{displayDiscount}% Off</span>}
        <span className={styles.oldPrice}>₹{displayOldPrice}</span>
        <span className={styles.price}>₹ {displayPrice}</span>
      </div>

      <span className={styles.quantityLabel}>Quantity</span>
      <div className={styles.buyRow}>
        <div className={styles.quantity}>
          <button
            type="button"
            className={styles.stepBtn}
            onClick={() => decreaseItem(itemId)}
            aria-label="Decrease quantity"
            disabled={quantity === 0}
          >
            <MinusIcon />
          </button>
          <span className={styles.quantityValue}>{quantity}</span>
          <button
            type="button"
            className={styles.stepBtn}
            onClick={() => addItem(cartItem)}
            aria-label="Increase quantity"
            disabled={!canAddMore}
          >
            <PlusIcon />
          </button>
        </div>

        <button
          type="button"
          className={styles.addToCart}
          onClick={() => addItem(cartItem)}
          disabled={!canAddMore}
        >
          {outOfStock ? "Out of Stock" : quantity > 0 ? "Add One More" : "Add to Cart"}
        </button>
      </div>

      <button
        type="button"
        className={styles.buyNow}
        disabled={outOfStock}
        onClick={() => {
          window.sessionStorage.setItem("boomslang-checkout-mode", "direct");
          window.sessionStorage.setItem(
            "boomslang-direct-checkout-item",
            JSON.stringify({ ...checkoutItem, quantity: 1, purchasableQuantity: 1 })
          );
          router.push("/checkout");
        }}
      >
        {outOfStock ? "Out of Stock" : "Buy Now"}
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
