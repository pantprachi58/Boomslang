import Container from "@/components/Container/Container";
import styles from "./TrustStrip.module.css";

const PLACEHOLDER_COUNT = 6;

export default function TrustStrip() {
  return (
    <div className={styles.strip} aria-hidden="true">
      <Container className={styles.inner}>
        {Array.from({ length: PLACEHOLDER_COUNT }).map((_, index) => (
          <span key={index} className={styles.badge} />
        ))}
      </Container>
    </div>
  );
}
