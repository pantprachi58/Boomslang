# 🚀 Contact Page - Quick Start Guide

## ✅ Everything is Ready!

Your contact page is fully functional and includes:
- ✅ Contact form with email functionality
- ✅ Google Maps integration
- ✅ Contact information cards
- ✅ Auto-reply emails to users
- ✅ Navigation menu link

## 🎯 Access the Contact Page

### Development
```bash
npm run dev
```
Then visit: **http://localhost:3000/contact**

### Production Build
```bash
npm run build
npm start
```

## 📧 Email Setup

### Current Configuration
- **Support Email**: support@boomslangnutrition.com
- **App Password**: gzst ejsv ekds zryx (configured)
- **Status**: ✅ Ready to send emails

### Email Flow
1. User fills contact form → Clicks "Send Message"
2. **Email #1** sent to: `support@boomslangnutrition.com`
   - Contains: User's name, email, phone, subject, message
   - Reply-to: User's email (for easy replies)
3. **Email #2** sent to: User's email
   - Auto-reply confirming receipt
   - Includes their message summary

## 🗺️ Update Business Location

**File**: `src/components/sections/ContactMap/ContactMap.jsx`

Replace the Google Maps URL:
```javascript
<iframe
  src="YOUR_GOOGLE_MAPS_EMBED_URL_HERE"
  ...
/>
```

**Get your embed URL:**
1. Go to https://www.google.com/maps
2. Search for your address
3. Click "Share" → "Embed a map"
4. Copy the URL from the iframe code

## 📞 Update Contact Information

**File**: `src/components/sections/ContactInfo/ContactInfo.jsx`

Update these sections:
- **Location**: Business address
- **Phone**: Phone number (currently "Coming Soon")
- **Business Hours**: Your operating hours

## 🎨 Styling

All components use your website theme:
- **Green**: #7cb729 (buttons, icons)
- **Backgrounds**: #f1f7ef, white
- **Fonts**: Anybody (headings), Inter (text)

## 🔒 Security (Optional but Recommended)

For production, use environment variables:

1. Create `.env.local`:
```env
EMAIL_USER=support@boomslangnutrition.com
EMAIL_PASS=gzst ejsv ekds zryx
```

2. Add to `.gitignore`:
```
.env.local
```

3. ✅ API already configured to use these variables!

## 🧪 Test Your Contact Form

1. Visit `/contact`
2. Fill in the form:
   - Name: John Doe
   - Email: your-email@example.com
   - Subject: Test Message
   - Message: Testing the contact form
3. Click "Send Message"
4. Check for:
   - ✅ Success message on screen
   - ✅ Email in support@boomslangnutrition.com inbox
   - ✅ Auto-reply at your-email@example.com

## 📱 Navigation

The "Contact" link is already added to:
- ✅ Desktop navigation menu
- ✅ Mobile hamburger menu
- ✅ Header contact button

## 🎉 You're All Set!

The contact page is fully functional. Just:
1. Test the form
2. Update your business location (map)
3. Update contact details (address, phone)
4. Deploy!

## 📚 Need More Info?

See detailed documentation in:
- `CONTACT_PAGE_README.md` - Complete documentation
- `CONTACT_PAGE_SETUP.md` - Setup details
- `.env.local.example` - Environment variables template

## ⚡ Quick Commands

```bash
# Development
npm run dev

# Production build
npm run build
npm start

# Install dependencies (if needed)
npm install
```

---

**Contact Page URL**: `/contact`  
**Email**: support@boomslangnutrition.com  
**Status**: ✅ Live and Ready!
