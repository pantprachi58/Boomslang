# Shop Page Documentation

## Overview
A fully functional e-commerce shop page with filtering, product grid, and pagination - built with Next.js and matching the Boomslang Nutrition website theme.

## Features

### 1. **Product Filtering**
- **Search**: Search products by name/description
- **Category Filter**: Filter by product categories (All Products, GOKU GAINZ, STRYCNNINE)
- **Availability Filter**: Filter by stock status (In Stock, Coming Soon)
- **Price Range**: Adjustable slider from ₹0 to ₹5000
- **Discount Filter**: Filter by discount percentage (0% to 100%)
- **Apply/Clear Actions**: Apply filters or reset to defaults

### 2. **Product Grid**
- Responsive grid layout
- Product cards with:
  - Product image with hover effects
  - Product name and description
  - Discount badge (percentage off)
  - Original and discounted prices
  - "Add to Cart" and "Shop Now" buttons
  - "Coming Soon" badge for unavailable products

### 3. **Pagination**
- Page navigation with Previous/Next buttons
- Direct page number selection
- Shows 6 products per page
- Smooth scroll to top on page change

### 4. **Responsive Design**
- Desktop: Sidebar + Product Grid (2-column layout)
- Tablet: Stacked layout with full-width filters
- Mobile: Single column with optimized card sizes

## File Structure

```
src/
├── app/
│   └── shop/
│       ├── page.jsx              # Shop page route
│       └── Shop.module.css       # Shop page styles
│
├── components/
│   ├── sections/
│   │   └── ShopContent/
│   │       ├── ShopContent.jsx        # Main shop content with filter logic
│   │       └── ShopContent.module.css # Layout styles
│   │
│   ├── ShopFilters/
│   │   ├── ShopFilters.jsx            # Filter sidebar component
│   │   └── ShopFilters.module.css     # Filter styles
│   │
│   ├── ShopGrid/
│   │   ├── ShopGrid.jsx               # Product grid + pagination
│   │   └── ShopGrid.module.css        # Grid styles
│   │
│   └── ShopProductCard/
│       ├── ShopProductCard.jsx        # Individual product card
│       └── ShopProductCard.module.css # Card styles
```

## Design System Used

### Colors
- **Primary**: `--color-primary` (#7cb729)
- **Background**: `--color-offwhite` (#e4ffd9)
- **White Cards**: `--color-white`
- **Text**: `--color-black`, `--color-gray-700`, `--color-gray-500`

### Typography
- **Headings**: Anybody font (bold, uppercase)
- **Body**: Inter font (regular weight)

### Spacing
- Uses CSS variables: `--space-8`, `--space-12`, `--space-16`, `--space-24`, etc.

### Border Radius
- Small: `--radius-sm` (4px)
- Medium: `--radius-md` (8px)
- Pill: `--radius-pill` (999px)

## Usage

### Accessing the Shop Page
Navigate to: `http://localhost:3000/shop`

Or click "Shop Now" button in the header or "Shop" in the navigation menu.

### Updating Products
Edit the `allProducts` array in `src/components/sections/ShopContent/ShopContent.jsx`:

```javascript
const allProducts = [
  {
    id: 1,
    name: "Product Name",
    description: "Product Description",
    category: "CATEGORY_NAME",
    image: "/images/product.png",
    originalPrice: 999,
    discountedPrice: 799,
    percentOff: 20,
    availability: "In Stock" // or "Coming Soon"
  },
  // Add more products...
];
```

### Customizing Filters

**Categories**: Update the `categories` array in `ShopFilters.jsx`
```javascript
const categories = [
  { name: "All Products", count: 5 },
  { name: "New Category", count: 3 },
];
```

**Price Range**: Adjust min/max in `ShopFilters.jsx`
```javascript
<input type="range" min="0" max="5000" step="100" />
```

**Products Per Page**: Change in `ShopContent.jsx`
```javascript
const productsPerPage = 6; // Change to desired number
```

## Integration Points

### Connect to API
Replace the static `allProducts` array with an API call:

```javascript
// In ShopContent.jsx
const [products, setProducts] = useState([]);

useEffect(() => {
  async function fetchProducts() {
    const response = await fetch('/api/products');
    const data = await response.json();
    setProducts(data);
  }
  fetchProducts();
}, []);
```

### Connect Cart Functionality
Update the "Add to Cart" button in `ShopProductCard.jsx`:

```javascript
const handleAddToCart = () => {
  // Add your cart logic here
  console.log('Adding to cart:', id);
};

<button onClick={handleAddToCart} className={styles.addToCart}>
  Add To Cart
</button>
```

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive breakpoints: 576px, 768px, 992px, 1200px

## Performance Optimizations
- Next.js Image component for optimized images
- CSS Modules for scoped styling
- Client-side filtering (no page reloads)
- Smooth transitions and hover effects

## Future Enhancements
- [ ] Add sorting options (price, name, newest)
- [ ] Add product quick view modal
- [ ] Add wishlist functionality
- [ ] Add product comparison
- [ ] Integrate with real backend API
- [ ] Add loading states and skeletons
- [ ] Add empty state illustrations
- [ ] Add product reviews/ratings
