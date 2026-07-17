import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import CartContent from "@/components/CartContent/CartContent";

export const metadata = {
  title: "Cart | Boomslang Nutrition",
  description: "Review your Boomslang Nutrition cart items before checkout.",
};

export default function CartPage() {
  return (
    <>
      <Header />
      <CartContent />
      <Footer />
    </>
  );
}
