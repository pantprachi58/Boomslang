import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ShopContent from "@/components/sections/ShopContent/ShopContent";
import styles from "./Shop.module.css";

export const metadata = {
  title: "Shop | Boomslang Nutrition",
  description: "Browse our collection of premium ayurvedic supplements and pre-workout formulas.",
};

export default function ShopPage() {
  return (
    <>
      <Header />
      <main className={styles.shopPage}>
        <ShopContent />
      </main>
      <Footer />
    </>
  );
}
