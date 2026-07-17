# Boomslang Nutrition - Admin Panel

## Overview

A comprehensive, modern admin panel built with Next.js 14 for managing the Boomslang Nutrition e-commerce platform.

## Features

### 🎯 Dashboard
- **Real-time statistics**: Total revenue, orders, products, and customers
- **Interactive sales chart**: View sales data by week, month, or year
- **Recent orders table**: Quick overview of latest transactions
- **Responsive design**: Works seamlessly on desktop, tablet, and mobile

### 📦 Product Management
- **Product catalog**: View all products with images, prices, and stock levels
- **Stock monitoring**: Visual indicators for low stock and out-of-stock items
- **Search & filter**: Find products by name and category
- **CRUD operations**: Add, edit, and delete products (UI ready for backend integration)

### 🛒 Order Management
- **Order tracking**: Complete order history with customer details
- **Status filtering**: Filter orders by completed, processing, pending, or cancelled
- **Order details**: View customer info, products, quantities, and amounts
- **Quick actions**: View details and print invoices

### 👥 Customer Management
- **Customer database**: Comprehensive customer information
- **Customer segmentation**: Active, VIP, and inactive status tracking
- **Purchase history**: View total orders and lifetime value
- **Contact management**: Email and phone information at a glance

### 📊 Analytics (Coming Soon)
- Advanced reporting
- Sales trends
- Customer insights
- Product performance metrics

### ⚙️ Settings (Coming Soon)
- Store configuration
- Payment gateway settings
- Shipping options
- Admin user management

## File Structure

```
src/
├── app/
│   └── admin/
│       ├── layout.js              # Admin panel layout wrapper
│       ├── page.jsx               # Dashboard home
│       ├── Dashboard.module.css
│       ├── AdminLayout.module.css
│       ├── products/
│       │   ├── page.jsx
│       │   └── Products.module.css
│       ├── orders/
│       │   ├── page.jsx
│       │   └── Orders.module.css
│       └── customers/
│           ├── page.jsx
│           └── Customers.module.css
└── components/
    └── admin/
        ├── AdminSidebar/
        │   ├── AdminSidebar.jsx
        │   └── AdminSidebar.module.css
        ├── AdminHeader/
        │   ├── AdminHeader.jsx
        │   └── AdminHeader.module.css
        ├── DashboardCard/
        │   ├── DashboardCard.jsx
        │   └── DashboardCard.module.css
        ├── SalesChart/
        │   ├── SalesChart.jsx
        │   └── SalesChart.module.css
        └── RecentOrders/
            ├── RecentOrders.jsx
            └── RecentOrders.module.css
```

## Access

Navigate to `/admin` to access the admin panel:
```
http://localhost:3000/admin
```

## Key Components

### 1. AdminSidebar
- **Boomslang logo integration** with "Admin Panel" badge
- Green gradient theme matching main website
- Collapsible navigation menu
- Active route highlighting
- Mobile-responsive with overlay
- Quick link to main website
- Logout functionality

### 2. AdminHeader
- Global search functionality
- Notification center with badge
- User profile dropdown
- Responsive design

### 3. DashboardCard
- Reusable stat card component
- Color-coded change indicators
- Icon support
- Hover animations

### 4. SalesChart
- Interactive bar chart
- Period selector (week/month/year)
- Hover tooltips
- Responsive layout

### 5. RecentOrders
- Tabular order display
- Status badges
- Quick actions
- Link to full orders page

## Design Features

### Color Scheme (Matches Main Website)
- **Primary**: Boomslang Green (#7cb729)
- **Primary Dark**: #6a9e23
- **Primary Light**: #8fcc3a
- **Success**: Green (#10b981)
- **Warning**: Amber (#f59e0b)
- **Danger**: Red (#ef4444)
- **Background**: Light green (#f1f7ef)
- **Neutral**: Gray shades

### Typography
- Clean, modern font stack
- Hierarchical heading sizes
- Consistent spacing
- Readable font sizes (0.9rem - 2rem)

### Interactions
- Smooth transitions
- Hover effects
- Click feedback
- Loading states ready

### Responsive Breakpoints
- Desktop: 1024px+
- Tablet: 768px - 1023px
- Mobile: < 768px

## Next Steps for Integration

### 1. Authentication
```javascript
// Add authentication middleware
// Protect /admin routes
// Implement login/logout functionality
```

### 2. API Integration
```javascript
// Connect to backend API
// Replace mock data with real data
// Implement CRUD operations
```

### 3. Real-time Updates
```javascript
// Add WebSocket for live notifications
// Real-time order updates
// Stock level alerts
```

### 4. Advanced Features
- Image upload for products
- Bulk operations
- Export reports (CSV, PDF)
- Advanced filtering and sorting
- Multi-admin role management

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Mobile Features

- Touch-friendly interface
- Swipe gestures
- Collapsible sidebar
- Optimized table views
- Bottom navigation ready

## Performance

- Code splitting by route
- Lazy loading components
- Optimized images
- Minimal re-renders
- Fast page transitions

## Accessibility

- Semantic HTML
- ARIA labels
- Keyboard navigation
- Focus indicators
- Screen reader friendly

## Future Enhancements

1. **Blog Management**: Full CMS for blog posts
2. **Analytics Dashboard**: Advanced charts and insights
3. **Inventory Alerts**: Low stock notifications
4. **Bulk Import/Export**: CSV upload for products
5. **Multi-language Support**: i18n integration
6. **Dark Mode**: Theme switcher
7. **Activity Log**: Admin action tracking
8. **Email Templates**: Customizable transactional emails

## Development

Run the development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
npm start
```

## Notes

- All data is currently mock data for demonstration
- Components are ready for backend integration
- Forms need validation logic
- Add proper error handling
- Implement loading states
- Add success/error notifications

---

**Version**: 1.0.0  
**Last Updated**: January 2024  
**Built with**: Next.js 14, React 18, CSS Modules
