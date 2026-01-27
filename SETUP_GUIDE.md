# Church Website Setup Guide

This guide walks you through setting up this church website template for your own congregation. No coding experience required - just follow the steps!

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Download the Code](#download-the-code)
3. [Firebase Setup](#firebase-setup) (Authentication & Database)
4. [YouTube API Setup](#youtube-api-setup) (Sermon Videos)
5. [EmailJS Setup](#emailjs-setup) (Contact Form)
6. [Gemini AI Setup](#gemini-ai-setup) (Chatbot - Optional)
7. [Netlify Deployment](#netlify-deployment) (Free Hosting)
8. [Environment Variables](#environment-variables)
9. [Customize Your Church Content](#customize-your-church-content)
10. [Set Up Your First Admin](#set-up-your-first-admin)
11. [Deploy Firebase Rules](#deploy-firebase-rules)
12. [Ongoing Maintenance](#ongoing-maintenance)

---

## Prerequisites

Before starting, you'll need:

- A computer with internet access
- A Google account (for Firebase and YouTube API)
- A GitHub account (free at github.com)
- Basic ability to edit text files

**Estimated setup time: 1-2 hours**

---

## Download the Code

1. Go to the GitHub repository
2. Click the green **"Code"** button
3. Select **"Download ZIP"**
4. Extract the ZIP file to your computer
5. Open the folder - you'll see files like `package.json`, `src/`, etc.

---

## Firebase Setup

Firebase provides user authentication (login system) and the database for prayer requests, alerts, and promo banners.

### Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"** (or "Add project")
3. Enter your church name (e.g., "Grace Community Church")
4. Disable Google Analytics (not needed) and click **Create**
5. Wait for the project to be created

### Step 2: Enable Authentication

1. In your Firebase project, click **"Authentication"** in the left sidebar
2. Click **"Get started"**
3. Click on **"Email/Password"** provider
4. Toggle **"Enable"** to ON
5. Click **"Save"**

### Step 3: Enable Firestore Database

1. Click **"Firestore Database"** in the left sidebar
2. Click **"Create database"**
3. Select **"Start in production mode"**
4. Choose a location close to your congregation (e.g., `us-east1` for East Coast USA)
5. Click **"Enable"**

### Step 4: Get Your Firebase Credentials

1. Click the **gear icon** (Settings) next to "Project Overview"
2. Select **"Project settings"**
3. Scroll down to **"Your apps"** section
4. Click the **web icon** (`</>`) to add a web app
5. Enter a nickname (e.g., "Church Website")
6. **Don't** check "Firebase Hosting"
7. Click **"Register app"**
8. You'll see a code block with your credentials. Copy these values:
   - `apiKey`
   - `authDomain`
   - `projectId`
   - `storageBucket`
   - `messagingSenderId`
   - `appId`

**Save these somewhere safe - you'll need them later!**

---

## YouTube API Setup

This allows your website to automatically display your sermon videos from YouTube.

### Step 1: Get Your YouTube Channel ID

1. Go to your church's YouTube channel
2. Click on your channel name to go to the main channel page
3. Look at the URL - it will be one of these formats:
   - `youtube.com/channel/UCxxxxxxxxxxxxxxxxxx` - the part after `/channel/` is your Channel ID
   - `youtube.com/@YourChurchName` - you'll need to find the Channel ID differently:
     1. Right-click on the page and select "View Page Source"
     2. Press Ctrl+F (or Cmd+F on Mac) and search for `"channelId"`
     3. Copy the ID that appears (starts with "UC")

### Step 2: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **"Select a project"** at the top, then **"New Project"**
3. Name it (e.g., "Church Website")
4. Click **"Create"**

### Step 3: Enable YouTube Data API

1. Make sure your new project is selected
2. Go to **"APIs & Services"** > **"Library"**
3. Search for **"YouTube Data API v3"**
4. Click on it, then click **"Enable"**

### Step 4: Create an API Key

1. Go to **"APIs & Services"** > **"Credentials"**
2. Click **"Create Credentials"** > **"API Key"**
3. Copy the API key that appears
4. Click **"Edit API key"** (pencil icon)
5. Under "API restrictions", select **"Restrict key"**
6. Choose **"YouTube Data API v3"** from the dropdown
7. Click **"Save"**

**Save your YouTube API Key and Channel ID!**

---

## EmailJS Setup

EmailJS allows the contact form to send emails without needing a server.

### Step 1: Create an EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Click **"Sign Up Free"**
3. Create an account with your email

### Step 2: Add an Email Service

1. After logging in, go to **"Email Services"**
2. Click **"Add New Service"**
3. Choose your email provider (Gmail is easiest):
   - Select **"Gmail"**
   - Click **"Connect Account"**
   - Sign in with the email that should RECEIVE contact form messages
4. Note your **Service ID** (e.g., `service_abc123`)

### Step 3: Create an Email Template

1. Go to **"Email Templates"**
2. Click **"Create New Template"**
3. Set up your template:
   - **To Email**: `{{to_email}}`
   - **From Name**: `{{from_name}}`
   - **Subject**: `Website Contact: {{subject}}`
   - **Content**:
     ```
     New message from your church website:

     From: {{from_name}}
     Email: {{from_email}}
     Subject: {{subject}}

     Message:
     {{message}}
     ```
4. Click **"Save"**
5. Note your **Template ID** (e.g., `template_xyz789`)

### Step 4: Get Your Public Key

1. Go to **"Account"** in the top menu
2. Find your **"Public Key"** under API Keys
3. Copy it

**Save your Service ID, Template ID, and Public Key!**

---

## Gemini AI Setup (Optional)

The chatbot uses Google's Gemini AI to answer questions about your church. This is optional but helpful for visitors.

### Step 1: Get a Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Select your project (or create a new one)
5. Copy the API key

### Step 2: Customize the Chatbot Knowledge

The chatbot's knowledge is stored in `src/data/knowledgeBase.json`. You'll customize this later with your church's information.

**Save your Gemini API Key!**

---

## Netlify Deployment

Netlify provides free hosting for your website with automatic updates when you make changes.

### Step 1: Create a Netlify Account

1. Go to [Netlify.com](https://www.netlify.com/)
2. Click **"Sign up"**
3. Choose **"Sign up with GitHub"** (recommended)

### Step 2: Push Your Code to GitHub

If you haven't already:

1. Create a new repository on GitHub
2. Upload all the website files to it
3. Or use GitHub Desktop for easier uploading

### Step 3: Deploy on Netlify

1. In Netlify, click **"Add new site"** > **"Import an existing project"**
2. Choose **"Deploy with GitHub"**
3. Authorize Netlify to access your GitHub
4. Select your church website repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click **"Deploy site"**

### Step 4: Set Up Custom Domain (Optional)

1. Go to **"Domain settings"** in your Netlify site
2. Click **"Add custom domain"**
3. Enter your domain (e.g., `www.yourchurch.org`)
4. Follow Netlify's instructions to update your DNS settings

---

## Environment Variables

Now you need to add all your API keys to Netlify.

### Add Variables in Netlify

1. Go to your Netlify site dashboard
2. Click **"Site configuration"** > **"Environment variables"**
3. Add each of these variables (click "Add a variable" for each):

| Variable Name | Value |
|--------------|-------|
| `VITE_FIREBASE_API_KEY` | Your Firebase API Key |
| `VITE_FIREBASE_AUTH_DOMAIN` | `your-project.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | Your Firebase Project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | `your-project.appspot.com` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Your Firebase Sender ID |
| `VITE_FIREBASE_APP_ID` | Your Firebase App ID |
| `VITE_YOUTUBE_API_KEY` | Your YouTube API Key |
| `VITE_YOUTUBE_CHANNEL_ID` | Your YouTube Channel ID |
| `VITE_EMAILJS_SERVICE_ID` | Your EmailJS Service ID |
| `VITE_EMAILJS_TEMPLATE_ID` | Your EmailJS Template ID |
| `VITE_EMAILJS_PUBLIC_KEY` | Your EmailJS Public Key |
| `VITE_GEMINI_API_KEY` | Your Gemini API Key (if using chatbot) |
| `VITE_ADMIN_EMAILS` | Email addresses for admins (comma-separated) |
| `VITE_SITE_URL` | Your website URL (e.g., `https://www.yourchurch.org`) |

4. After adding all variables, click **"Deploys"** > **"Trigger deploy"** > **"Deploy site"**

### Create a Local .env File (For Development)

Create a file named `.env.local` in your project folder with the same variables:

```
VITE_FIREBASE_API_KEY=your_key_here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123:web:abc123
VITE_YOUTUBE_API_KEY=your_youtube_key
VITE_YOUTUBE_CHANNEL_ID=UCxxxxxxxxxx
VITE_EMAILJS_SERVICE_ID=service_xxx
VITE_EMAILJS_TEMPLATE_ID=template_xxx
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_GEMINI_API_KEY=your_gemini_key
VITE_ADMIN_EMAILS=pastor@yourchurch.org,admin@yourchurch.org
VITE_SITE_URL=https://www.yourchurch.org
```

---

## Customize Your Church Content

### Files to Edit

Here are the main files you'll need to customize:

#### 1. Church Name and Tagline
**File:** `src/components/HeroSection.jsx`
- Change "New Life" to your church name
- Update the tagline/mission statement

#### 2. Contact Information
**File:** `src/components/ContactSection.jsx`
- Update address, phone, email
- Update social media links (YouTube, Facebook, Instagram)
- Update the Google Maps embed URL

#### 3. Footer
**File:** `src/components/Footer.jsx`
- Update church name and address
- Update the logo path

#### 4. About/Beliefs Section
**File:** `src/components/AboutSection.jsx`
- Customize the "Purpose of the Church" content
- Update theological distinctives

#### 5. Service Times
**File:** `src/components/ContactSection.jsx`
- Update service times in the `contactInfo` array

#### 6. Logo
- Replace `/public/NL_Logo_300.jpg` with your church logo
- Update references in `Footer.jsx` and other files

#### 7. Hero Background Image
- Replace `src/assets/nl_santuary_wide.jpg` with your church photo
- Update the import in `HeroSection.jsx`

#### 8. Chatbot Knowledge Base (if using)
**File:** `src/data/knowledgeBase.json`
- Update with your church's information, beliefs, service times, etc.

### Optional: Events and Ministries

**File:** `src/components/EventsSection.jsx`
- Add your church's events

**File:** `src/components/MinistriesSection.jsx`
- Add your church's ministries

---

## Set Up Your First Admin

Admins can manage alerts, promo banners, vet users, and moderate prayer requests.

### Step 1: Create the Admin Allowlist in Firebase

1. Go to your [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **"Firestore Database"**
4. Click **"Start collection"**
5. For Collection ID, enter: `config`
6. For Document ID, enter: `adminAllowlist`
7. Add a field:
   - Field name: `emails`
   - Type: `map`
8. Inside the map, add your admin email:
   - Key: `pastor@yourchurch.org` (your email)
   - Value: `true` (boolean)
9. Click **"Save"**

### Step 2: Register and Promote Yourself

1. Go to your website
2. Navigate to the **Members** section
3. Click **"Register"** and create an account with the email you added above
4. The system will automatically recognize you as an admin

---

## Deploy Firebase Rules

The Firestore security rules protect your database. You need to deploy them.

### Option A: Using Firebase Console (Easier)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **"Firestore Database"** > **"Rules"**
4. Copy the contents of `firestore.rules` from your project
5. Paste it into the rules editor
6. Click **"Publish"**

Also deploy the indexes:
1. Go to **"Firestore Database"** > **"Indexes"**
2. Create each index listed in `firestore.indexes.json`:
   - Collection: `prayerRequests`, Fields: `isVetted (Asc)`, `createdAt (Desc)`
   - Collection: `prayerRequests`, Fields: `userId (Asc)`, `createdAt (Desc)`
   - Collection: `alerts`, Fields: `enabled (Asc)`, `updatedAt (Desc)`

### Option B: Using Firebase CLI (Advanced)

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init` (select Firestore)
4. Deploy: `firebase deploy --only firestore:rules,firestore:indexes`

---

## Ongoing Maintenance

### Managing Alerts

1. Log into the Members area as an admin
2. Scroll to the **Alert Banners** section
3. Create alerts for weather cancellations, special announcements, etc.
4. Enable/disable alerts with one click

### Managing Promo Banners

1. Log into the Members area as an admin
2. Use the **Promo Banners** section to add featured videos or announcements

### Managing Users

1. Log into the Members area as an admin
2. Use **User Management** to:
   - Vet new users (allow their prayer requests to be visible)
   - Promote users to admin role
   - Remove users if needed

### Updating Content

To update website content:
1. Edit the relevant files in the `src/` folder
2. Commit and push to GitHub
3. Netlify will automatically rebuild and deploy

---

## Troubleshooting

### "API key not valid" Errors
- Double-check your environment variables in Netlify
- Make sure there are no extra spaces or quotes
- Trigger a new deploy after adding variables

### YouTube Videos Not Loading
- Verify your YouTube API key is correct
- Check that YouTube Data API v3 is enabled in Google Cloud
- Verify your Channel ID is correct

### Contact Form Not Working
- Check EmailJS credentials
- Make sure the email template variables match exactly
- Check browser console for error messages

### Login Not Working
- Verify Firebase Authentication is enabled
- Check Firebase API key and project ID
- Make sure Email/Password provider is enabled

### Need Help?

If you get stuck:
1. Check the browser's developer console (F12) for error messages
2. Verify all environment variables are set correctly
3. Make sure Firebase rules are deployed

---

## Summary of Services Needed

| Service | Purpose | Cost |
|---------|---------|------|
| Firebase | Login system, database | Free tier is generous |
| YouTube API | Display sermon videos | Free (10,000 quota/day) |
| EmailJS | Contact form emails | Free (200 emails/month) |
| Gemini AI | Chatbot (optional) | Free tier available |
| Netlify | Website hosting | Free for most churches |
| GitHub | Code storage | Free |

**Total cost: $0/month** for most small to medium churches!

---

## Credits

This template was created for New Life Bible Fellowship Church and is freely available for other churches to use.

For questions or contributions, please open an issue on GitHub.

*"To pursue God's glory in all things among all people"*
