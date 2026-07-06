import Image from "next/image";
import SectionWrapper from "@/components/SectionWrapper/SectionWrapper";
import FaqAccordion from "@/components/FaqAccordion/FaqAccordion";
import styles from "./FaqSection.module.css";

const faqs = [
  {
    question: "What is GOKU GAINZ?",
    answer:
      "Goku Gainz is an ayurvedic mass and strength formula designed to support healthy weight gain, muscle support and stamina, made using natural ayurvedic herbs.",
  },
  {
    question: "How Should I Take GOKU GAINZ?",
    answer:
      "Take one capsule daily with a meal, or as directed by your healthcare practitioner, alongside a balanced diet.",
  },
  {
    question: "What is GOKU GAINZ?",
    answer:
      "It is made for daily wellness support and healthy nutrition routines.",
  },
  {
    question: "How Long Does It Take To See Results?",
    answer:
      "Most users begin to notice improvements in appetite and energy within 3-4 weeks of consistent daily use.",
  },
  {
    question: "Can I Take GOKU GAINZ Along With Exercise?",
    answer:
      "Yes. Goku Gainz is designed to complement an active lifestyle and pairs well with a structured exercise routine.",
  },
  {
    question: "Can I Take GOKU GAINZ Along With Exercise?",
    answer:
      "Yes. It fits best alongside regular meals, training and a consistent routine.",
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
