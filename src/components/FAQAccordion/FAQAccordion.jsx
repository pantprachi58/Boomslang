"use client";

import { useState } from "react";
import SectionWrapper from "@/components/SectionWrapper/SectionWrapper";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import Button from "@/components/Button/Button";
import { faqs } from "@/data/faqs";
import styles from "./FAQAccordion.module.css";

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <SectionWrapper>
      <SectionHeading eyebrow="Frequently" title="Asked Questions" withLines />

      <div className={styles.list}>
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          const panelId = `faq-panel-${index}`;
          const buttonId = `faq-button-${index}`;

          return (
            <div key={faq.question} className={styles.item}>
              <h3 className={styles.itemHeading}>
                <button
                  type="button"
                  id={buttonId}
                  className={styles.trigger}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(index)}
                >
                  {faq.question}
                  <span
                    className={`${styles.icon} ${isOpen ? styles.iconOpen : ""}`}
                    aria-hidden="true"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M6 9l6 6 6-6"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className={`${styles.panel} ${isOpen ? styles.panelOpen : ""}`}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.ctaRow}>
        <Button href="/shop/goku-gainz" size="lg">
          Shop GOKU GAINZ
        </Button>
      </div>
    </SectionWrapper>
  );
}
