"use client";

import Image from "next/image";
import SectionWrapper from "@/components/SectionWrapper/SectionWrapper";
import styles from "./OurVision.module.css";

export default function OurVision() {
  return (
    <SectionWrapper className={styles.section}>
      <div className={styles.grid}>
        <div className={styles.content}>
          <h2 className={styles.title}>Our Mission</h2>
          <p className={styles.description}>
            To become the most trusted name in ayurvedic nutrition—empowering individuals to
            reach their fitness and wellness goals naturally, without compromise.
          </p>
          <p className={styles.description}>
            We envision a world where health and strength are accessible to everyone, where
            quality isn't just a buzzword, and where every product we create makes a real,
            meaningful difference in your life.
          </p>
          <p className={styles.description}>
            BOOMSLANG isn't just about supplements—it's about building a community of strong,
            confident individuals who believe in doing things the right way. The natural way.
          </p>
        </div>
        <div className={styles.imageWrap}>
          <Image
            src="/images/about/1.png"
            alt="Man with fitness supplement"
            fill
            className={styles.image}
            sizes="(max-width: 992px) 100vw, 50vw"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
