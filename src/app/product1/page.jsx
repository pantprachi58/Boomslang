import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Newsletter from "@/components/sections/Newsletter/Newsletter";
import ProductDetail from "@/components/ProductDetail/ProductDetail";
import { getProductBySlug } from "@/data/products";

const product = getProductBySlug("strychnine-mango");

export const metadata = {
  title: product.metaTitle,
  description: product.metaDescription,
};

export default function ProductPage() {
  return (
    <>
      <Header />
      <ProductDetail product={product} />
      <Newsletter />
      <Footer />
    </>
  );
}
