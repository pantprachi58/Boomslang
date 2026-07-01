import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import TrustStrip from "@/components/TrustStrip/TrustStrip";
import MeetProduct from "@/components/MeetProduct/MeetProduct";
import WhyChoose from "@/components/WhyChoose/WhyChoose";
import FlavourShowcase from "@/components/FlavourShowcase/FlavourShowcase";
import NaturalSupport from "@/components/NaturalSupport/NaturalSupport";
import WeightGainStory from "@/components/WeightGainStory/WeightGainStory";
import ArticlesGrid from "@/components/ArticlesGrid/ArticlesGrid";
import FAQAccordion from "@/components/FAQAccordion/FAQAccordion";
import GalleryCta from "@/components/GalleryCta/GalleryCta";
import Newsletter from "@/components/Newsletter/Newsletter";
import Footer from "@/components/Footer/Footer";
import TexturedZone from "@/components/TexturedZone/TexturedZone";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <TexturedZone tone="red">
          <Hero />
          <TrustStrip />
          <MeetProduct />
          <WhyChoose />
          <FlavourShowcase />
          <NaturalSupport />
          <WeightGainStory />
          <ArticlesGrid />
          <FAQAccordion />
        </TexturedZone>
        <GalleryCta />
      </main>
      <TexturedZone tone="green">
        <Newsletter />
        <Footer />
      </TexturedZone>
    </>
  );
}
