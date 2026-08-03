import Script from "next/script";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Hero from "@/components/Hero/Hero";
import MeetProduct from "@/components/sections/MeetProduct/MeetProduct";
import PreWorkoutFlavours from "@/components/sections/PreWorkoutFlavours/PreWorkoutFlavours";
import NaturalSupport from "@/components/sections/NaturalSupport/NaturalSupport";
import JourneySupport from "@/components/sections/JourneySupport/JourneySupport";
import BlogSection from "@/components/sections/BlogSection/BlogSection";
import FaqSection from "@/components/sections/FaqSection/FaqSection";
import CtaBanner from "@/components/sections/CtaBanner/CtaBanner";
import Newsletter from "@/components/sections/Newsletter/Newsletter";
import { fetchFeaturedProduct, fetchPublicProducts } from "@/lib/productsApi";

export default async function Home() {
  const [featuredProduct, strychnineProducts] = await Promise.all([
    fetchFeaturedProduct(),
    fetchPublicProducts({ category: "STRYCHNINE", limit: 4 }),
  ]);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What Is GOKU GAINZ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "GOKU GAINZ is an Ayurvedic supplement for weight gain formulated with herbal ingredients that help support healthy weight gain, improve appetite, enhance nutrient absorption, and promote natural strength.",
        },
      },
      {
        "@type": "Question",
        name: "Who Can Use GOKU GAINZ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "GOKU GAINZ is suitable for adults who find it difficult to gain healthy body weight or are looking for additional nutritional support as part of a balanced lifestyle.",
        },
      },
      {
        "@type": "Question",
        name: "How Should I Take GOKU GAINZ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Take GOKU GAINZ exactly as directed on the product label or as recommended by your healthcare professional.",
        },
      },
      {
        "@type": "Question",
        name: "How Long Does It Take to See Results?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Results may vary depending on factors such as diet, metabolism, lifestyle, and consistency. Following a balanced diet and healthy routine can help support your progress.",
        },
      },
      {
        "@type": "Question",
        name: "Can I Take GOKU GAINZ Along with Exercise?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Combining regular exercise, balanced nutrition, quality sleep, and consistent supplement use can support your overall wellness and weight gain goals.",
        },
      },
      {
        "@type": "Question",
        name: "What Makes GOKU GAINZ Different?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "GOKU GAINZ is formulated with carefully selected Ayurvedic herbs that work together to support healthy weight gain, appetite, digestion, and overall vitality. It is designed to complement a balanced diet and an active lifestyle.",
        },
      },
    ],
  };

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <Header featuredProduct={featuredProduct} />
      <main>
        <Hero featuredProduct={featuredProduct} />
        <MeetProduct featuredProduct={featuredProduct} />
        <PreWorkoutFlavours products={strychnineProducts.products} />
        <NaturalSupport />
        <JourneySupport />
        <BlogSection />
        <FaqSection />
        <CtaBanner featuredProduct={featuredProduct} />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
