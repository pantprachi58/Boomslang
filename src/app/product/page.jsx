import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Newsletter from "@/components/sections/Newsletter/Newsletter";
import ProductDetail from "@/components/ProductDetail/ProductDetail";

export const metadata = {
  title: "GOKU GAINZ – Herbal Weight Gain Capsules | Boomslang Nutrition",
  description:"GOKU GAINZ by Boomslang Nutrition is a carefully formulated Ayurvedic supplement featuring Herbal Weight Gain Capsules designed to support healthy and natural weight gain. Created for individuals looking to improve body nourishment, appetite, strength, stamina, and overall wellness, these Weight Gain Capsules help complement your daily nutrition and fitness routine. If you're searching for the Best Weight Gain Capsules with an Ayurvedic herbal approach, GOKU GAINZ offers a thoughtfully crafted formula to support your wellness goals. For optimal results, use it alongside a balanced diet and regular exercise."
    };

const product = {
  name: "GOKU GAINZ",
  subtitle: "Herbal Weight Gain Capsules",
  tagline: "Natural Weight Gain | Strength | Stamina | Healthy Appetite Support",
  description:
    "GOKU GAINZ by Boomslang Nutrition is a carefully formulated Ayurvedic supplement featuring Herbal extracts that work in harmony with your body to support healthy weight gain, improved appetite, strength and overall wellness — without steroids or synthetic hormones.",
  discountLabel: "20% Off",
  oldPrice: 999,
  price: 799,
  images: [
    "/images/goku-gainz-three-bottles.png",
    "/images/goku-gainz-lifestyle-collage.png",
    "/images/strycnnine-mango.png",
    "/images/man-drinking-shaker.png",
  ],
  highlights: [
    "Supports healthy weight gain",
    "Helps improve appetite",
    "Supports strength and stamina",
    "Made with Ayurvedic herbal extracts",
    "No Steroids • No Synthetic Hormones",
    "Promotes better digestion & nutrient absorption",
  ],
  review: {
    author: "Anuj Sharma",
    location: "Delhi",
    text: "I gained decent weight after using i-Gain+. I trust this product a lot & many people ask me about my transformation. I recommend this to everyone.",
  },
  ingredients: [
    { name: "Ashwagandha Extract", image: "/images/productDetail/1.png" },
    { name: "Gokshura Extract", image: "/images/productDetail/2.png" },
    { name: "Vidarikand Extract", image: "/images/productDetail/3.png" },
    { name: "Pippali Extract", image: "/images/productDetail/4.png" },
    { name: "Amla Extract", image: "/images/productDetail/5.png" },
    { name: "Shatavari Extract", image: "/images/productDetail/6.png" },
    { name: "Safed Musli Extract", image: "/images/productDetail/7.png" },
    { name: "Kaunch Beej Extract", image: "/images/productDetail/8.png" },
  ],
  whyChoose:
    "Inspired by the principles of traditional Ayurveda, GOKU GAINZ Herbal Weight Gain capsules are formulated to support natural body nourishment and overall wellness. The carefully selected herbal ingredients work in harmony with your body's natural processes to help support healthy metabolism, energy levels, appetite, and overall physical development — without the use of artificial chemicals or synthetic hormones.",
  howToUse:
    "Take one Weight Gain Capsule daily, or as recommended by a qualified healthcare practitioner. For the best results, use these Weight Gain Capsules alongside a nutrient-rich diet, adequate hydration, and regular physical activity.",
  howToUseImage: "/images/productDetail/9.png",
  whoCanUse: [
    "Are looking to naturally increase body weight",
    "Experience low appetite or irregular eating habits",
    "Want to improve strength, stamina, and energy levels",
    "Maintain an active or fitness-focused lifestyle",
  ],
  storage:
    "Keep the container tightly closed and store it in a cool, dry environment away from direct heat, moisture, and sunlight. Ensure the product is kept out of reach of children.",
  storageImage: "/images/productDetail/10.png",
  disclaimer:
    "GOKU GAINZ Herbal Weight Gain Capsules are an Ayurvedic dietary supplement and should not be considered a medicine. This product is not intended to diagnose, treat, cure, or prevent any disease. Individual results may vary based on body type, dietary habits, lifestyle, and consistency of use.",
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
