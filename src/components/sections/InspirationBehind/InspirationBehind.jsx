"use client";

import Image from "next/image";
import SectionWrapper from "@/components/SectionWrapper/SectionWrapper";
import Button from "@/components/Button/Button";
import styles from "./InspirationBehind.module.css";

const products = [
  {
    name: "GOKU GAINZ",
    description:
      "Our Ayurvedic weight gain formula, crafted to support healthy weight gain and improve appetite naturally.",
    image: "/images/1.png",
    href: "/product",
  },
  {
    name: "STRYCHNINE",
    description:
      "Our pre-workout supplement, created to support energy and performance before every training session.",
    image: "/images/strycnnine-mango.png",
    href: "/shop",
  },
];

export default function InspirationBehind() {
  return (
    <SectionWrapper background="dark" className={styles.section}>
      <h2 className={styles.mainTitle}>Supporting Different Fitness Goals</h2>
      <p className={styles.subtitle}>
        Every fitness journey is different. That's why Boomslang Nutrition offers products
        designed to support a range of your fitness goals.
      </p>
      <div className={styles.grid}>
        {products.map((product) => (
          <div className={styles.card} key={product.name}>
            <div className={styles.imageWrap}>
              <Image
                src={product.image}
                alt={product.name}
                fill
                className={styles.image}
                sizes="(max-width: 768px) 90vw, 45vw"
              />
            </div>
            <h3 className={styles.cardTitle}>{product.name}</h3>
            <p className={styles.description}>{product.description}</p>
            <Button href={product.href} size="small">
              Learn More
            </Button>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
