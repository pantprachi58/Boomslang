import styles from "./ContactInfo.module.css";

export default function ContactInfo() {
  return (
    <section className={styles.contactInfoSection}>
      <div className={styles.container}>
        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <div className={styles.iconWrapper}>
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <h3 className={styles.cardTitle}>Our Location</h3>
            <p className={styles.cardText}>
              Boomslang Nutrition Headquarters
              <br />
              Coming Soon
            </p>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.iconWrapper}>
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <h3 className={styles.cardTitle}>Email Us</h3>
            <p className={styles.cardText}>
              <a href="mailto:support@boomslangnutrition.com" className={styles.link}>
                support@boomslangnutrition.com
              </a>
            </p>
            <p className={styles.cardSubtext}>
              We'll respond within 24-48 hours
            </p>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.iconWrapper}>
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
            <h3 className={styles.cardTitle}>Call Us</h3>
            <p className={styles.cardText}>
              Coming Soon
            </p>
            <p className={styles.cardSubtext}>
              Mon-Fri: 9:00 AM - 6:00 PM
            </p>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.iconWrapper}>
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <h3 className={styles.cardTitle}>Business Hours</h3>
            <p className={styles.cardText}>
              Monday - Friday: 9:00 AM - 6:00 PM
              <br />
              Saturday: 10:00 AM - 4:00 PM
              <br />
              Sunday: Closed
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
