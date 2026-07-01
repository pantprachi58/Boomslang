import Image from "next/image";
import SectionWrapper from "@/components/SectionWrapper/SectionWrapper";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import Button from "@/components/Button/Button";
import { flavours } from "@/data/flavours";
import styles from "./FlavourShowcase.module.css";

export default function FlavourShowcase() {
  return (
    <SectionWrapper>
      <SectionHeading
        eyebrow="Explore STRYCNINE"
        withLines
        title="Pre-Workout Supplement Flavours"
        description="STRYCNINE is Boomslang Nutrition's Pre Workout Supplement, available in refreshing flavours to support your workout routine. Choose your favourite flavour and make every training session more enjoyable."
      />

      <div className={styles.grid}>
        {flavours.map((flavour) => (
          <article key={flavour.name} className={styles.card}>
            <div className={styles.swatch}>
              {flavour.image && (
                <Image
                  src={flavour.image}
                  alt={`STRYCNNINE ${flavour.name} pre-workout supplement`}
                  width={260}
                  height={330}
                  className={styles.image}
                />
              )}
            </div>
            <h3 className={styles.name}>{flavour.name}</h3>
            <p className={styles.desc}>{flavour.description}</p>
          </article>
        ))}
      </div>

      <div className={styles.ctaRow}>
        <Button href="/shop/goku-gainz" size="lg">
          Shop GOKU GAINZ
        </Button>
      </div>
    </SectionWrapper>
  );
}
