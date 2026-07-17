# About Page Documentation

## Overview
The About page has been created at `/about` with a complete design matching the website theme and fonts.

## Page Structure

### Route
- **Path**: `/about`
- **File**: `src/app/about/page.jsx`

### Sections (in order)

1. **AboutHero** - Dark background section with hero image and introduction
   - Location: `src/components/sections/AboutHero/`
   - Background: Dark
   - Content: About BOOMSLANG Nutrition introduction

2. **WhyWeStarted** - Light background with story
   - Location: `src/components/sections/WhyWeStarted/`
   - Background: Light
   - Content: Origin story and motivation

3. **OurVision** - Dark background vision section
   - Location: `src/components/sections/OurVision/`
   - Background: Dark
   - Content: Company vision and goals

4. **WhatWeServe** - Light background with feature cards
   - Location: `src/components/sections/WhatWeServe/`
   - Background: Light
   - Content: 5 feature cards with icons

5. **WhatMakesUsDifferent** - Light background differentiation
   - Location: `src/components/sections/WhatMakesUsDifferent/`
   - Background: Light
   - Content: Key differentiators with checkmarks

6. **WhatYouCanExpect** - Light background with image grid
   - Location: `src/components/sections/WhatYouCanExpect/`
   - Background: Light
   - Content: Image gallery layout

7. **InspirationBehind** - Dark background with cards
   - Location: `src/components/sections/InspirationBehind/`
   - Background: Dark
   - Content: Natural ingredients and testing info

8. **QualityCleansPure** - Light background quality section
   - Location: `src/components/sections/QualityCleansPure/`
   - Background: Light
   - Content: Quality standards and customer quotes

9. **WhatOurCustomers** - Dark background testimonials
   - Location: `src/components/sections/WhatOurCustomers/`
   - Background: Dark
   - Content: Customer testimonial cards

10. **FaqSection** - Reused from homepage
    - Location: `src/components/sections/FaqSection/`
    - Content: Frequently asked questions

11. **CtaBanner** - Reused from homepage
    - Location: `src/components/sections/CtaBanner/`
    - Content: Call to action banner

## Theme & Styling

### Colors Used
- **Primary**: `#7cb729` (Brand green)
- **Dark Background**: `#000000` with `#170000` (Deep red-black)
- **Light Background**: `#f1f7ef` (Page green)
- **Off-white Text**: `#e4ffd9`
- **Black Text**: `#000000`
- **Gray Text**: `#4a4a4a` and `#8a8a8a`

### Fonts
- **Headings**: `Anybody` (var(--font-main))
  - Font weights: 700, 800, 900
  - Sizes: 36px - 56px for main titles
- **Body Text**: `Inter` (var(--font-paragraph))
  - Font weight: 400
  - Sizes: 14px - 18px

### Layout
- **Max Width**: 1400px container
- **Spacing**: Even pixel spacing system (16px, 24px, 32px, 48px, 64px, 80px, 96px)
- **Border Radius**: 8px (md), 16px (lg)
- **Grid**: Responsive grid switching from 1 column (mobile) to 2 columns (desktop at 992px)

## Responsive Breakpoints
- **Mobile**: < 768px (1 column)
- **Tablet**: 768px - 991px (2 columns on some sections)
- **Desktop**: ≥ 992px (Full 2-column layout)

## Images Used
The following images from `/public/images/` are used:
- `1.png` - Product bottle (Hero)
- `2.png` - Product variant
- `3.png` - Product variant
- `4.png` - Product variant
- `goku-shenron-hero.png` - Hero image
- `man-drinking-shaker.png` - Lifestyle image
- `goku-gainz-lifestyle-collage.png` - Collage

## Navigation
The About page is already linked in the main navigation:
- Desktop menu: "About Us"
- Mobile menu: "About Us"
- Located in: `src/data/navigation.js`

## SEO
- **Title**: "About Us | BOOMSLANG Nutrition"
- **Description**: "Learn about BOOMSLANG Nutrition's mission to provide premium ayurvedic supplements for healthy weight gain and wellness."

## Component Pattern
All sections follow a consistent pattern:
1. Import SectionWrapper for consistent layout
2. Use CSS Modules for scoped styling
3. Responsive grid layouts
4. Semantic HTML with proper heading hierarchy
5. Accessibility considerations (alt text, ARIA labels)

## Customization
To modify content:
1. Edit the JSX files in each section's folder
2. Update images in `/public/images/`
3. Modify styles in the corresponding `.module.css` files
4. Follow the existing design system variables from `src/styles/variables.css`
