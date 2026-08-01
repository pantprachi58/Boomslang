import { notFound } from "next/navigation";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Newsletter from "@/components/sections/Newsletter/Newsletter";
import ProductDetail from "@/components/ProductDetail/ProductDetail";
import { allProducts } from "@/data/products";
import { fetchFeaturedProduct, fetchProductBySlug } from "@/lib/productsApi";

export function generateStaticParams() {
  return allProducts.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }) {
  const product = await fetchProductBySlug(params.slug);

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

export default async function ShopProductPage({ params }) {
  const [product, featuredProduct] = await Promise.all([
    fetchProductBySlug(params.slug),
    fetchFeaturedProduct(),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Header featuredProduct={featuredProduct} />
      <ProductDetail product={product} />
      <Newsletter />
      <Footer />
    </>
  );
}
