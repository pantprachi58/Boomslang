import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ShopContent from "@/components/sections/ShopContent/ShopContent";
import { fetchFeaturedProduct, fetchPublicProducts } from "@/lib/productsApi";
import styles from "./Shop.module.css";

export const metadata = {
  title: "Shop | Boomslang Nutrition",
  description: "Browse our collection of premium ayurvedic supplements and pre-workout formulas.",
};

export default async function ShopPage({ searchParams }) {
  const initialSearch = searchParams?.search || "";
  const [featuredProduct, initialProducts] = await Promise.all([
    fetchFeaturedProduct(),
    fetchPublicProducts({ page: 1, limit: 6, search: initialSearch }),
  ]);

  return (
    <>
      <Header featuredProduct={featuredProduct} />
      <main className={styles.shopPage}>
        <ShopContent initialSearch={initialSearch} initialProducts={initialProducts} />
      </main>
      <Footer />
    </>
  );
}
