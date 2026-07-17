import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import CheckoutContent from "@/components/CheckoutContent/CheckoutContent";

export const metadata = {
  title: "Checkout | Boomslang Nutrition",
  description: "Complete your Boomslang Nutrition order details and payment confirmation.",
};

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <CheckoutContent />
      <Footer />
    </>
  );
}
