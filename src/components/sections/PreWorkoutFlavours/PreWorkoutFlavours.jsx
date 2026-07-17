import SectionWrapper from "@/components/SectionWrapper/SectionWrapper";
import ProductCard from "@/components/ProductCard/ProductCard";
import { getShopProducts } from "@/data/products";
import styles from "./PreWorkoutFlavours.module.css";

const flavours = getShopProducts().filter(
  (product) => product.category === "STRYCHNINE"
);

export default function PreWorkoutFlavours() {
  return (
    <SectionWrapper background="offwhite" className={styles.section}>
      <div className={styles.heading}>
        <h2 className={styles.title}>
          <span className={styles.titleLine1}>Explore STRYCNNINE</span>
          <span className={styles.titleLine2}>Pre-Workout Supplement Flavours</span>
        </h2>
        <p className={styles.subtitle}>
          STRYCNNINE outstanding nutrients are workout supplement, available in refreshing
          flavours to support your workout routine, choose your favourite flavour and make every
          training session more enjoyable.
        </p>
      </div>
      <div className={styles.grid}>
        {flavours.map((flavour) => (
          <ProductCard
            key={flavour.slug}
            slug={flavour.slug}
            image={flavour.image}
            name={flavour.name}
            description={flavour.description}
            originalPrice={flavour.originalPrice}
            discountedPrice={flavour.discountedPrice}
            percentOff={flavour.percentOff}
            href={flavour.href}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
