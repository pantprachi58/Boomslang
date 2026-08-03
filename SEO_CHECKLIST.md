# SEO Implementation Checklist

## Pre-Deployment Checklist

- [ ] **Update social media URLs** in `src/app/layout.js` (lines with sameAs array)
- [ ] **Create og-image.jpg** (1200x630px) and save to `/public/images/`
- [ ] **Verify logo.png exists** at `/public/images/logo.png`
- [ ] **Review company information** in Organization Schema (address, email, etc.)
- [ ] **Update blog URLs** in sitemap.js if you have actual blog posts

## Post-Deployment Verification

### Immediate Checks (Right After Deploy)

- [ ] Visit `https://www.theboomslangnutritions.com/robots.txt` - Should load without errors
- [ ] Visit `https://www.theboomslangnutritions.com/sitemap.xml` - Should show XML with URLs
- [ ] Right-click homepage → View Source → Search for "application/ld+json" - Should find 3 instances
- [ ] Right-click homepage → View Source → Search for "og:image" - Should be present

### Schema Validation (Day 1)

- [ ] Test homepage with [Google Rich Results Test](https://search.google.com/test/rich-results)
  - Should detect: Organization Schema ✓
  - Should detect: WebSite Schema ✓
  - Should detect: FAQPage Schema ✓
  - No errors should be present

- [ ] Test with [Schema.org Validator](https://validator.schema.org/)
  - Enter your homepage URL
  - All schemas should validate without errors

### Open Graph Validation (Day 1)

- [ ] Test with [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
  - Image preview should load (og-image.jpg)
  - Title should show correctly
  - Description should show correctly
  - Click "Scrape Again" if first time

- [ ] Test LinkedIn share
  - Create a test post with your URL
  - Preview card should display properly

### Search Console Setup (Week 1)

- [ ] Add site to [Google Search Console](https://search.google.com/search-console)
  - Verify ownership
  - Submit sitemap URL
  - Request indexing for homepage

- [ ] Add site to [Bing Webmaster Tools](https://www.bing.com/webmasters)
  - Verify ownership
  - Submit sitemap URL

### Ongoing Monitoring (Monthly)

- [ ] Check Google Search Console for:
  - Indexing status
  - Schema errors
  - Core Web Vitals
  - Search performance

- [ ] Verify rich results appearance in Google
  - Search for "The Boomslang Nutritions"
  - Check if FAQ snippets appear
  - Check if knowledge panel appears

- [ ] Monitor sitemap
  - Ensure all products are included
  - Check for 404 errors
  - Verify new pages are being added

## Common Issues & Solutions

### Issue: Schemas Not Detected

**Solution:**
1. Clear your browser cache
2. View page source and verify JSON-LD is present
3. Wait 24-48 hours for Google to re-crawl
4. Request re-indexing in Search Console

### Issue: Open Graph Image Not Showing

**Solution:**
1. Verify image exists at `/public/images/og-image.jpg`
2. Image must be exactly 1200x630px
3. Use Facebook Debugger and click "Scrape Again"
4. Check file size (should be under 5MB)

### Issue: Sitemap Returns 404

**Solution:**
1. Verify `src/app/sitemap.js` exists
2. Restart Next.js development server
3. Check Next.js version (should be 13+)
4. Rebuild and redeploy

### Issue: Social Media URLs Not Working

**Solution:**
1. Open `src/app/layout.js`
2. Find the `sameAs` array in organizationSchema
3. Replace all placeholder URLs with actual profile URLs
4. Redeploy the site

## Success Metrics

### Week 1
- ✓ All schemas validate without errors
- ✓ Open Graph previews work on all platforms
- ✓ Sitemap accessible and indexable
- ✓ Robots.txt properly configured

### Month 1
- ✓ Site indexed by Google
- ✓ Rich results may start appearing
- ✓ Search Console shows increasing impressions
- ✓ Knowledge panel may appear for brand searches

### Month 3+
- ✓ FAQ rich snippets appearing in search
- ✓ Increased organic traffic
- ✓ Better click-through rates from search
- ✓ Social shares showing proper previews

## Notes

- Search engines can take 1-4 weeks to fully process schema changes
- Rich results are not guaranteed; Google decides based on relevance
- Keep schemas updated when business information changes
- Monitor Search Console regularly for any issues

## Contact Information to Update

Current values in code (verify these are correct):

- **Company Name:** The Boomslang Nutritions ✓
- **Email:** support@theboomslangnutritions.com (verify)
- **Address:** G-190, Shop No. 3, Dilshad Colony, Delhi, 110095, IN (verify)
- **Domain:** theboomslangnutritions.com ✓

If any of these need updating, edit `src/app/layout.js`
