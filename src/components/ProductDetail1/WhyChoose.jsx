import Container from "@/components/Container/Container";
import styles from "./WhyChoose.module.css";

export default function WhyChoose({ title, description }) {
  return (
    <section className={styles.section}>
      <Container className={styles.inner}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </Container>
    </section>
  );
}
