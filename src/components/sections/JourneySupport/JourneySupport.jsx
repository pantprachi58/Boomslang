import Image from "next/image";
import SectionWrapper from "@/components/SectionWrapper/SectionWrapper";
import styles from "./JourneySupport.module.css";

export default function JourneySupport() {
  return (
    <SectionWrapper background="offwhite" className={styles.section}>
      <div className={styles.grid}>
        <div className={styles.imageWrap}>
          <Image
            src="/images/man-drinking-shaker.png"
            alt="Athlete drinking a Boomslang Nutrition shaker"
            fill
            className={styles.image}
            sizes="(max-width: 992px) 100vw, 40vw"
          />
        </div>
        <div>
          <h2 className={styles.title}>
            Supporting Your <br/><span className={styles.highlight}>Weight Gain Journey</span>{" "}
            Naturally
          </h2>
          <p className={styles.description}>
            At BOOMSLANG Nutrition, we believe lasting results come from consistency,
            proper nutrition, and high-quality ingredients.
          </p>
          <br/>
          <p className={styles.description1}>
            That's why we created GOKU GAINZ, one of our trusted Ayurvedic supplements for weight gain, crafted to support healthy weight gain, improve appetite, and enhance nutrient absorption. As an Ayurvedic nutrition supplement, GOKU GAINZ is designed to complement a balanced lifestyle and help you work toward your wellness goals naturally.
          </p>
          <br/>
           <p className={styles.description1}>
            Alongside our range of weight gain supplements, we also offer STRYCNINE, our pre workout supplement, created to support energy and performance before training. Whether your goal is healthy weight gain or better workout preparation, Boomslang Nutrition is here to support every step of your fitness journey.
           </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
