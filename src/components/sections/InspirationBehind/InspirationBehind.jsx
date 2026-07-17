"use client";

import Image from "next/image";
import styles from "./InspirationBehind.module.css";

const products = [
  {
    name: "GOKU GAINZ",
    description:
      "Our Ayurvedic weight gain supplement is designed to support healthy weight gain, improve appetite, and support nutrient absorption as part of a balanced lifestyle.",
    image: "/images/about/g.png",
    href: "/product/goku-gainz",
  },
  {
    name: "STRYCNINE",
    description:
      "Our pre-workout supplement is created to support your workout routine by helping you prepare for training with focus and energy. Together, they help support both your nutrition and your performance.",
    image: "/images/about/s.png",
    href: "/product/strychnine-mango",
  },
];

export default function InspirationBehind() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.mainTitle}>Supporting Different Fitness Goals</h2>
        <p className={styles.subtitle}>
          Every fitness journey has different needs.
          <br />
          That&apos;s why Boomslang Nutrition offers products designed to support different stages of your routine.
        </p>
        <div className={styles.grid}>
          {products.map((product) => (
            <div className={styles.card} key={product.name}>
              <div className={styles.content}>
                <h3 className={styles.cardTitle}>{product.name}</h3>
                <p className={styles.description}>{product.description}</p>
                <div className={styles.divider}></div>
              </div>
              <div className={styles.imageWrap}>
                <Image
                  src="/images/about/leaves.png"
                  alt=""
                  width={220}
                  height={220}
                  className={styles.leaf}
                  aria-hidden="true"
                />
                <div className={styles.pedestal}></div>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={300}
                  className={styles.image}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}