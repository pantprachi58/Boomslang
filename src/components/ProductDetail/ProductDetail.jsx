import Container from "@/components/Container/Container";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import DeliveryDetails from "./DeliveryDetails";
import PeaceOfMind from "./PeaceOfMind";
import ProductHighlights from "./ProductHighlights";
import RatingsReviews from "./RatingsReviews";
import KeyIngredients from "./KeyIngredients";
import WhyChoose from "./WhyChoose";
import HowToUse from "./HowToUse";
import StorageCare from "./StorageCare";
import styles from "./ProductDetail.module.css";

export default function ProductDetail({ product }) {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Container className={styles.heroInner}>
          <div className={styles.gallery}>
            <ProductGallery images={product.images} alt={product.name} />
          </div>

          <div className={styles.details}>
            <ProductInfo product={product} />
            <DeliveryDetails />
            <div className={styles.accordions}>
              <PeaceOfMind />
              <ProductHighlights highlights={product.highlights} />
              <RatingsReviews review={product.review} />
            </div>
          </div>
        </Container>
      </section>

      <KeyIngredients ingredients={product.ingredients} />

      <WhyChoose title="Why Choose GOKU GAINZ?" description={product.whyChoose} />

      <HowToUse
        howToUse={product.howToUse}
        whoCanUse={product.whoCanUse}
        image={product.howToUseImage}
      />

      <StorageCare
        storage={product.storage}
        disclaimer={product.disclaimer}
        image={product.storageImage}
      />
    </main>
  );
}
