# Church Website Template - Customization Guide

This is a reusable church website template built with React, Vite, Tailwind CSS, and Firebase. Follow this guide to customize it for your church.

## Quick Start

1. Clone/fork this repository
2. Run `npm install` to install dependencies
3. Copy `.env.example` to `.env.local` and fill in your API keys
4. Update `src/config/siteConfig.js` with your church information
5. Replace assets (logos, images) in `/public` and `/src/assets`
6. Update `index.html` meta tags
7. Run `npm run dev` to start development server

## Configuration Files

### 1. Environment Variables (`.env.local`)

Copy `.env.example` to `.env.local` and configure:

```bash
# Firebase - Get from https://console.firebase.google.com/
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Site
VITE_SITE_URL=https://www.yourchurch.org
VITE_ADMIN_EMAILS=admin@yourchurch.org

# YouTube - Get from https://console.cloud.google.com/
VITE_YOUTUBE_API_KEY=your_youtube_api_key
VITE_YOUTUBE_CHANNEL_ID=your_channel_id

# EmailJS - Get from https://www.emailjs.com/
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key

# Gemini AI (optional) - Get from https://aistudio.google.com/
VITE_GEMINI_API_KEY=your_gemini_api_key
```

### 2. Site Configuration (`src/config/siteConfig.js`)

This is the main configuration file. Update the following sections:

#### Church Identity
```javascript
export const churchInfo = {
  name: "Your Church Name",
  shortName: "Your Church",
  tagline: "Your church tagline",

  address: {
    street: "123 Main St",
    city: "Your City",
    state: "ST",
    zip: "12345",
    full: "123 Main St, Your City, ST 12345",
  },

  phone: "(555) 123-4567",
  phoneLink: "tel:+15551234567",
  email: "office@yourchurch.org",
  website: "https://www.yourchurch.org",

  googleMapsQuery: "123+Main+St+Your+City+ST",
  googleMapsEmbed: "https://www.google.com/maps/embed?...",

  givingPortalUrl: "https://yourchurch.churchcenter.com/giving",
  checkPayableTo: "Your Church Name",
};
```

#### Social Media
```javascript
export const socialMedia = {
  youtube: {
    enabled: true,
    url: "https://www.youtube.com/channel/YOUR_CHANNEL_ID",
  },
  facebook: {
    enabled: true,
    url: "https://www.facebook.com/yourchurch",
  },
  instagram: {
    enabled: true,
    url: "https://www.instagram.com/yourchurch/",
  },
  twitter: {
    enabled: false,
    url: "",
  },
};
```

#### Service Times
```javascript
export const serviceTimes = {
  sundaySchool: {
    time: "9:30 AM",
    description: "Description of Sunday School...",
  },
  worship: {
    time: "10:30 AM",
    duration: "75-90 minutes",
    description: "Description of worship service...",
  },
  fellowship: {
    time: "12:00 PM",
    description: "Description of fellowship time...",
  },
};
```

#### Theology & About Content
Update `aboutContent` to reflect your church's beliefs and heritage.

#### Giving Information
Update `givingInfo` with your giving funds and biblical basis.

#### Visitor Information
Update `visitorInfo` with FAQs and practical visitor details.

## Assets to Replace

### Logo Files
- `/public/NL_Logo_300.jpg` - Main logo (used in header/footer)
- `/public/NL_Logo_300.png` - Logo for favicon and social sharing

### Background Images
- `/src/assets/nl_santuary_wide.jpg` - Hero section background

### QR Codes (for giving)
- `/src/assets/text2give-qr-code.jpg` - Text-to-give QR code
- `/src/assets/qrcode.jpg` - Mobile app QR code

### Leader Photos
- Add leader photos to `/src/assets/` and update `/src/data/leaders.js`

## Files to Update

### `index.html`
Update all meta tags:
- Page title
- Meta description
- Open Graph tags (og:title, og:description, og:url, og:image)
- Twitter card tags
- Favicon link

### `src/data/leaders.js`
Update with your church leadership:
```javascript
export const leaders = [
  {
    id: 1,
    name: "Pastor Name",
    roleType: "elder",
    title: "Senior Pastor",
    bio: "Pastor bio...",
    photo: "/path/to/photo.jpg",
    order: 1,
    links: {
      email: "pastor@yourchurch.org",
    },
  },
  // Add more leaders...
];
```

### `src/data/knowledgeBase.js` (if using AI chatbot)
Update with your church's knowledge base for the "Ask [Church Name]" feature.

### `src/data/staticSermons.js`
Update fallback sermons with your church name.

## Firebase Setup

1. Create a new Firebase project at https://console.firebase.google.com/
2. Enable Authentication (Email/Password)
3. Enable Firestore Database
4. Enable Storage
5. Copy config values to `.env.local`
6. Update `firestore.rules` and `storage.rules` as needed
7. Update `.firebaserc` with your project ID

## EmailJS Setup

1. Create account at https://www.emailjs.com/
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template with these variables:
   - `from_name` - Sender's name
   - `from_email` - Sender's email
   - `subject` - Email subject
   - `message` - Email body
   - `to_email` - Your church email
   - `reply_to` - Sender's email for replies
4. Copy service ID, template ID, and public key to `.env.local`

## YouTube Integration

1. Create project at https://console.cloud.google.com/
2. Enable YouTube Data API v3
3. Create API key
4. Find your channel ID (YouTube Studio > Settings > Channel > Advanced)
5. Add to `.env.local`

## Deployment

### Netlify
```bash
npm run build
# Deploy dist folder
```

### Vercel
```bash
npm run build
# Deploy with Vercel CLI or GitHub integration
```

### Firebase Hosting
```bash
npm run build
firebase deploy
```

## Optional Features

### Disable Features
To disable optional features:

- **AI Chatbot**: Remove or comment out the `VITE_GEMINI_API_KEY` in `.env.local`
- **YouTube Integration**: Set `socialMedia.youtube.enabled = false` in siteConfig.js
- **Social Media Links**: Set `enabled: false` for any social platform

### Add Features
- **Additional Social Platforms**: Add to `socialMedia` object in siteConfig.js
- **More Giving Funds**: Add to `givingInfo.funds` array
- **Additional Service Times**: Add to `serviceTimes` object
- **More FAQs**: Add to `visitorInfo.faqs` array

## Troubleshooting

### Common Issues

1. **Images not loading**: Check file paths and ensure images exist in correct folders
2. **API errors**: Verify all API keys in `.env.local` are correct
3. **Build errors**: Run `npm install` to ensure dependencies are installed
4. **Firebase auth issues**: Check Firebase console for correct authentication settings

### Getting Help

For technical issues with the template, check:
- React documentation: https://react.dev/
- Vite documentation: https://vitejs.dev/
- Tailwind CSS: https://tailwindcss.com/
- Firebase: https://firebase.google.com/docs

## License

This template is provided for church use. Please customize for your congregation's needs.
