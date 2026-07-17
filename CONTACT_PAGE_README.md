# Contact Page - Boomslang Nutrition

## Overview
The Contact page provides users with multiple ways to reach out to Boomslang Nutrition, including a contact form, location information, and an embedded map.

## Page Structure

### Route
- **Path**: `/contact`
- **Location**: `src/app/contact/page.jsx`

### Components

#### 1. ContactHero
**Location**: `src/components/sections/ContactHero/`
- Displays a banner with the page title and subtitle
- Uses the contact banner image from `/images/banner/contact us.png`
- Features overlay for text readability
- Responsive design with adaptive heights

#### 2. ContactForm
**Location**: `src/components/sections/ContactForm/`
- **Type**: Client Component (`"use client"`)
- Interactive form with the following fields:
  - Full Name (required)
  - Email Address (required)
  - Phone Number (optional)
  - Subject (required)
  - Message (required)
- Features:
  - Real-time form validation
  - Loading state during submission
  - Success/error status messages
  - Form reset after successful submission
  - Styled according to website theme (green primary color)

#### 3. ContactInfo
**Location**: `src/components/sections/ContactInfo/`
- Displays 4 information cards:
  1. **Location**: Physical address (placeholder for now)
  2. **Email**: support@boomslangnutrition.com
  3. **Phone**: Coming soon placeholder
  4. **Business Hours**: Operating schedule
- Each card features:
  - Custom SVG icons
  - Hover animations
  - Green themed styling
  - Responsive grid layout

#### 4. ContactMap
**Location**: `src/components/sections/ContactMap/`
- **Type**: Client Component
- Embedded Google Maps iframe showing location
- Currently set to Noida, Uttar Pradesh (can be updated)
- Features:
  - 500px height on desktop
  - Responsive heights on mobile devices
  - Rounded corners with shadow
  - Loading optimization with `loading="lazy"`

## Email Functionality

### API Route
**Location**: `src/app/api/contact/route.js`

The contact form sends data to this API endpoint which:
1. Validates all required fields
2. Validates email format
3. Sends two emails using Nodemailer:

#### Email 1: To Support Team
- **To**: support@boomslangnutrition.com
- **Subject**: Contact Form: [User's Subject]
- **Contains**:
  - User's name, email, phone, subject
  - Full message content
  - Timestamp
  - Professional HTML template with Boomslang branding

#### Email 2: Auto-Reply to User
- **To**: User's email address
- **Subject**: Thank You for Contacting Boomslang Nutrition
- **Contains**:
  - Personalized greeting
  - Confirmation of receipt
  - Summary of their message
  - Link to shop page
  - Company contact information
  - Professional HTML template

### Email Configuration
- **Service**: Gmail SMTP
- **Account**: support@boomslangnutrition.com
- **App Password**: gzst ejsv ekds zryx
- **Library**: nodemailer

### Security Notes
⚠️ **Important**: The email credentials are currently hardcoded. For production:
1. Move credentials to environment variables (.env.local)
2. Use process.env.EMAIL_USER and process.env.EMAIL_PASS
3. Never commit .env files to version control
4. Add .env.local to .gitignore

## Styling

### Theme Integration
All components use the website's CSS variables from `src/styles/variables.css`:
- **Primary Color**: `--color-primary` (#7cb729)
- **Primary Dark**: `--color-primary-dark` (#6a9e23)
- **Background**: `--color-page-green` (#f1f7ef)
- **White**: `--color-white` (#ffffff)
- **Black**: `--color-black` (#000000)
- **Gray shades**: Various gray tones for text and borders

### Typography
- **Headings**: `--font-main` (Anybody font)
- **Body Text**: `--font-paragraph` (Inter font)
- **Consistent sizing**: Uses font-size variables

### Responsive Breakpoints
- **Desktop**: Default styles
- **Tablet**: 768px and below
- **Mobile**: 576px and below

## Installation & Dependencies

### Required Package
```bash
npm install nodemailer
```

### Configuration Steps
1. Ensure nodemailer is installed
2. Update API route with correct email credentials (or use env variables)
3. Update Google Maps iframe with actual business location
4. Replace placeholder contact information in ContactInfo component

## Usage

### For Users
1. Navigate to `/contact` or click "Contact" in the navigation
2. Fill out the contact form with inquiry details
3. Submit form and receive immediate confirmation
4. Auto-reply email sent to provided address

### For Developers

#### Update Email Credentials (Recommended)
Create `.env.local` file:
```env
EMAIL_USER=support@boomslangnutrition.com
EMAIL_PASS=gzst ejsv ekds zryx
```

Update `src/app/api/contact/route.js`:
```javascript
auth: {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS,
}
```

#### Update Map Location
Edit `src/components/sections/ContactMap/ContactMap.jsx`:
1. Get embed code from Google Maps
2. Replace the iframe `src` attribute
3. Update the `title` attribute

#### Customize Contact Information
Edit `src/components/sections/ContactInfo/ContactInfo.jsx`:
- Update address in Location card
- Update phone number in Call Us card
- Update business hours
- Modify any placeholder text

## Features

### User Experience
- ✅ Clean, professional design
- ✅ Mobile responsive
- ✅ Immediate feedback on form submission
- ✅ Auto-reply confirmation email
- ✅ Multiple contact methods provided
- ✅ Visual location map
- ✅ Accessible form with proper labels

### Technical
- ✅ Server-side email sending (secure)
- ✅ Form validation (client and server)
- ✅ Error handling
- ✅ Loading states
- ✅ Responsive design
- ✅ SEO metadata included
- ✅ Follows Next.js 14 App Router conventions

## File Structure
```
src/
├── app/
│   ├── contact/
│   │   └── page.jsx
│   └── api/
│       └── contact/
│           └── route.js
└── components/
    └── sections/
        ├── ContactHero/
        │   ├── ContactHero.jsx
        │   └── ContactHero.module.css
        ├── ContactForm/
        │   ├── ContactForm.jsx
        │   └── ContactForm.module.css
        ├── ContactInfo/
        │   ├── ContactInfo.jsx
        │   └── ContactInfo.module.css
        └── ContactMap/
            ├── ContactMap.jsx
            └── ContactMap.module.css
```

## Future Enhancements
- [ ] Add CAPTCHA to prevent spam
- [ ] Implement rate limiting on API
- [ ] Add file attachment support
- [ ] Create admin dashboard to view submissions
- [ ] Store submissions in database
- [ ] Add WhatsApp integration
- [ ] Add social media contact links
- [ ] Implement live chat widget
- [ ] Add FAQ section on contact page

## Testing Checklist
- [ ] Form submits successfully
- [ ] Emails arrive at support inbox
- [ ] User receives auto-reply
- [ ] Form validation works
- [ ] Error messages display correctly
- [ ] Page is mobile responsive
- [ ] Map loads correctly
- [ ] All links work
- [ ] Navigation includes Contact link
- [ ] Accessibility (keyboard navigation, screen readers)

## Support
For any issues or questions regarding the contact page implementation, please reach out to the development team.
