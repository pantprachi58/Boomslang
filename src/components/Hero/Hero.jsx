import Image from "next/image";
import Container from "@/components/Container/Container";
import Button from "@/components/Button/Button";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <Container className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>Ayurvedic Supplements</p>
          <h1 className={styles.title}>
            For Weight <span className={styles.highlight}>Gain</span>
          </h1>
          <p className={styles.description}>
            Support your weight gain journey naturally with an Ayurvedic
            supplement for weight gain formulated to help improve appetite,
            support nutrient absorption, and promote healthy weight gain as
            part of a balanced lifestyle.
          </p>
          <Button href="/shop/goku-gainz" size="lg">
            Shop GOKU GAINZ
          </Button>
        </div>
        <div className={styles.imageWrap}>
          <Image
            src="/images/hero-product.png"
            alt="GOKU GAINZ Ayurvedic weight gain supplement bottle"
            width={700}
            height={700}
            className={styles.image}
            priority
          />
        </div>
      </Container>
    </section>
  );
}
