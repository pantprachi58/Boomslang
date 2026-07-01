import Image from "next/image";
import Button from "@/components/Button/Button";
import styles from "./GalleryCta.module.css";

export default function GalleryCta() {
  return (
    <section className={styles.section}>
      <div className={styles.imageWrap}>
        <Image
          src="/images/gym-gallery.png"
          alt="GOKU GAINZ supplement in gym and lifestyle settings"
          fill
          loading="eager"
          className={styles.image}
        />
      </div>

      <div className={styles.panel}>
        <p className={styles.eyebrow}>Start Your</p>
        <h2 className={styles.title}>Healthy Weight Gain Journey Today</h2>
        <p className={styles.description}>
          Give your body the nutritional support it deserves with GOKU
          GAINZ, one of Boomslang Nutrition&apos;s trusted Ayurvedic
          supplements for weight gain. Support healthy weight gain, improve
          appetite, and enhance nutrient absorption as part of your everyday
          wellness routine.
        </p>
        <Button href="/shop/goku-gainz" size="lg">
          Shop GOKU GAINZ
        </Button>
      </div>
    </section>
  );
}
