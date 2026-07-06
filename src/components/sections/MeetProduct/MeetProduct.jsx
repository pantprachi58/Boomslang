"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import SectionWrapper from "@/components/SectionWrapper/SectionWrapper";
import Button from "@/components/Button/Button";
import styles from "./MeetProduct.module.css";

const benefits = [
  "Supports Healthy Weight Gain",
  "Helps Improve Appetite Naturally",
  "Suitable For Daily Use",
  "Promotes Strength & Vitality",
  "100% Ayurvedic Herbal Formula",
];

const slides = [
  {
    src: "/images/slider/1.png",
    alt: "Goku Gainz supplement bottle on gym floor",
  },
  {
    src: "/images/slider/2.png",
    alt: "Goku Gainz supplement bottle with dumbbells",
  },
  {
    src: "/images/slider/3.png",
    alt: "Goku Gainz supplement bottle close up",
  },
  {
    src: "/images/slider/4.png",
    alt: "Goku Gainz supplement bottle in gym setting",
  },
];

const AUTOPLAY_INTERVAL = 4000;

export default function MeetProduct() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(timer);
  }, []);

  return (
    <SectionWrapper background="light" className={styles.section}>
      <div className={styles.grid}>
        <div className={styles.sliderWrap}>
          {slides.map((slide, index) => (
            <div
              key={slide.src}
              className={styles.slide}
              style={{ opacity: index === activeIndex ? 1 : 0 }}
              aria-hidden={index !== activeIndex}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className={styles.image}
                sizes="(max-width: 992px) 100vw, 50vw"
                priority={index === 0}
              />
            </div>
          ))}

          <div className={styles.dots}>
            {slides.map((slide, index) => (
              <button
                key={slide.src}
                type="button"
                className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ""}`}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
        <div className={styles.copy}>
          <h2 className={styles.title}>Meet GOKU GAINZ</h2>
          <p className={styles.description}>
            Goku Gainz is an ayurvedic nutrition supplement made to support healthy weight gain.
            Crafted with ayurvedic ingredients to support healthy appetite, improve nutrient
            absorption, and improve overall vitality. Designed for those looking to support a
            complete and healthy lifestyle.
          </p>
          <h3 className={styles.subheading}>Why Choose GOKU GAINZ?</h3>
          <ul className={styles.list}>
            {benefits.map((benefit) => (
              <li className={styles.listItem} key={benefit}>
                <span className={styles.checkIcon} aria-hidden="true">
                  ✓
                </span>
                {benefit}
              </li>
            ))}
          </ul>
          <Button href="/shop/goku-gainz">Shop GOKU GAINZ</Button>
        </div>

      </div>
    </SectionWrapper>
  );
}