import styles from "./ContactHero.module.css";

export default function ContactHero() {
  return (
    <section className={styles.contactHero}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h1 className={styles.title}>Get In Touch</h1>
        <p className={styles.subtitle}>
          We'd love to hear from you. Reach out to us for any questions or support.
        </p>
      </div>
    </section>
  );
}
