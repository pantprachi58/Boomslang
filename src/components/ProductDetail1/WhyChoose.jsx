import Container from "@/components/Container/Container";
import { resolveAssetUrl } from "@/lib/assetUrl";
import styles from "./WhyChoose.module.css";

export default function WhyChoose({ title, description, image }) {
  const imageUrl = resolveAssetUrl(image);

  return (
    <section className={styles.section}>
      <Container
        className={styles.inner}
        style={
          imageUrl
            ? {
                backgroundImage: `linear-gradient(rgba(15, 40, 20, 0.76), rgba(12, 33, 16, 0.86)), url("${imageUrl}")`,
              }
            : undefined
        }
      >
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </Container>
    </section>
  );
}
