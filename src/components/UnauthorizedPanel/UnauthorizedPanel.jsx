import Link from "next/link";
import { Home, ShieldAlert, UserRound } from "lucide-react";
import styles from "./UnauthorizedPanel.module.css";

export default function UnauthorizedPanel() {
  return (
    <main className={styles.page}>
      <section className={styles.panel}>
        <div className={styles.iconWrap}>
          <ShieldAlert aria-hidden="true" />
        </div>
        <h1>Unauthorized Access</h1>
        <p>You do not have permission to access the admin panel.</p>
        <div className={styles.actions}>
          <Link href="/" className={styles.primaryBtn}>
            <Home aria-hidden="true" />
            Go Home
          </Link>
          <Link href="/profile" className={styles.secondaryBtn}>
            <UserRound aria-hidden="true" />
            My Profile
          </Link>
        </div>
      </section>
    </main>
  );
}
