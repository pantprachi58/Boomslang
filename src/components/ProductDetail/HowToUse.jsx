import Image from "next/image";
import Container from "@/components/Container/Container";
import { CheckIcon } from "./icons";
import styles from "./HowToUse.module.css";

export default function HowToUse({
  title = "How to Use",
  howToUse,
  whoCanUseTitle = "Who Can Use It?",
  whoCanUseLead = "Suitable for adults who:",
  whoCanUse = [],
  image,
  imageAlt = "Product usage",
}) {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.content}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.description}>{howToUse}</p>

            <h2 className={styles.title}>{whoCanUseTitle}</h2>
            {whoCanUseLead && <p className={styles.subLabel}>{whoCanUseLead}</p>}
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
              alt={imageAlt}
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
