import { notFound } from "next/navigation";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Newsletter from "@/components/sections/Newsletter/Newsletter";
import ProductDetail from "@/components/ProductDetail/ProductDetail";
import { allProducts, getProductBySlug } from "@/data/products";

export function generateStaticParams() {
  return allProducts.map((product) => ({
    slug: product.slug,
  }));
}

export function generateMetadata({ params }) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    return {
      title: "Product Not Found | Boomslang Nutrition",
    };
  }

  return {
    title: product.metaTitle,
    description: product.metaDescription,
  };
}

export default function ShopProductPage({ params }) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Header />
      <ProductDetail product={product} />
      <Newsletter />
      <Footer />
    </>
  );
}
