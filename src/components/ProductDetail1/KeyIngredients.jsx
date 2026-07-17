import Image from "next/image";
import Container from "@/components/Container/Container";
import styles from "./KeyIngredients.module.css";

export default function KeyIngredients({ ingredients = [] }) {
  return (
    <section className={styles.section}>
      <Container>
        <h2 className={styles.title}>Key Ingredients</h2>
        <div className={styles.grid}>
          {ingredients.map((item) => (
            <div key={item.name} className={styles.card}>
              <div className={styles.imageWrap}>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={180}
                  height={180}
                  className={styles.image}
                  sizes="(max-width: 576px) 45vw, 180px"
                />
              </div>
              <h3 className={styles.name}>{item.name}</h3>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
