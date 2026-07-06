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

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <MeetProduct />
        <PreWorkoutFlavours />
        <NaturalSupport />
        <JourneySupport />
        <BlogSection />
        <FaqSection />
        <CtaBanner />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
