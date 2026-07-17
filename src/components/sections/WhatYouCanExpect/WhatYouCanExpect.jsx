"use client";

import Image from "next/image";
import SectionWrapper from "@/components/SectionWrapper/SectionWrapper";
import styles from "./WhatYouCanExpect.module.css";

const images = [
  { src: "/images/2.png", alt: "Natural supplements" },
  { src: "/images/4.png", alt: "Fitness lifestyle" },
  { src: "/images/1.png", alt: "GOKU GAINZ product" },
  { src: "/images/3.png", alt: "Quality products" },
];

export default function WhatYouCanExpect() {
  return (
    <SectionWrapper background="light" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>What you can expect from us:</h2>
        <div className={styles.grid}>
          <div className={styles.imageGrid}>
            {images.map((img, index) => (
              <div key={index} className={styles.imageWrap}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className={styles.image}
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
          <div className={styles.largeCol}>
            <div className={styles.largeImageWrap}>
              <Image
                src="/images/goku-gainz-lifestyle-collage.png"
                alt="Lifestyle and fitness"
                fill
                className={styles.image}
                sizes="(max-width: 992px) 100vw, 50vw"
              />
            </div>
            <p className={styles.caption}>A balanced approach to fitness and self-care</p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
