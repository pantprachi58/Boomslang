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
  const primaryTitle = product.primarySectionTitle || product.whyChooseTitle || `Why Choose ${product.name}?`;
  const primaryDescription = product.primarySectionDescription || product.whyChoose;
  const primaryImage = product.primarySectionImage;
  const secondaryTitle = product.secondarySectionTitle || product.howToUseTitle || "How to Use";
  const secondaryDescription = product.secondarySectionDescription || product.howToUse;
  const secondaryImage = product.secondarySectionImage || product.howToUseImage || product.image;
  const suitableForTitle = product.suitableForTitle || product.whoCanUseTitle;
  const suitableForLead = product.suitableForLead || product.whoCanUseLead;
  const suitableForItems = product.suitableForItems || product.whoCanUse || [];
  const storageTitle = product.storageCareTitle || product.storageTitle || "Storage & Care";
  const storageDescription = product.storageCareDescription || product.storage;
  const storageImage = product.primarySectionImage || product.storageImage || product.image;
  const hasWhyChoose = Boolean(primaryDescription);
  const hasHowToUse = Boolean(secondaryDescription || suitableForItems.length > 0);
  const hasStorageCare = Boolean(storageDescription || product.disclaimer);

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
          title={primaryTitle}
          description={primaryDescription}
          image={primaryImage}
        />
      )}

      {hasHowToUse && (
        <HowToUse
          title={secondaryTitle}
          howToUse={secondaryDescription}
          whoCanUseTitle={suitableForTitle}
          whoCanUseLead={suitableForLead}
          whoCanUse={suitableForItems}
          image={secondaryImage}
          imageAlt={`${product.name} usage`}
        />
      )}

      {hasStorageCare && (
        <StorageCare
          storageTitle={storageTitle}
          storage={storageDescription}
          disclaimerTitle={product.disclaimerTitle}
          disclaimer={product.disclaimer}
          image={storageImage}
          imageAlt={`${product.name} storage`}
        />
      )}
    </main>
  );
}
