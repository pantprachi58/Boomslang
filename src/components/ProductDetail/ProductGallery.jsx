"use client";

import { useState } from "react";
import Image from "next/image";
import { resolveAssetUrl } from "@/lib/assetUrl";
import styles from "./ProductGallery.module.css";

export default function ProductGallery({ images, alt }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const safeImages = (images || []).filter(Boolean).map(resolveAssetUrl);

  if (!safeImages.length) return null;

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImage}>
        <Image
          src={safeImages[activeIndex]}
          alt={alt}
          width={560}
          height={560}
          priority
          className={styles.mainImg}
          sizes="(max-width: 768px) 100vw, 45vw"
        />
      </div>

      <div className={styles.thumbnails}>
        {safeImages.map((src, index) => (
          <button
            key={src}
            type="button"
            className={`${styles.thumbnail} ${index === activeIndex ? styles.thumbnailActive : ""}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Show image ${index + 1} of ${safeImages.length}`}
            aria-pressed={index === activeIndex}
          >
            <Image
              src={src}
              alt=""
              width={130}
              height={130}
              className={styles.thumbImg}
              sizes="130px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
