# 🚀 Deployment Guide - New Life Bible Fellowship Church Website

This guide will help you deploy your church website to the internet.

## 📦 What's Already Done

✅ Site built and tested  
✅ Git repository initialized  
✅ Deployment configs created (Netlify, Vercel)  
✅ .gitignore configured to protect sensitive files  

---

## 🎯 Recommended: Deploy to Netlify (Easiest)

### Option A: Manual Deployment (Quick Start)

1. **Go to Netlify**
   - Visit [netlify.com](https://www.netlify.com)
   - Click "Sign up" (use GitHub, email, or GitLab)

2. **Deploy Your Site**
   - Click "Add new site" → "Deploy manually"
   - Drag and drop the `dist` folder from your project
   - Wait 30 seconds... Done! 🎉

3. **Your site is live!**
   - You'll get a URL like: `random-name-123.netlify.app`
   - Click "Site settings" → "Change site name" to customize

4. **Connect Your Domain (newlifebfcde.org)**
   - In site settings → "Domain management"
   - Click "Add custom domain"
   - Enter: `newlifebfcde.org`
   - Netlify will show you DNS records to update
   - Contact your domain registrar and update DNS:
     ```
     Type: A
     Name: @
     Value: 75.2.60.5
     
     Type: CNAME
     Name: www
     Value: your-site.netlify.app
     ```
   - Wait 24-48 hours for DNS propagation

---

### Option B: Automatic Deployment via GitHub (Recommended for Updates)

**First, create a GitHub repository:**

1. **Go to GitHub**
   - Visit [github.com](https://github.com)
   - Click the "+" icon → "New repository"
   - Name it: `newlife-church-website`
   - Keep it **Private** (to protect environment variables)
   - Click "Create repository"

2. **Connect Your Local Repository**
   ```bash
   cd "/Users/rbickings/Desktop/New Life Website/newlife-church"
   git remote add origin https://github.com/YOUR-USERNAME/newlife-church-website.git
   git branch -M main
   git push -u origin main
   ```
   Replace `YOUR-USERNAME` with your GitHub username.

3. **Deploy to Netlify from GitHub**
   - Go to [netlify.com](https://www.netlify.com) and log in
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub"
   - Authorize Netlify to access your repositories
   - Select `newlife-church-website`
   - Build settings (should auto-detect):
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"

4. **Add Environment Variables**
   - In Netlify dashboard → "Site settings" → "Environment variables"
   - Add these variables (click "Add a variable"):
     ```
     VITE_FIREBASE_API_KEY=your_firebase_api_key
     VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
     VITE_FIREBASE_PROJECT_ID=your_project_id
     VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
     VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
     VITE_FIREBASE_APP_ID=your_app_id
     
     VITE_YOUTUBE_API_KEY=your_youtube_api_key
     VITE_YOUTUBE_CHANNEL_ID=UChfYNpsG6ciJa_N6aBryi_Q
     
     VITE_EMAILJS_SERVICE_ID=your_service_id
     VITE_EMAILJS_TEMPLATE_ID=your_template_id
     VITE_EMAILJS_PUBLIC_KEY=your_public_key
     
     VITE_GEMINI_API_KEY=your_gemini_api_key
     ```
   - Click "Save"
   - Trigger a redeploy: "Deploys" tab → "Trigger deploy" → "Deploy site"

**Now, every time you push to GitHub, Netlify will automatically rebuild and deploy!** 🎉

---

## 🔄 How to Update Your Site After Deployment

### If using manual deployment:
```bash
npm run build
# Then drag/drop the new dist folder to Netlify
```

### If using GitHub auto-deploy:
```bash
git add .
git commit -m "Update website content"
git push
# Netlify automatically deploys!
```

---

## 🌐 Alternative: Deploy to Vercel

1. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Import Your Project**
   - Click "Add New" → "Project"
   - Import your `newlife-church-website` repository
   - Vercel auto-detects settings
   - Add environment variables (same as Netlify list above)
   - Click "Deploy"

3. **Custom Domain**
   - Project settings → "Domains"
   - Add `newlifebfcde.org`
   - Update DNS records as instructed

---

## 🔧 Troubleshooting

### "Site not loading after deployment"
- Check browser console for errors (F12)
- Verify all environment variables are set
- Check Netlify/Vercel build logs for errors

### "Forms not working"
- Verify EmailJS environment variables
- Test EmailJS dashboard to ensure service is active

### "YouTube videos not loading"
- Check YouTube API key is correct
- Verify API key has YouTube Data API v3 enabled
- Check quota limits in Google Cloud Console

### "Members section not working"
- Verify Firebase environment variables
- Check Firebase Authentication is enabled
- Ensure Firestore rules allow authenticated users

### "Domain not connecting"
- DNS changes take 24-48 hours
- Use [dnschecker.org](https://dnschecker.org) to verify propagation
- Ensure no conflicting DNS records at registrar

---

## 📧 Need Help?

- Netlify Support: [netlify.com/support](https://www.netlify.com/support/)
- Vercel Support: [vercel.com/help](https://vercel.com/help)
- Firebase Docs: [firebase.google.com/docs](https://firebase.google.com/docs)

---

## 🎉 You're Done!

Your church website is now live and accessible to the world!

**Next Steps:**
1. Test all features on the live site
2. Share the URL with your church leadership
3. Update Google My Business with new website URL
4. Submit to search engines (Google Search Console)
5. Monitor analytics and performance

---

**Built with ❤️ for New Life Bible Fellowship Church**
