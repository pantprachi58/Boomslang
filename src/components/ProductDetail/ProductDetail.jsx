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
  const hasIngredients = product.ingredients?.length > 0;
  const hasWhyChoose = Boolean(product.whyChoose);
  const hasHowToUse = Boolean(product.howToUse);
  const hasStorageCare = Boolean(product.storage || product.disclaimer);

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

      {hasIngredients && <KeyIngredients ingredients={product.ingredients} />}

      {hasWhyChoose && (
        <WhyChoose
          title={product.whyChooseTitle || `Why Choose ${product.name}?`}
          description={product.whyChoose}
        />
      )}

      {hasHowToUse && (
        <HowToUse
          title={product.howToUseTitle}
          howToUse={product.howToUse}
          whoCanUseTitle={product.whoCanUseTitle}
          whoCanUseLead={product.whoCanUseLead}
          whoCanUse={product.whoCanUse}
          image={product.howToUseImage || product.image}
          imageAlt={`${product.name} usage`}
        />
      )}

      {hasStorageCare && (
        <StorageCare
          storageTitle={product.storageTitle}
          storage={product.storage}
          disclaimerTitle={product.disclaimerTitle}
          disclaimer={product.disclaimer}
          image={product.storageImage || product.image}
          imageAlt={`${product.name} storage`}
        />
      )}
    </main>
  );
}
