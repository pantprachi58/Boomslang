import Image from "next/image";
import SectionWrapper from "@/components/SectionWrapper/SectionWrapper";
import { supportFeatures } from "@/data/supportFeatures";
import styles from "./NaturalSupport.module.css";

export default function NaturalSupport() {
  return (
    <SectionWrapper>
      <div className={styles.card}>
        <Image
          src="/images/red-energy-bg.jpg"
          alt=""
          fill
          loading="eager"
          className={styles.bgImage}
          aria-hidden="true"
        />
        <div className={styles.overlay} />

        <div className={styles.content}>
          <p className={styles.eyebrow}>Natural Support</p>
          <h2 className={styles.title}>For Healthy Weight Gain</h2>
          <p className={styles.description}>
            Discover how our Ayurvedic supplements for weight gain help
            support your wellness journey with carefully selected herbal
            ingredients.
          </p>

          <div className={styles.grid}>
            {supportFeatures.map((feature) => (
              <div key={feature.title} className={styles.feature}>
                <span className={styles.iconWrap}>
                  <Image
                    src={feature.icon}
                    alt=""
                    width={32}
                    height={32}
                    aria-hidden="true"
                  />
                </span>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDesc}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
