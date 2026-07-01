"use client";

import { useState } from "react";
import Container from "@/components/Container/Container";
import Button from "@/components/Button/Button";
import styles from "./Newsletter.module.css";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section className={styles.section}>
      <Container className={styles.inner}>
        <h2 className={styles.title}>
          <span className={styles.highlight}>Stay Connected</span> With
          <br />
          BOOMSLANG Nutrition
        </h2>
        <p className={styles.description}>
          Get expert nutrition tips, healthy weight gain advice, exclusive
          offers, and product updates delivered straight to your inbox.
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="newsletter-email" className={styles.srOnly}>
            Email address
          </label>
          {submitted ? (
            <p className={styles.success}>Thanks for subscribing!</p>
          ) : (
            <>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className={styles.input}
              />
              <Button type="submit" variant="light" size="lg">
                Subscribe
              </Button>
            </>
          )}
        </form>
      </Container>
    </section>
  );
}
