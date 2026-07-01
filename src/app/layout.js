import { Anybody } from "next/font/google";
import "./globals.css";

const anybody = Anybody({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-anybody",
  display: "swap",
});

export const metadata = {
  title: "Boomslang Nutrition | Ayurvedic Supplements for Weight Gain",
  description:
    "GOKU GAINZ is Boomslang Nutrition's Ayurvedic weight gain supplement, crafted with herbal ingredients to support healthy weight gain, improve appetite, and enhance nutrient absorption.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={anybody.variable}>
      <body>{children}</body>
    </html>
  );
}
