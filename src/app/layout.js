import { Anybody, Inter } from "next/font/google";
import Script from "next/script";
import { AuthProvider } from "@/components/AuthProvider/AuthProvider";
import { CartProvider } from "@/components/CartProvider/CartProvider";
import "./globals.css";

const anybody = Anybody({
  subsets: ["latin"],
  variable: "--font-anybody",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Boomslang Nutrition | Ayurvedic Supplements For Weight Gain",
  description:
    "Boomslang Nutrition offers ayurvedic supplements for healthy weight gain, pre-workout formulas and natural muscle support.",
  icons: {
    icon: "/images/logo.png",
  },
  verification: {
    google: "G7P6vTQ6oymvUxtcDvfEGfDPqXuVHE0NLlODjnroDpM",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${anybody.variable} ${inter.variable}`}>
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MQLNHWNK');`}
      </Script>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MQLNHWNK"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
