import SectionWrapper from "@/components/SectionWrapper/SectionWrapper";
import ProductCard from "@/components/ProductCard/ProductCard";
import styles from "./PreWorkoutFlavours.module.css";

const flavours = [
  {
    name: "Electric Blood Orange",
    description: "Bold citrus flavour with a refreshing kick.",
  },
  {
    name: "Mango",
    description: "Smooth, tropical and packed with flavour.",
  },
  {
    name: "Pineapple",
    description: "A vibrant and refreshing pre-workout experience.",
  },
  {
    name: "Mix Fruit",
    description: "A balanced blend of fruity flavours in every serving.",
  },
];

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
            key={flavour.name}
            image="/images/strycnnine-mango.png"
            name={flavour.name}
            description={flavour.description}
            href="/shop/strycnnine"
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
