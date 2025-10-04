# 📚 How to Add Knowledge Documents to the Chatbot

The "Ask New Life" chatbot uses knowledge documents to answer questions about your church.

## ✨ What Changed

I've **upgraded** the knowledge base system! Now it **automatically** includes ALL `.txt` files in the `src/docs/` folder. You don't need to edit any code!

---

## 🚀 Quick Steps to Add New Knowledge

### Step 1: Create Your Text File

1. Navigate to the docs folder:
   ```bash
   cd "/Users/rbickings/Desktop/New Life Website/newlife-church/src/docs"
   ```

2. Create a new `.txt` file with any name:
   - Example: `Missions Information.txt`
   - Example: `Youth Ministry.txt`  
   - Example: `Special Events.txt`

3. Add your content as plain text. The chatbot will use this to answer questions.

### Step 2: Update the Knowledge Base

Run this command from your project folder:

```bash
cd "/Users/rbickings/Desktop/New Life Website/newlife-church"
npm run update-knowledge
```

**That's it!** The script automatically:
- ✅ Finds ALL `.txt` files in `src/docs/`
- ✅ Reads their contents
- ✅ Generates the knowledge base file
- ✅ Shows you what was added

### Step 3: Test & Deploy

**For local testing:**
```bash
npm run dev
# Click "Ask New Life" button and test the chatbot
```

**For deployment:**
```bash
npm run build
# Upload the new dist folder to Netlify
# OR commit and push to GitHub (auto-deploys)
```

---

## 📝 Example: Adding a Missions Document

1. **Create the file:**
   ```bash
   # In src/docs/ folder
   touch "Church Missions.txt"
   ```

2. **Add content** (open in text editor):
   ```
   CHURCH MISSIONS INFORMATION
   
   New Life Bible Fellowship Church supports several missionaries:
   
   1. John Smith - Missionary to Thailand
   2. Mary Johnson - Bible translation in Africa
   3. Local outreach programs in Millsboro
   
   To support missions, visit our giving page or contact the church office.
   ```

3. **Update knowledge base:**
   ```bash
   npm run update-knowledge
   ```

4. **Done!** The chatbot can now answer questions about missions.

---

## 📋 Current Knowledge Documents

Run this to see what's currently included:
```bash
npm run update-knowledge
```

You'll see output like:
```
✅ Read 5 source documents:
   1. A BRIEF HISTORY OF THE BIBLE FELLOWSHIP CHURCH
   2. Knowledge Document for the Ask New Life Gem
   3. MEN AND WOMEN ROLES rev2
   4. Summary of BFC AOF and BPL
   5. The Gospel_ God's Plan of Salvation
```

---

## 🔧 Tips for Good Knowledge Documents

### ✅ DO:
- Use clear, factual information
- Organize with headings and sections
- Include contact information where relevant
- Keep information up-to-date
- Use plain text format (.txt files)

### ❌ DON'T:
- Include sensitive personal information
- Use special formatting (bold, italics won't work)
- Add images or links (just text)
- Make files too large (keep under 50KB each)

---

## 🔄 To Remove a Document

Simply delete the `.txt` file from `src/docs/` and run:
```bash
npm run update-knowledge
```

The knowledge base will automatically exclude it.

---

## 🚀 Advanced: Editing Existing Documents

1. Open any `.txt` file in `src/docs/`
2. Make your changes
3. Save the file
4. Run: `npm run update-knowledge`
5. Rebuild and redeploy

---

## 📊 Knowledge Base Stats

After running `npm run update-knowledge`, you'll see:
- Number of documents
- Total character count
- List of all included files

**Current capacity:** The chatbot can handle ~100,000 characters comfortably.

---

## ❓ Troubleshooting

**"No .txt files found"**
- Make sure files have `.txt` extension
- Check they're in `src/docs/` folder

**"Chatbot not showing new info"**
- Did you run `npm run update-knowledge`?
- Did you rebuild the site (`npm run build`)?
- Clear browser cache and refresh

**"Script fails to run"**
- Make sure you're in the project root folder
- Check file permissions
- Verify Node.js is installed

---

## 🎯 Summary

**To add new knowledge:**
1. Add `.txt` file to `src/docs/`
2. Run `npm run update-knowledge`
3. Rebuild and deploy

**That's it!** The system does the rest automatically. 🚀

---

**Questions?** Check README_CHATBOT.md or contact support.
