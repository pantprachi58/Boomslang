"use client";

import { useState } from "react";
import Image from "next/image";
import Container from "@/components/Container/Container";
import styles from "./Newsletter.module.css";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <section className={styles.banner}>
      <div className={styles.bgLeft} aria-hidden="true">
        <Image src="/images/footer-ember-left.webp" alt="" fill className={styles.bgImg} />
      </div>
      <div className={styles.bgRight} aria-hidden="true">
        <Image src="/images/footer-goku-right.webp" alt="" fill className={styles.bgImg} />
      </div>
      <Container className={styles.grid}>
        <h2 className={styles.title}>
          Stay Connected <span className={styles.highlight}>With BOOMSLANG Nutrition</span>
        </h2>
        <p className={styles.subtitle}>
         Get expert nutrition tips, healthy weight gain advice, exclusive offers, and product updates delivered straight to your inbox.
        </p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="email"
            required
            placeholder="Enter your email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={styles.input}
            aria-label="Email address"
          />
          <button type="submit" className={styles.button}>
            Subscribe
          </button>
        </form>
      </Container>
    </section>
  );
}
