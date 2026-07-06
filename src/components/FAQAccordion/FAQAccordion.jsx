"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@/components/icons/Icons";
import styles from "./FaqAccordion.module.css";

export default function FaqAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className={styles.list}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div className={styles.item} key={item.question}>
            <h3>
              <button
                type="button"
                className={styles.question}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
                onClick={() => toggle(index)}
              >
                {item.question}
                <span className={`${styles.icon} ${isOpen ? styles.iconOpen : ""}`}>
                  <ChevronDownIcon />
                </span>
              </button>
            </h3>
            <div
              id={`faq-answer-${index}`}
              className={`${styles.answerWrap} ${isOpen ? styles.answerWrapOpen : ""}`}
            >
              <p className={styles.answer}>{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
