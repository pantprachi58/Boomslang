import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ContactHero from "@/components/sections/ContactHero/ContactHero";
import ContactForm from "@/components/sections/ContactForm/ContactForm";
import ContactInfo from "@/components/sections/ContactInfo/ContactInfo";
import ContactMap from "@/components/sections/ContactMap/ContactMap";

export const metadata = {
  title: "Contact Us | BOOMSLANG Nutrition",
  description:
    "Get in touch with BOOMSLANG Nutrition. We're here to answer your questions about our ayurvedic supplements and products.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <ContactHero />
        <ContactForm />
        <ContactInfo />
        <ContactMap />
      </main>
      <Footer />
    </>
  );
}
