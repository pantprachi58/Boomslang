import CollapsibleSection from "./CollapsibleSection";
import { CheckIcon } from "./icons";
import styles from "./ProductHighlights.module.css";

export default function ProductHighlights({ highlights = [] }) {
  return (
    <CollapsibleSection title="Product Highlights" defaultOpen>
      <ul className={styles.list}>
        {highlights.map((item) => (
          <li key={item} className={styles.item}>
            <CheckIcon className={styles.checkIcon} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </CollapsibleSection>
  );
}
