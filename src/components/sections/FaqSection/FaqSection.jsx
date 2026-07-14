import Image from "next/image";
import SectionWrapper from "@/components/SectionWrapper/SectionWrapper";
import FaqAccordion from "@/components/FaqAccordion/FaqAccordion";
import styles from "./FaqSection.module.css";

const faqs = [
  {
    question: "What Is GOKU GAINZ?",
    answer:
      "GOKU GAINZ is an Ayurvedic supplement for weight gain formulated with herbal ingredients that help support healthy weight gain, improve appetite, enhance nutrient absorption, and promote natural strength.",
  },
  {
    question: "Who Can Use GOKU GAINZ?",
    answer:
      "GOKU GAINZ is suitable for adults who find it difficult to gain healthy body weight or are looking for additional nutritional support as part of a balanced lifestyle.",
  },
  {
    question: "How Should I Take GOKU GAINZ?",
    answer:
      "Take GOKU GAINZ exactly as directed on the product label or as recommended by your healthcare professional.",
  },
  {
    question: "How Long Does It Take to See Results?",
    answer:
      "Results may vary depending on factors such as diet, metabolism, lifestyle, and consistency. Following a balanced diet and healthy routine can help support your progress.",
  },
  {
    question: " Can I Take GOKU GAINZ Along with Exercise?",
    answer:
      "Yes. Combining regular exercise, balanced nutrition, quality sleep, and consistent supplement use can support your overall wellness and weight gain goals.",
  },
  {
    question: "What Makes GOKU GAINZ Different?",
    answer:
      "GOKU GAINZ is formulated with carefully selected Ayurvedic herbs that work together to support healthy weight gain, appetite, digestion, and overall vitality. It is designed to complement a balanced diet and an active lifestyle.",
  },
];

export default function FaqSection() {
  const leftFaqs = faqs.slice(0, 3);
  const rightFaqs = faqs.slice(3);

  return (
    <SectionWrapper background="offwhite" className={styles.section}>
      <div className={styles.heading}>
        <h2 className={styles.title}>Frequently Asked Questions</h2>
      </div>
      <div className={styles.grid}>
        <FaqAccordion items={leftFaqs} />
        <div className={styles.imageWrap}>
          <Image
            src="/images/faq-dragon-question.png"
            alt=""
            width={320}
            height={320}
            className={styles.image}
            aria-hidden="true"
          />
        </div>
        <FaqAccordion items={rightFaqs} />
      </div>
    </SectionWrapper>
  );
}
