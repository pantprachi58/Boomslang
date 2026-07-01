import SectionWrapper from "@/components/SectionWrapper/SectionWrapper";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import { articles } from "@/data/articles";
import styles from "./ArticlesGrid.module.css";

export default function ArticlesGrid() {
  return (
    <SectionWrapper>
      <SectionHeading
        eyebrow="Learn More About"
        withLines
        title="Weight Gain & Pre Workout Supplements"
        description="Explore expert articles, nutrition tips, and wellness guides to help you make informed choices throughout your weight gain journey."
      />

      <div className={styles.grid}>
        {articles.map((article) => (
          <article key={article.number} className={styles.card}>
            <span className={styles.number}>{article.number}</span>
            <h3 className={styles.title}>{article.title}</h3>
            <p className={styles.desc}>{article.description}</p>
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
}
