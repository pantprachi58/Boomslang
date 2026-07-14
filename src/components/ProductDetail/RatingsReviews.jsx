import CollapsibleSection from "./CollapsibleSection";
import { StarIcon, EditIcon } from "./icons";
import styles from "./RatingsReviews.module.css";

export default function RatingsReviews({ review }) {
  const writeReviewBtn = (
    <button type="button" className={styles.writeReview}>
      <EditIcon />
      Write review
    </button>
  );

  return (
    <CollapsibleSection title="Ratings and Reviews" headerExtra={writeReviewBtn} defaultOpen>
      <h4 className={styles.subheading}>Customer Reviews</h4>
      <div className={styles.reviewCard}>
        <div className={styles.avatar} aria-hidden="true" />
        <div className={styles.reviewContent}>
          <div className={styles.stars}>
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} filled className={styles.star} />
            ))}
          </div>
          <p className={styles.reviewText}>{review.text}</p>
          <span className={styles.reviewAuthor}>
            {review.author} ({review.location})
          </span>
        </div>
      </div>
    </CollapsibleSection>
  );
}
