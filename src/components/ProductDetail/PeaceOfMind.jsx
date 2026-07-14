import CollapsibleSection from "./CollapsibleSection";
import { ReturnIcon, CashIcon, SupportIcon } from "./icons";
import styles from "./PeaceOfMind.module.css";

const items = [
  {
    Icon: ReturnIcon,
    title: "7 days return / refund",
    note: "(in case of damage or wrong product received)",
  },
  { Icon: CashIcon, title: "Cash on delivery", note: "" },
  { Icon: SupportIcon, title: "24x7 Customer Support", note: "" },
];

export default function PeaceOfMind() {
  return (
    <CollapsibleSection title="Shop With Peace of Mind" defaultOpen>
      <div className={styles.grid}>
        {items.map(({ Icon, title, note }) => (
          <div key={title} className={styles.item}>
            <span className={styles.badge}>
              <Icon />
            </span>
            <span className={styles.itemTitle}>{title}</span>
            {note && <span className={styles.itemNote}>{note}</span>}
          </div>
        ))}
      </div>
    </CollapsibleSection>
  );
}
