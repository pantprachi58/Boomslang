# Banner Implementation Guide

## Available Banners

The following banner images are available in `/public/images/banner/`:

1. `about us (2).png` - For About page ✅ **IMPLEMENTED**
2. `blog.png` - For Blog listing page
3. `blog 2.png` - Alternative blog banner
4. `contact us.png` - For Contact page
5. `Product.png` - For Shop and Product pages ✅ **IMPLEMENTED**

## Pages Updated

### ✅ About Page (`/about`)
- Banner: `about us (2).png`
- Component: `AboutHero.jsx`
- The banner is displayed at the top of the About page

### ✅ Shop Page (`/shop`)
- Banner: `Product.png`
- Component: `ShopContent.jsx`
- The banner is displayed at the top before the shop filters and products

### ✅ Product Pages (`/product` and `/product1`)
- Banner: `Product.png`
- Uses the reusable `PageBanner` component
- The banner is displayed at the top of product detail pages

## Future Implementation

### Blog Pages (Not Yet Created)

When creating blog pages, use the following structure:

**For Blog Listing Page:**
```jsx
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import PageBanner from "@/components/PageBanner/PageBanner";
// ... other imports

export default function BlogPage() {
  return (
    <>
      <Header />
      <PageBanner src="/images/banner/blog 2.png" alt="Blog Banner" />
      {/* Blog content components */}
      <Footer />
    </>
  );
}
```

**For Blog Detail Page:**
```jsx
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import PageBanner from "@/components/PageBanner/PageBanner";
// ... other imports

export default function BlogDetailPage() {
  return (
    <>
      <Header />
      <PageBanner src="/images/banner/blog.png" alt="Blog Article Banner" />
      {/* Blog article content */}
      <Footer />
    </>
  );
}
```

### Contact Page (Not Yet Created)

When creating the contact page, use:

```jsx
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import PageBanner from "@/components/PageBanner/PageBanner";
// ... other imports

export default function ContactPage() {
  return (
    <>
      <Header />
      <PageBanner src="/images/banner/contact us.png" alt="Contact Us Banner" />
      {/* Contact form and information */}
      <Footer />
    </>
  );
}
```

## Using the PageBanner Component

A reusable `PageBanner` component has been created at:
`/src/components/PageBanner/PageBanner.jsx`

### Usage:
```jsx
import PageBanner from "@/components/PageBanner/PageBanner";

<PageBanner src="/images/banner/your-banner.png" alt="Description" />
```

### Props:
- `src` (required): Path to the banner image
- `alt` (optional): Alt text for the image, defaults to "Banner"

### Responsive Behavior:
- Mobile: 300px height
- Tablet (768px+): 400px height
- Desktop (1200px+): 500px height

The banner automatically covers the full width and maintains aspect ratio through object-fit: cover.
