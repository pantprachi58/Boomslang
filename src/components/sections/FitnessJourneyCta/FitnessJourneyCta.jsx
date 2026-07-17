"use client";

import SectionWrapper from "@/components/SectionWrapper/SectionWrapper";
import Button from "@/components/Button/Button";
import styles from "./FitnessJourneyCta.module.css";

export default function FitnessJourneyCta() {
  return (
    <SectionWrapper background="dark" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Your Fitness Journey Starts with One Choice</h2>
        <Button href="/shop" size="small">
          Explore Our Products
        </Button>
      </div>
    </SectionWrapper>
  );
}
