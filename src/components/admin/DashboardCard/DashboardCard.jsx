import { DollarIcon, PackageIcon, TagIcon, UsersIcon } from "@/components/admin/icons/AdminIcons";
import styles from "./DashboardCard.module.css";

export default function DashboardCard({ title, value, change, changeType, icon }) {
  const getIcon = () => {
    switch (icon) {
      case "revenue":
        return <DollarIcon />;
      case "orders":
        return <PackageIcon />;
      case "products":
        return <TagIcon />;
      case "customers":
        return <UsersIcon />;
      default:
        return <DollarIcon />;
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.icon}>{getIcon()}</span>
      </div>
      <div className={styles.content}>
        <p className={styles.value}>{value}</p>
        <span
          className={`${styles.change} ${
            changeType === "positive"
              ? styles.positive
              : changeType === "negative"
              ? styles.negative
              : styles.neutral
          }`}
        >
          {changeType === "positive" && "↑ "}
          {changeType === "negative" && "↓ "}
          {change}
        </span>
      </div>
    </div>
  );
}
