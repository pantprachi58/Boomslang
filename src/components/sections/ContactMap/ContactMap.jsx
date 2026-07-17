"use client";

import styles from "./ContactMap.module.css";

export default function ContactMap() {
  return (
    <section className={styles.mapSection}>
      <div className={styles.container}>
        <div className={styles.mapHeader}>
          <h2 className={styles.title}>Find Us On The Map</h2>
          <p className={styles.description}>
            Visit our location or reach out to us through any of the contact methods above.
          </p>
        </div>
        <div className={styles.mapWrapper}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.2876602812744!2d77.38078631508045!3d28.62798298242795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5456ef36d9f%3A0x3b7191b1286136c8!2sNoida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
            className={styles.map}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Boomslang Nutrition Location"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
