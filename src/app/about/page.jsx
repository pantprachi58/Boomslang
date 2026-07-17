import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import AboutHero from "@/components/sections/AboutHero/AboutHero";
import WhyWeStarted from "@/components/sections/WhyWeStarted/WhyWeStarted";
import OurVision from "@/components/sections/OurVision/OurVision";
import WhatWeServe from "@/components/sections/WhatWeServe/WhatWeServe";
import WhatMakesUsDifferent from "@/components/sections/WhatMakesUsDifferent/WhatMakesUsDifferent";
import WhatYouCanExpect from "@/components/sections/WhatYouCanExpect/WhatYouCanExpect";
import InspirationBehind from "@/components/sections/InspirationBehind/InspirationBehind";
import QualityCleansPure from "@/components/sections/QualityCleansPure/QualityCleansPure";
import WhatOurCustomers from "@/components/sections/WhatOurCustomers/WhatOurCustomers";
import FaqSection from "@/components/sections/FaqSection/FaqSection";
import CtaBanner from "@/components/sections/CtaBanner/CtaBanner";

export const metadata = {
  title: "About Us | BOOMSLANG Nutrition",
  description:
    "Learn about BOOMSLANG Nutrition's mission to provide premium ayurvedic supplements for healthy weight gain and wellness.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <AboutHero />
        <WhyWeStarted />
        <OurVision />
        <WhatWeServe />
        <WhatMakesUsDifferent />
        <WhatYouCanExpect />
        <InspirationBehind />
        <QualityCleansPure />
        <WhatOurCustomers />
        <FaqSection />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
