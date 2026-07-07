import { Anybody } from "next/font/google";
import "./globals.css";

const anybody = Anybody({
  subsets: ["latin"],
  variable: "--font-anybody",
  display: "swap",
});

export const metadata = {
  title: "Boomslang Nutrition | Ayurvedic Supplements For Weight Gain",
  description:
    "Boomslang Nutrition offers ayurvedic supplements for healthy weight gain, pre-workout formulas and natural muscle support.",
  icons: {
    icon: "/images/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={anybody.variable}>
      <body>{children}</body>
    </html>
  );
}
