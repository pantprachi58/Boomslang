import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import UnauthorizedPanel from "@/components/UnauthorizedPanel/UnauthorizedPanel";

export const metadata = {
  title: "Unauthorized - Boomslang Nutrition",
};

export default function UnauthorizedPage() {
  return (
    <>
      <Header />
      <UnauthorizedPanel />
      <Footer />
    </>
  );
}
