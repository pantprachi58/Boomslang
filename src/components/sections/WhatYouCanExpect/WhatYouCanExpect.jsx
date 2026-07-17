"use client";

import Image from "next/image";
import SectionWrapper from "@/components/SectionWrapper/SectionWrapper";
import styles from "./WhatYouCanExpect.module.css";

const expectationItems = [
  { 
    src: "/images/about/WhatYouOffer/1.png", 
    alt: "Carefully selected Ayurvedic ingredients",
    caption: "Carefully selected Ayurvedic ingredients"
  },
  { 
    src: "/images/about/WhatYouOffer/2.png", 
    alt: "Products designed for everyday use",
    caption: "Products designed for everyday use"
  },
  { 
    src: "/images/about/WhatYouOffer/3.png", 
    alt: "Thoughtfully developed formulations",
    caption: "Thoughtfully developed formulations"
  },
  { 
    src: "/images/about/WhatYouOffer/4.png", 
    alt: "Honest communication without exaggerated claims",
    caption: "Honest communication without exaggerated claims"
  },
];

export default function WhatYouCanExpect() {
  return (
    <SectionWrapper background="light" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>What you can expect from us:</h2>
        <div className={styles.grid}>
          <div className={styles.leftCol}>
            {expectationItems.map((item, index) => (
              <div key={index} className={styles.expectationItem}>
                <div className={styles.imageWrap}>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className={styles.image}
                    sizes="(max-width: 768px) 45vw, (max-width: 992px) 40vw, 20vw"
                  />
                </div>
                <p className={styles.itemCaption}>{item.caption}</p>
              </div>
            ))}
          </div>
          <div className={styles.rightCol}>
            <div className={styles.largeImageWrap}>
              <Image
                src="/images/about/WhatYouOffer/big one.png"
                alt="A balanced approach to fitness and wellness"
                fill
                className={styles.image}
                sizes="(max-width: 992px) 100vw, 50vw"
              />
            </div>
            <p className={styles.largeCaption}>A balanced approach to fitness and wellness</p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
