import CollapsibleSection from "./CollapsibleSection";
import { CheckIcon } from "./icons";
import styles from "./ProductHighlights.module.css";

export default function ProductHighlights({ highlights = [] }) {
  return (
    <CollapsibleSection title="Product Highlights" defaultOpen>
      <ul className={styles.list}>
        {highlights.map((item, index) => {
          const text = typeof item === "string" ? item : item?.text;
          if (!text) return null;

          return (
            <li key={`${text}-${index}`} className={styles.item}>
              <CheckIcon className={styles.checkIcon} />
              <span>{text}</span>
            </li>
          );
        })}
      </ul>
    </CollapsibleSection>
  );
}
