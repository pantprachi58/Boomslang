import Image from "next/image";
import SectionWrapper from "@/components/SectionWrapper/SectionWrapper";
import Button from "@/components/Button/Button";
import styles from "./CtaBanner.module.css";

export default function CtaBanner() {
  return (
    <SectionWrapper background="light" className={styles.section}>
      <div className={styles.banner}>
        <div className={styles.grid}>
          <div className={styles.imageWrap}>
            <Image
              src="/images/goku-gainz-three-bottles.png"
              alt="Goku Gainz supplement bottles"
              width={560}
              height={510}
              className={styles.image}
            />
          </div>
          <div>
            <h2 className={styles.title}>
              Start Your <br/><span className={styles.highlight}>Healthy Weight Gain Journey Today</span> 
            </h2>
            <p className={styles.description}>
              Give your body the nutritional support it deserves with GOKU GAINZ, one of Boomslang Nutrition's trusted Ayurvedic supplements for weight gain. Support healthy weight gain, improve appetite, and enhance nutrient absorption as part of your everyday wellness routine.
            </p>
            <Button href="/product/goku-gainz">Shop GOKU GAINZ</Button>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
