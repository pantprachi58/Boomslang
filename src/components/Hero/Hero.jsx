import Image from "next/image";
import Button from "@/components/Button/Button";
import Container from "@/components/Container/Container";
import { ShieldIcon, LeafIcon, BarbellIcon } from "@/components/icons/Icons";
import styles from "./Hero.module.css";

const features = [
  { label: "Certified", icon: ShieldIcon },
  { label: "Ayurvedic", icon: LeafIcon },
  { label: "Weight Gain", icon: BarbellIcon },
];

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.bgWrap}>
        <Image
          src="/images/banner/1.png"
          alt=""
          fill
          className={styles.bgImage}
          sizes="100vw"
          aria-hidden="true"
          priority
        />
      </div>
      <Container>
        <div className={styles.grid}>
          <div className={styles.content}>
            <h1 className={styles.title}>
              <span className={styles.titleLine}>Ayurvedic Supplements</span>
              <span className={styles.titleLine}>
                For Weight <span className={styles.highlight}>Gain</span>
              </span>
            </h1>
            <p className={styles.subtitle}>
              Support your weight gain journey naturally with an Ayurvedic supplement for
              weight gain formulated to help improve appetite, support nutrient absorption,
              and promote healthy weight gain as part of a balanced lifestyle.
            </p>
            <div className={styles.features}>
              {features.map(({ label, icon: FeatureIcon }) => (
                <span className={styles.feature} key={label}>
                  <FeatureIcon className={styles.featureIcon} aria-hidden="true" />
                  {label}
                </span>
              ))}
            </div>
            <Button href="/product/goku-gainz" size="small">
              Shop GOKU GAINZ
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
