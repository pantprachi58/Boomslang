"use client";

import Image from "next/image";
import SectionWrapper from "@/components/SectionWrapper/SectionWrapper";
import styles from "./AboutHero.module.css";

export default function AboutHero() {
  return (
    <>
      {/* Banner Section */}
      <div className={styles.banner}>
        <Image
          src="/images/banner/about.png"
          alt="About Us Banner"
          fill
          className={styles.bannerImage}
          priority
          sizes="100vw"
        />
        <div className={styles.bannerOverlay}>
          <div className={styles.bannerContent}>
            <h1 className={styles.bannerTitle}>About BOOMSLANG Nutrition</h1>
            <p className={styles.bannerSubtitle}>
              Ayurvedic Nutrition For Your Fitness Journey
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <SectionWrapper background="light" className={styles.section}>
        <div className={styles.grid}>
          <div className={styles.imageWrap}>
            <div className={styles.glow} aria-hidden="true" />
            <Image
              src="/images/about/7.png"
              alt="GOKU GAINZ Supplement Bottle"
              fill
              className={styles.image}
              sizes="(max-width: 992px) 100vw, 50vw"
            />
          </div>
          <div className={styles.content}>
            <h2 className={styles.subtitle}>
              Ayurvedic Nutrition For People Who Want To Grow Stronger Naturally
            </h2>
            <p className={styles.description}>
             Every fitness journey is different.
            </p>
            <p className={styles.description}>
              Some people want to gain healthy weight. Some want to feel stronger during workouts.
              Others simply want nutrition they can trust to support their everyday goals.
            </p>
             <p className={styles.description}>
              At Boomslang Nutrition, we believe good nutrition should be simple, honest, and made to support your lifestyle not complicate it.
             </p>
              <p className={styles.description}>
              That's why we create thoughtfully formulated supplements inspired by Ayurveda and designed for modern fitness.
              Whether you're beginning your journey or working toward your next milestone, we're here to support you with products that fit naturally into your daily routine.
              </p>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
