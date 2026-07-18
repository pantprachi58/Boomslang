"use client";

import Image from "next/image";
import SectionWrapper from "@/components/SectionWrapper/SectionWrapper";
import styles from "./WhatMakesUsDifferent.module.css";

export default function WhatMakesUsDifferent() {
  return (
    <SectionWrapper background="light" className={styles.section}>
      <div className={styles.grid}>
        <div className={styles.imageWrap}>
          <Image
            src="/images/about/6.png"
            alt="BOOMSLANG Quality Products"
            fill
            className={styles.image}
            sizes="(max-width: 992px) 100vw, 50vw"
          />
        </div>
        <div className={styles.content}>
          <div className={styles.item}>
            <h2 className={styles.mainTitle}>Why Choose BOOMSLANG Nutrition?</h2>
            <p className={styles.description}>
              There are plenty of supplements on the market. We choose a different approach
            </p>
            <p className={styles.description}>
              Instead of focusing on hype, we focus on quality, simplicity, and consistency.
              Our products are designed with the knowledge of Ayurveda to support your wellness journey while fitting naturally into your daily routine.
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
