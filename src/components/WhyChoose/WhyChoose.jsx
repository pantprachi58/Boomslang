import SectionWrapper from "@/components/SectionWrapper/SectionWrapper";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import Button from "@/components/Button/Button";
import { whyChooseItems } from "@/data/whyChoose";
import styles from "./WhyChoose.module.css";

export default function WhyChoose() {
  return (
    <SectionWrapper>
      <SectionHeading eyebrow="Why Choose GOKU GAINZ?" withLines />

      <ul className={styles.list}>
        {whyChooseItems.map((item) => (
          <li key={item} className={styles.item}>
            <span className={styles.check} aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 13l4 4L19 7"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className={styles.ctaRow}>
        <Button href="/shop/goku-gainz" size="lg">
          Shop GOKU GAINZ
        </Button>
      </div>
    </SectionWrapper>
  );
}
