# Church Website Setup Checklist

Use this checklist to set up your new church website. Check off each item as you complete it.

---

## Phase 1: Gather Your Church Information

Before we start, collect the following information:

### Basic Information
- [ ] Church name (full name and short name)
- [ ] Church tagline/mission statement
- [ ] Street address
- [ ] Phone number
- [ ] Email address (e.g., office@yourchurch.org)
- [ ] Website URL (what you want it to be)

### Service Times
- [ ] Sunday School time
- [ ] Worship service time
- [ ] Service duration (e.g., "75-90 minutes")
- [ ] Fellowship time (if applicable)
- [ ] Any weekday services or Bible studies

### Leadership
- [ ] Pastor name, title, bio, and photo
- [ ] Elder names, titles, bios, and photos
- [ ] Deacon names, titles, bios, and photos
- [ ] Contact emails for leaders (optional)

### Social Media Links
- [ ] YouTube channel URL
- [ ] Facebook page URL
- [ ] Instagram URL
- [ ] Twitter/X URL (if applicable)

### Giving Information
- [ ] Online giving portal URL (Church Center, Tithe.ly, etc.)
- [ ] Name for checks (e.g., "First Baptist Church")
- [ ] Giving fund names (General Fund, Missions, Building, etc.)

### Assets Needed
- [ ] Church logo (high resolution, PNG or JPG)
- [ ] Hero/banner image (wide photo of sanctuary or church)
- [ ] Leader headshot photos
- [ ] QR codes for giving (if applicable)

---

## Phase 2: Set Up External Services

You'll need accounts with these services (all have free tiers):

### 1. Google Cloud (for YouTube API)
- [ ] Go to https://console.cloud.google.com/
- [ ] Create a new project (name it after your church)
- [ ] Enable "YouTube Data API v3"
- [ ] Create an API key (APIs & Services > Credentials)
- [ ] Copy your API key: `_______________________________`
- [ ] Find your YouTube Channel ID:
  - Go to YouTube Studio > Settings > Channel > Advanced settings
  - Copy Channel ID: `_______________________________`

### 2. Firebase (for authentication & database)
- [ ] Go to https://console.firebase.google.com/
- [ ] Create a new project
- [ ] Enable Authentication (Email/Password)
- [ ] Create a Firestore database
- [ ] Go to Project Settings > General > Your apps > Add web app
- [ ] Copy these values:
  - API Key: `_______________________________`
  - Auth Domain: `_______________________________`
  - Project ID: `_______________________________`
  - Storage Bucket: `_______________________________`
  - Messaging Sender ID: `_______________________________`
  - App ID: `_______________________________`

### 3. EmailJS (for contact form)
- [ ] Go to https://www.emailjs.com/ and create account
- [ ] Add an email service (Gmail, Outlook, etc.)
- [ ] Create an email template with these variables:
  - `from_name`, `from_email`, `subject`, `message`, `to_email`, `reply_to`
- [ ] Copy these values:
  - Service ID: `_______________________________`
  - Template ID: `_______________________________`
  - Public Key: `_______________________________`

### 4. Google Gemini AI (optional - for chatbot)
- [ ] Go to https://aistudio.google.com/
- [ ] Create an API key
- [ ] Copy your API key: `_______________________________`
- [ ] Set API key restrictions to "None" in Google Cloud Console

### 5. Netlify (for hosting)
- [ ] Go to https://app.netlify.com/ and create account
- [ ] (We'll connect this later)

---

## Phase 3: Set Up the Website

### Download the Template
- [ ] If you have **no coding experience**, STOP HERE and follow the [No-Code Setup Guide](NO_CODE_SETUP_GUIDE.md).
- [ ] If you are a developer, run `git clone` on the repository and `npm install` to install dependencies.

### Update Configuration File (via GitHub or local editor)
Edit `src/config/siteConfig.js`:
- [ ] Church name and short name
- [ ] Tagline
- [ ] Full address
- [ ] Phone number and email
- [ ] Google Maps query string
- [ ] Google Maps embed URL (get from Google Maps > Share > Embed)
- [ ] Giving portal URL
- [ ] Social media URLs (set `enabled: false` for any you don't use)
- [ ] Service times and descriptions
- [ ] About/theology content
- [ ] Visitor FAQs

### Update Leaders Data
Edit `src/data/leaders.js`:
- [ ] Add all leaders with photos, bios, and contact info
- [ ] Add leader photos to `src/assets/` folder

### Replace Assets
- [ ] Replace `/public/NL_Logo_300.jpg` with your church logo
- [ ] Replace `/public/NL_Logo_300.png` with your church logo (for favicon)
- [ ] Replace `/src/assets/nl_santuary_wide.jpg` with your hero image
- [ ] Add/replace QR code images if using

### Update HTML Metadata
Edit `index.html`:
- [ ] Page title
- [ ] Meta description
- [ ] og:title, og:description, og:url
- [ ] twitter:title, twitter:description
- [ ] Favicon path (if different)

### Update Environment Variables
Create `.env.local` file:
```
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_id
VITE_FIREBASE_APP_ID=your_app_id

VITE_SITE_URL=https://www.yourchurch.org
VITE_ADMIN_EMAILS=admin@yourchurch.org

VITE_YOUTUBE_API_KEY=your_key
VITE_YOUTUBE_CHANNEL_ID=your_channel_id

VITE_EMAILJS_SERVICE_ID=your_service
VITE_EMAILJS_TEMPLATE_ID=your_template
VITE_EMAILJS_PUBLIC_KEY=your_key

VITE_GEMINI_API_KEY=your_key
```
- [ ] All values filled in correctly

### Test the Website
- [ ] Non-coders: Your changes are visible online within 2 minutes of clicking "Commit changes" in GitHub.
- [ ] Developers: Run `npm run dev` locally to test.
- [ ] Verify all sections display correctly
- [ ] Test contact form
- [ ] Test chatbot (if using)
- [ ] Verify sermons load from YouTube

---

## Phase 4: Deploy to Netlify

### Connect Repository
- [ ] Following the [No-Code Setup Guide](NO_CODE_SETUP_GUIDE.md) or [Deployment Guide](DEPLOYMENT_GUIDE.md), connect your GitHub repository to Netlify.

### Add Environment Variables
In Netlify: Site settings > Environment variables
- [ ] Add all variables from Step 4 of the No-Code Setup Guide (or your local `.env.local` file).

### Deploy
- [ ] Click "Trigger Deploy"
- [ ] Wait for build to complete
- [ ] Test the live site

### Custom Domain (Optional)
- [ ] In Netlify: Domain settings > Add custom domain
- [ ] Update DNS records with your domain registrar
- [ ] Enable HTTPS

---

## Phase 5: Final Verification

### Test All Features
- [ ] Home page loads correctly
- [ ] All navigation links work
- [ ] Contact form sends emails
- [ ] Sermons display from YouTube
- [ ] Chatbot responds (if using)
- [ ] Mobile responsive design works
- [ ] Social media links work

### Ongoing Maintenance
- [ ] Know how to post alert banners (edit `src/config/alertConfig.js`)
- [ ] Know how to update service times
- [ ] Know how to add/remove leaders
- [ ] Have API key information saved securely

---

## Need Help?

Contact your website administrator for assistance with:
- Technical issues
- Adding new features
- Updating content

---

## Quick Reference: Common Tasks

### Post a Weather Cancellation Alert
Edit `src/config/alertConfig.js`:
```javascript
export const alertConfig = {
  enabled: true,
  type: 'urgent',
  title: 'Service Canceled',
  message: 'Due to weather, all services are canceled today.',
  dismissible: true,
};
```
Then commit and push to deploy.

### Update Service Times
Edit `src/config/siteConfig.js` > `serviceTimes` section.

### Add a New Leader
Edit `src/data/leaders.js`, add photo to `src/assets/`.

### Change Contact Information
Edit `src/config/siteConfig.js` > `churchInfo` section.
