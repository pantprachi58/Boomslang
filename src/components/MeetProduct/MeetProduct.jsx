import SectionWrapper from "@/components/SectionWrapper/SectionWrapper";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import styles from "./MeetProduct.module.css";

export default function MeetProduct() {
  return (
    <SectionWrapper className={styles.section}>
      <SectionHeading
        eyebrow="Meet GOKU GAINZ"
        withLines
        wide
        description="GOKU GAINZ is Boomslang Nutrition's Ayurvedic weight gain supplement, crafted with carefully selected herbal ingredients to support healthy weight gain, improve appetite, and enhance nutrient absorption. As an Ayurvedic nutrition supplement, it's designed for hard gainers and anyone looking for reliable weight gain supplements to complement a healthy lifestyle."
        className={styles.heading}
      />
    </SectionWrapper>
  );
}
