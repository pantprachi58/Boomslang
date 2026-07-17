"use client";

import Image from "next/image";
import SectionWrapper from "@/components/SectionWrapper/SectionWrapper";
import styles from "./QualityCleansPure.module.css";

export default function QualityCleansPure() {
  return (
    <SectionWrapper background="light" className={styles.section}>
      <div className={styles.grid}>
        <div className={styles.imageWrap}>
          <Image
            src="/images/4.png"
            alt="Quality Control"
            fill
            className={styles.image}
            sizes="(max-width: 992px) 100vw, 50vw"
          />
        </div>
        <div className={styles.content}>
          <h2 className={styles.title}>Quality Comes First</h2>
          <p className={styles.description}>
            At BOOMSLANG, quality isn't just a promise—it's our foundation. From ingredient
            selection to packaging, every step is carefully monitored to ensure you receive
            only the best.
          </p>
          <div className={styles.expectBlock}>
            <h3 className={styles.expectTitle}>What you can expect from us:</h3>
            <p className={styles.description}>
              We can't promise instant results, but we can promise real, honest effort in every
              product we create.
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
