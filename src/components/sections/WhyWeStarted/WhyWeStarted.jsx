"use client";

import Image from "next/image";
import SectionWrapper from "@/components/SectionWrapper/SectionWrapper";
import styles from "./WhyWeStarted.module.css";

export default function WhyWeStarted() {
  return (
    <SectionWrapper background="light" className={styles.section}>
      <div className={styles.grid}>
        <div className={styles.content}>
          <h2 className={styles.title}>Why We Started BOOMSLANG Nutrition?</h2>
          <p className={styles.description}>
           Every fitness journey is different
          </p>
          <p className={styles.description}>
            Some people want to gain healthy weight. Some want to feel stronger during workouts.
            Others simply want nutrition they can trust to support their everyday goals.
          </p>
          <p className={styles.description}>
            At Boomslang Nutrition, we believe good nutrition should be simple, honest, and made to support your lifestyle not complicate it.
          </p>
          <p className={styles.description}>
            That's why we create thoughtfully formulated supplements inspired by Ayurveda and designed for modern fitness. Whether you're beginning your journey or working toward your next milestone, we're here to support you with products that fit naturally into your daily routine
          </p>
        </div>
        <div className={styles.imageWrap}>
          <Image
            src="/images/about/5.png"
            alt="Fitness Motivation"
            fill
            className={styles.image}
            sizes="(max-width: 992px) 100vw, 50vw"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
