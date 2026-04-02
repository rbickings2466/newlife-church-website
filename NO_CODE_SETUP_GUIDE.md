# 🖱️ No-Code Setup Guide: Launch Your Church Website

This guide is designed for people with **zero coding experience**. We will build and launch your new church website using only your web browser. 

You will not need to install complex software, download files onto your computer, or type out confusing terminal commands. 

There are 4 main steps:
1. **Get Your Copy:** Copying this template to your own account.
2. **Customize Text & Images:** Editing the text securely in the browser.
3. **Launch the Site:** Connecting it to the internet for free.
4. **Final Configurations:** Making the contact forms and (optional) chatbot work.

---

## Step 1: Get Your Own Copy (Forking on GitHub)

To begin editing the website without changing our original template, you need your own "copy" stored safely in the cloud (on a service called GitHub).

### 1. Create a GitHub Account
1. Go to [github.com/signup](https://github.com/signup)
2. Enter your email address and choose a password.
3. Follow the prompts to create your account (the free account is all you need).
4. *Important: Verify your email address by clicking the link GitHub sends you.*

### 2. Copy the Template ("Forking")
1. Make sure you are logged into your new GitHub account.
2. Go to the link provided by New Life Bible Fellowship for this template.
3. Look for the button near the top right that says **"Fork"** (it might look like a splitting arrow) and click it.
4. On the next screen, you can rename the "Repository name" to something like `my-church-website`.
5. Make sure you **uncheck** the box that says "Copy the main branch only" (you want all the branches, especially the `reusable-template` branch).
6. Click the green **"Create fork"** button.

*Wait a few seconds. GitHub is now copying all the website files into your account! Choose the `reusable-template` branch from the branch dropdown menu on the left side of your new repository page.*

---

## Step 2: Customize Text & Images

Now that you have your own copy, you can change the text to match your church directly in your browser.

### 1. Change the Main Website Text
1. In your GitHub repository, click on the folder named **`src`**.
2. Click on the folder named **`config`**.
3. Click on the file named **`siteConfig.js`**.
4. Click the small **pencil icon ✏️** (Edit) in the top right of the code box.
5. You are now editing the code! 
   * **Crucial Rule:** Only change the text *inside* the single quotes (`'like this'`). Do not delete the quotes, commas, or brackets.
6. Scroll through the file and change the `name`, `shortName`, `address`, `phone`, `email`, and `serviceTimes` to match your church.
7. When you are done, click the green **"Commit changes..."** button in the top right.
8. A box will pop up. Click the green **"Commit changes"** button again to save.

*(You can repeat this process for the `src/data/leaders.js` file to add your pastors and elders).*

### 2. Upload Your Church Logo and Photos
1. Go back to the main page of your repository.
2. Click on the folder named **`public`**.
3. In the top right, click **"Add file"** and then **"Upload files"**.
4. Drag and drop your church logo here. 
   * *Tip: Name your logo exactly `NL_Logo_300.jpg` or `.png` to replace ours automatically, OR upload your own filename and remember the name.*
5. Click **"Commit changes"**.
6. Repeat this process in the **`src/assets`** folder to upload photos of your sanctuary or church leaders.

### 3. Tell the Website Which Images to Use
If you uploaded images with *new* names (like `our-pastor.jpg`), you need to tell the code to use them.
1. Go back to `src/config/siteConfig.js` or `src/data/leaders.js`.
2. Find where the image is referenced (e.g., `image: '/NL_Logo_300.jpg'`).
3. Change it to exactly match the file you uploaded (e.g., `image: '/my-church-logo.jpg'`).
4. **Commit changes.**

---

## Step 3: Put It On The Internet (Deploying with Netlify)

Your code is ready! Now we need a service to "host" it (put it on the internet). We will use Netlify because it's free and connects directly to your GitHub account.

### 1. Create a Netlify Account
1. Go to [app.netlify.com/signup](https://app.netlify.com/signup)
2. Click **"Sign up with GitHub"**. 
3. Authorize Netlify to connect to your GitHub account.

### 2. Launch Your Site
1. In your Netlify dashboard, click **"Add new site"** and then **"Import an existing project"**.
2. Click **"Deploy with GitHub"**.
3. Search for and select the repository you created earlier (e.g., `my-church-website`).
4. In the settings that appear:
   * Leave "Branch to deploy" as `main` (if you merged your changes) or `reusable-template` (if that's where you made the edits).
   * Leave "Build command" as `npm run build`.
   * Leave "Publish directory" as `dist`.
5. Click **"Deploy site"**.

*Netlify is now building your website! This usually takes 1-2 minutes. When it's done, they will give you a temporary link (like `amazing-site-123.netlify.app`) that you can click to see your live website!*

---

## Step 4: Final Configurations (API Keys)

To make things like the "Contact Us" form or the AI Chatbot work, you need to provide "secret keys" to Netlify.

### 1. Gather Your Keys
*Review the `CHURCH_SETUP_CHECKLIST.md` document in your repository for instructions on how to get free keys for YouTube, EmailJS (for contact forms), and Firebase.*

### 2. Add Keys to Netlify
1. Go to your site in the Netlify Dashboard.
2. Click on **"Site configuration"** (or Settings).
3. On the left menu, click **"Environment variables"**.
4. Click **"Add a variable"**.
5. Add each key one by one. For example:
   * **Key:** `VITE_YOUTUBE_API_KEY`
   * **Value:** `paste_your_long_key_here`
6. Click **"Save"**.
7. Once you've added all your keys, go to the "Deploys" tab at the top.
8. Click **"Trigger deploy"** and then **"Deploy site"** so your website restarts with the new keys.

---
## 🎉 Congratulations!

Your church website is now fully functional! 

Anytime you want to update service times or add an alert banner regarding weather, simply go back to GitHub, edit `src/config/siteConfig.js` or `src/config/alertConfig.js`, and click "Commit changes." 

**Netlify is smart—it will automatically detect the change in GitHub and update your live website within minutes!**
