import SectionWrapper from "@/components/SectionWrapper/SectionWrapper";
import ProductCard from "@/components/ProductCard/ProductCard";
import styles from "./PreWorkoutFlavours.module.css";

const flavours = [
  {
    name: "Electric Blood Orange",
    image: "/images/1.png",
    description: "Bold citrus flavour with a refreshing kick.",
    originalPrice: 1499,
    discountedPrice: 1350,
    percentOff: 10,
  },
  {
    name: "Mango",
    image: "/images/2.png",
    description: "Smooth, tropical and packed with flavour.",
    originalPrice: 1499,
    discountedPrice: 1350,
    percentOff: 10,
  },
  {
    name: "Pineapple",
    image: "/images/3.png",
    description: "A vibrant and refreshing pre-workout experience.",
    originalPrice: 1499,
    discountedPrice: 1350,
    percentOff: 10,
  },
  {
    name: "Mix Fruit",
    image: "/images/4.png",
    description: "A balanced blend of fruity flavours in every serving.",
    originalPrice: 1499,
    discountedPrice: 1350,
    percentOff: 10,
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
            image={flavour.image}
            name={flavour.name}
            description={flavour.description}
            originalPrice={flavour.originalPrice}
            discountedPrice={flavour.discountedPrice}
            percentOff={flavour.percentOff}
            href="/product1"
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
