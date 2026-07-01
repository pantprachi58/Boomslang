import Image from "next/image";
import SectionWrapper from "@/components/SectionWrapper/SectionWrapper";
import styles from "./WeightGainStory.module.css";

const highlights = [
  "That's why we created GOKU GAINZ, one of our trusted Ayurvedic supplements for weight gain, crafted to support healthy weight gain, improve appetite, and enhance nutrient absorption. As an Ayurvedic nutrition supplement, GOKU GAINZ is designed to complement a balanced lifestyle and help you work toward your wellness goals naturally.",
  "Alongside our range of weight gain supplements, we also offer STRYCNINE, our pre workout supplement, created to support energy and performance before training. Whether your goal is healthy weight gain or better workout preparation, Boomslang Nutrition is here to support every step of your fitness journey.",
];

export default function WeightGainStory() {
  return (
    <SectionWrapper>
      <div className={styles.grid}>
        <div className={styles.imageWrap}>
          <Image
            src="/images/goku-bottle.png"
            alt="GOKU GAINZ Ayurvedic weight gain supplement bottles"
            width={480}
            height={559}
            className={styles.image}
          />
        </div>

        <div className={styles.content}>
          <p className={styles.eyebrow}>Supporting Your</p>
          <h2 className={styles.title}>Weight Gain Journey Naturally</h2>
          <p className={styles.intro}>
            At BOOMSLANG Nutrition, we believe lasting results come from
            consistency, proper nutrition, and high-quality ingredients.
          </p>

          {highlights.map((text) => (
            <blockquote key={text} className={styles.highlight}>
              {text}
            </blockquote>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
