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
  metadataBase: new URL("https://www.theboomslangnutritions.com"),
  title: "The Boomslang Nutritions | Ayurvedic Weight Gain Supplements",
  description:
    "Discover Ayurvedic weight gain supplements from The Boomslang Nutritions. Herbal formulas designed to support healthy weight gain, appetite, digestion, and overall wellness.",
  icons: {
    icon: "/images/logo.png",
  },
  verification: {
    google: "G7P6vTQ6oymvUxtcDvfEGfDPqXuVHE0NLlODjnroDpM",
  },
  openGraph: {
    type: "website",
    siteName: "The Boomslang Nutritions",
    title: "The Boomslang Nutritions | Ayurvedic Weight Gain Supplements",
    description:
      "Discover Ayurvedic weight gain supplements from The Boomslang Nutritions. Herbal formulas designed to support healthy weight gain, appetite, digestion, and overall wellness.",
    url: "https://www.theboomslangnutritions.com/",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Boomslang Nutritions - Ayurvedic Weight Gain Supplements",
      },
    ],
    locale: "en_IN",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.theboomslangnutritions.com/#organization",
    name: "The Boomslang Nutritions",
    url: "https://www.theboomslangnutritions.com/",
    logo: "https://www.theboomslangnutritions.com/images/logo.png",
    description:
      "Ayurvedic supplements for weight gain by The Boomslang Nutritions. Herbal formulas to support healthy weight gain, energy, wellness, and everyday vitality.",
    email: "support@theboomslangnutritions.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "G-190, Shop No. 3, Dilshad Colony",
      addressLocality: "Delhi",
      addressRegion: "Delhi",
      postalCode: "110095",
      addressCountry: "IN",
    },
     "sameAs": [
    "https://www.instagram.com/boomslangnutritions/",
    "https://www.facebook.com/boomslangnuitrations",
  ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.theboomslangnutritions.com/#website",
    url: "https://www.theboomslangnutritions.com/",
    name: "The Boomslang Nutritions",
    description:
      "Ayurvedic supplements for weight gain by Boomslang Nutritions.",
    publisher: {
      "@id": "https://www.theboomslangnutritions.com/#organization",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://www.theboomslangnutritions.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: "en-IN",
  };

  return (
    <html lang="en" className={`${anybody.variable} ${inter.variable}`}>
      <head>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
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
