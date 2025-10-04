# ⚡ Quick Start - Deploy in 5 Minutes

## 🚀 Fastest Way to Deploy

### Step 1: Build (Already Done! ✅)
Your site is built and ready in the `dist` folder.

### Step 2: Deploy to Netlify
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag your `dist` folder onto the page
3. Done! Your site is live! 🎉

### Step 3: Add Custom Domain
1. In Netlify → Site settings → Domain management
2. Add custom domain: `newlifebfcde.org`
3. Update DNS at your registrar with Netlify's nameservers

---

## 🔑 Environment Variables Checklist

After deployment, add these in Netlify dashboard:

- [ ] `VITE_FIREBASE_API_KEY`
- [ ] `VITE_FIREBASE_AUTH_DOMAIN`
- [ ] `VITE_FIREBASE_PROJECT_ID`
- [ ] `VITE_FIREBASE_STORAGE_BUCKET`
- [ ] `VITE_FIREBASE_MESSAGING_SENDER_ID`
- [ ] `VITE_FIREBASE_APP_ID`
- [ ] `VITE_YOUTUBE_API_KEY`
- [ ] `VITE_YOUTUBE_CHANNEL_ID`
- [ ] `VITE_EMAILJS_SERVICE_ID`
- [ ] `VITE_EMAILJS_TEMPLATE_ID`
- [ ] `VITE_EMAILJS_PUBLIC_KEY`
- [ ] `VITE_GEMINI_API_KEY`

---

## 🔄 Future Updates

```bash
# Make your changes, then:
npm run build

# Option 1: Manual upload
# Drag new dist folder to Netlify

# Option 2: Use GitHub (set up once)
git add .
git commit -m "Update content"
git push
# Automatically deploys!
```

---

## 📞 Quick Help

**Site URL after deploy:** Check Netlify dashboard  
**Build errors?** Check Netlify build logs  
**Need help?** See DEPLOYMENT_GUIDE.md for detailed instructions

Your site is ready to go live! 🚀
