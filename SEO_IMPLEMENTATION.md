# SEO Implementation Guide

## Overview
This document describes the SEO elements implemented for The Boomslang Nutritions website.

## Implemented Elements

### 1. Structured Data (Schema.org)

#### Organization Schema
Located in: `src/app/layout.js`

- Includes company name, logo, description, contact email, and physical address
- Social media profiles (Instagram, Facebook, LinkedIn, YouTube)
- **Action Required:** Update the `sameAs` URLs with your actual social media profile links

#### Website Schema with SearchAction
Located in: `src/app/layout.js`

- Enables Google search box in search results
- Links to organization schema
- **Note:** You'll need to implement a search page at `/search?q={query}` for this to work fully

#### FAQ Schema
Located in: `src/app/page.js` (Home page)

- 6 questions about GOKU GAINZ product
- Helps with rich snippets in search results
- Displayed on the homepage

### 2. Open Graph Tags

Located in: `src/app/layout.js` (metadata export)

Includes:
- og:type: website
- og:site_name
- og:title
- og:description
- og:url
- og:image (1200x630px)
- og:locale

**Action Required:** 
- Create and add an og-image.jpg (1200x630px) to `/public/images/` directory
- This image will be used when your website is shared on social media

### 3. Robots.txt

Located in: `public/robots.txt`

- Allows all search engines
- Blocks admin, cart, checkout, login, and account pages
- Points to sitemap.xml

### 4. XML Sitemap

Located in: `src/app/sitemap.js`

The sitemap is dynamically generated and includes:
- Static pages (home, about, shop, contact, blog)
- All products from your database
- Blog posts (placeholder entries included)

**Features:**
- Automatically updates when products change
- Includes lastModified dates
- Sets priority and change frequency
- Accessible at: `https://www.theboomslangnutritions.com/sitemap.xml`

### 5. Metadata Configuration

Enhanced metadata in `src/app/layout.js`:
- metadataBase for proper URL generation
- Title and description optimized for SEO
- Google Search Console verification
- Favicon configuration

## Next Steps

### Required Actions

1. **Update Social Media URLs**
   - Edit `src/app/layout.js`
   - Replace placeholder URLs in the `sameAs` array with your actual profiles:
     ```javascript
     sameAs: [
       "https://www.instagram.com/yourprofile", // Update this
       "https://www.facebook.com/yourpage",      // Update this
       "https://www.linkedin.com/company/yourcompany", // Update this
       "https://www.youtube.com/@yourchannel",   // Update this
     ],
     ```

2. **Create Open Graph Image**
   - Create an image: 1200x630 pixels
   - Should include your logo and product
   - Save as: `/public/images/og-image.jpg`
   - This appears when sharing your site on social media

3. **Implement Search Functionality** (Optional)
   - Create a search page at `/search` route
   - Accept query parameter: `?q={search_term}`
   - This enables the SearchAction schema

4. **Verify Implementation**
   - Test schemas with [Google Rich Results Test](https://search.google.com/test/rich-results)
   - Test Open Graph with [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
   - Submit sitemap to Google Search Console
   - Check robots.txt at: `https://www.theboomslangnutritions.com/robots.txt`
   - Check sitemap at: `https://www.theboomslangnutritions.com/sitemap.xml`

## Testing Commands

After deploying, test your SEO implementation:

```bash
# Check robots.txt
curl https://www.theboomslangnutritions.com/robots.txt

# Check sitemap
curl https://www.theboomslangnutritions.com/sitemap.xml

# View page source to verify schema tags
```

## Schema Validation Tools

- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)

## Additional SEO Recommendations

1. **Add Twitter Cards** (similar to Open Graph)
2. **Implement breadcrumb schema** for product pages
3. **Add Product schema** for individual product pages
4. **Create blog post schema** (Article or BlogPosting type)
5. **Add image alt tags** throughout the site
6. **Optimize page load speed** (image compression, lazy loading)
7. **Add internal linking** between related pages
8. **Submit to Google Search Console** and Bing Webmaster Tools

## File Structure

```
src/
├── app/
│   ├── layout.js          # Organization & Website schema, Open Graph tags
│   ├── page.js            # FAQ schema
│   └── sitemap.js         # Dynamic sitemap generation
public/
├── robots.txt             # Search engine crawling rules
└── images/
    └── og-image.jpg       # Social media share image (TO BE CREATED)
```

## Notes

- All schemas follow Schema.org specifications
- Open Graph tags use Next.js 13+ metadata API
- Sitemap is dynamically generated on each request
- Robots.txt is static and served from public directory
- All URLs use the canonical domain: `theboomslangnutritions.com`
