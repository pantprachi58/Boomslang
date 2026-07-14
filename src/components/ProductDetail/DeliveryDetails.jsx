import { PinIcon } from "@/components/icons/Icons";
import { TruckIcon } from "./icons";
import styles from "./DeliveryDetails.module.css";

export default function DeliveryDetails() {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.heading}>Delivery Details</h3>
      <div className={styles.card}>
        <div className={styles.row}>
          <PinIcon className={styles.rowIcon} />
          <span className={styles.rowText}>Location not set</span>
          <button type="button" className={styles.selectLocation}>
            Select Delivery Location
          </button>
        </div>
        <div className={styles.divider} />
        <div className={styles.row}>
          <TruckIcon className={styles.rowIcon} />
          <span className={styles.rowText}>Deliver in 5-6 days</span>
        </div>
      </div>
    </div>
  );
}
