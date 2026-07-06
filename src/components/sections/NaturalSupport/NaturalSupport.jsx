import Image from "next/image";
import SectionWrapper from "@/components/SectionWrapper/SectionWrapper";
import IconFeature from "@/components/IconFeature/IconFeature";
import styles from "./NaturalSupport.module.css";

const features = [
  {
    icon: "/icons/icon-wellness.svg",
    title: "Healthy Weight Gain",
    description: "Supports gradual and healthy weight gain as part of a balanced diet and active lifestyle.",
  },
  {
    icon: "/icons/icon-appetite.svg",
    title: "Better Appetite",
    description: "Helps improve appetite naturally, making it easier to meet your daily nutritional needs.",
  },
  {
    icon: "/icons/icon-absorption.svg",
    title: "Improved Nutrient Absorption",
    description: "Supports efficient digestion and nutrient absorption to help your body make better use of every meal.",
  },
  {
    icon: "/icons/icon-strength.svg",
    title: "Strength & Daily Wellness",
    description: "Supports natural strength and stamina for everyday activities and your fitness routine.",
  },
];

export default function NaturalSupport() {
  return (
    <SectionWrapper background="light" className={styles.section} containerClassName={styles.container}>
      <div className={styles.banner}>
        <div className={styles.bannerBg}>
          <Image
            src="/images/natural-support-bg.webp"
            alt=""
            fill
            className={styles.bannerImage}
            aria-hidden="true"
          />
        </div>
        <div className={styles.content}>
          <div className={styles.heading}>
            <h2 className={styles.title}>
              Natural Support <br/><span className={styles.highlight}>For Healthy Weight Gain</span>
            </h2>
            <p className={styles.subtitle}>
              Discover how our Ayurvedic supplements for weight gain help support your wellness journey with carefully selected herbal ingredients.
            </p>
          </div>
          <div className={styles.grid}>
            {features.map((feature) => (
              <IconFeature key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
