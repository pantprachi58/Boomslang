import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Container from "@/components/Container/Container";
import Button from "@/components/Button/Button";
import styles from "./not-found.module.css";

export const metadata = {
  title: "Page Not Found | Boomslang Nutrition",
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <Container>
          <section className={styles.panel} aria-labelledby="not-found-title">
            <p className={styles.code}>404</p>
            <h1 id="not-found-title" className={styles.title}>
              Page Not Found
            </h1>
            <p className={styles.message}>
              The page you are looking for may have moved, expired, or never existed.
            </p>
            <div className={styles.actions}>
              <Button href="/" size="small">
                Go To Home
              </Button>
              <Button href="/shop" variant="outline" size="small">
                Shop Products
              </Button>
            </div>
          </section>
        </Container>
      </main>
      <Footer />
    </>
  );
}
