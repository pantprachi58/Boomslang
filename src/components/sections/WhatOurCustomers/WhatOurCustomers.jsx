"use client";

import SectionWrapper from "@/components/SectionWrapper/SectionWrapper";
import styles from "./WhatOurCustomers.module.css";

function StarIcon(props) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M10 1.6L12.6 7L18.5 7.9L14.3 12L15.3 18L10 15.2L4.7 18L5.7 12L1.5 7.9L7.4 7L10 1.6Z" />
    </svg>
  );
}

const testimonials = [
  {
    text:
      "GOKU GAINZ has genuinely helped with my appetite and weight gain. I've stayed consistent for two months and the difference is noticeable.",
    author: "Rohit Sharma",
    location: "Delhi",
  },
  {
    text:
      "I was skeptical about Ayurvedic supplements at first, but the quality and results speak for themselves. No bloating, no fillers, just real ingredients.",
    author: "Ananya Iyer",
    location: "Bengaluru",
  },
  {
    text:
      "STRYCHNINE gives me clean energy for my workouts without the crash. Boomslang has become part of my everyday routine now.",
    author: "Karan Mehta",
    location: "Pune",
  },
];

export default function WhatOurCustomers() {
  return (
    <SectionWrapper background="dark" className={styles.section}>
      <h2 className={styles.mainTitle}>What Our Customers Say</h2>
      <p className={styles.subtitle}>
        Real experiences from real people on their journey with Boomslang Nutrition.
      </p>
      <div className={styles.grid}>
        {testimonials.map((testimonial) => (
          <div className={styles.card} key={testimonial.author}>
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className={styles.star} />
              ))}
            </div>
            <p className={styles.quote}>&ldquo;{testimonial.text}&rdquo;</p>
            <span className={styles.author}>
              {testimonial.author} ({testimonial.location})
            </span>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
