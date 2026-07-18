import styles from "./ContactHero.module.css";

export default function ContactHero() {
  return (
    <section className={styles.contactHero}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h1 className={styles.title}>Contact us</h1>
        
      </div>
    </section>
  );
}
