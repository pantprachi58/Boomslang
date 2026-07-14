import Image from "next/image";
import Container from "@/components/Container/Container";
import { CheckIcon } from "./icons";
import styles from "./HowToUse.module.css";

export default function HowToUse({ howToUse, whoCanUse = [], image }) {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.content}>
            <h2 className={styles.title}>How to Use</h2>
            <p className={styles.description}>{howToUse}</p>

            <h2 className={styles.title}>Who Can Use It?</h2>
            <p className={styles.subLabel}>Suitable for adults who:</p>
            <ul className={styles.checklist}>
              {whoCanUse.map((item) => (
                <li key={item} className={styles.checkItem}>
                  <CheckIcon className={styles.checkIcon} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.imageWrap}>
            <Image
              src={image}
              alt="How to use GOKU GAINZ"
              width={540}
              height={520}
              className={styles.image}
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
