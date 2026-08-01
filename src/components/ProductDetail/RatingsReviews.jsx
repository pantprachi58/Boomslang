import CollapsibleSection from "./CollapsibleSection";
import { StarIcon, EditIcon } from "./icons";
import styles from "./RatingsReviews.module.css";

const fallbackReview = {
  author: "Amit Sharma",
  location: "Delhi",
  text: "Great quality and easy to include in my daily routine. The product feels genuine and the packaging was neat.",
};

export default function RatingsReviews({ review }) {
  const displayReview = review?.text ? review : fallbackReview;
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
          <p className={styles.reviewText}>{displayReview.text}</p>
          <span className={styles.reviewAuthor}>
            {displayReview.author} ({displayReview.location})
          </span>
        </div>
      </div>
    </CollapsibleSection>
  );
}
