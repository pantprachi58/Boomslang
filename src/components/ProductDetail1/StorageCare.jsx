import Image from "next/image";
import Container from "@/components/Container/Container";
import styles from "./StorageCare.module.css";

export default function StorageCare({ storage, disclaimer, image }) {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.imageWrap}>
            <Image
              src={image}
              alt="STRYCNNINE storage"
              width={500}
              height={500}
              className={styles.image}
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          </div>

          <div className={styles.content}>
            <h2 className={styles.title}>Storage &amp; Care</h2>
            <p className={styles.description}>{storage}</p>

            <h2 className={styles.title}>Disclaimer</h2>
            <p className={styles.description}>{disclaimer}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
