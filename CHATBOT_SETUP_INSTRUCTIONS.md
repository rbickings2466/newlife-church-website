# AI Chatbot Setup Instructions

The API-based chatbot has been successfully restored! Here's how to get it working.

## What Was Restored

The following files have been restored from your previous implementation:
- `src/utils/geminiApi.js` - Gemini API integration with usage tracking
- `src/utils/ragSystem.js` - RAG system for 99% token reduction
- `src/utils/rateLimiter.js` - Rate limiting (10 messages/hour)
- `src/components/ChatbotModal.jsx` - Chat interface modal
- `src/components/AskNewLifeButton.jsx` - Updated to open modal

## Cost Estimate

With the RAG optimization system:
- **~$0.00153 per message** (about 0.15 cents)
- **~$1-3 per month** for typical church website traffic
- Rate limiting prevents abuse (10 messages/hour per user)

### Setup Steps

### Step 1: Get a Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the API key (starts with `AIza...`)

**CRITICAL SECURITY:** Keep this key secret. Never share it or post it publicly.

### Step 2: Add API Key to Environment File

1. Open the file `.env.local` in your project root
2. Add this line (replace `YOUR_API_KEY_HERE` with your actual key):
   ```
   GEMINI_API_KEY=YOUR_API_KEY_HERE
   ```
   **Note:** Notice there is NO `VITE_` prefix. This is intentional. Removing the prefix prevents the key from being bundled into the public website code.

3. Save the file

### Step 3: Test Locally

1. Start the development server:
   ```bash
   npm run dev
   ```

2. The chatbot now uses a secure "Netlify Function" to talk to Google. This keeps your key safe.

3. Open your browser to the local URL (usually `http://localhost:5173`)
4. Click the "Ask New Life" button and try asking a question.

### Step 4: Deploy to Production

When deploying to Netlify:

1. **Add the API key to Netlify Environment Variables:**
   - Go to: **Site Settings** → **Environment Variables**
   - Click "Add a variable"
   - Key: `GEMINI_API_KEY` (No `VITE_` prefix!)
   - Value: `YOUR_API_KEY_HERE`

2. **Deploy the site:**
   ```bash
   git add .
   git commit -m "Secure chatbot with backend function"
   git push
   ```

## How It Works (Secure Version)

### Backend Proxy
Previously, the website talked directly to Google. This exposed your API key to anyone who visited the site. Now:
1. The website sends the question to a **Netlify Function** (a secure server-side script).
2. The Netlify Function retrieves the `GEMINI_API_KEY` from a private environment variable.
3. The Netlify Function talks to Google and returns the answer to your website.

**Result:** Your API key is never sent to the visitor's browser. It is 100% hidden.

## Usage Tracking
- Logs daily API usage to browser localStorage
- Keeps 30 days of history
- View in browser console: `Gemini API Usage - Today: X queries`

## Monitoring Costs

### In the Browser
Open the browser console (F12) and you'll see:
```
RAG: Retrieved 3 relevant chunks (~250 tokens vs ~19,000 full KB)
Gemini API Usage - Today: 5 queries, 12,500 total tokens
```

### In Google Cloud Console
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to: Billing → Reports
3. Filter by "Generative Language API"
4. Set up budget alerts (recommended: $5/month)

## Updating Knowledge Documents

Your chatbot answers are based on text files in `src/docs/`. To update:

1. Edit any `.txt` file in `src/docs/`
2. Run the update command:
   ```bash
   npm run update-knowledge
   ```
3. Rebuild and redeploy:
   ```bash
   npm run build
   ```

For detailed instructions, see: [HOW_TO_ADD_CHATBOT_KNOWLEDGE.md](HOW_TO_ADD_CHATBOT_KNOWLEDGE.md)

## Troubleshooting

### "API key not configured" error
- Make sure `GEMINI_API_KEY` is set in `.env.local` or Netlify Environment Variables
- Restart the dev server after adding the key
- For production, ensure it's set in Netlify environment variables

### High token usage
- Check browser console for RAG logs
- Should show: `~250 tokens vs ~19,000 full KB`
- If showing high numbers, RAG might not be working correctly

### Rate limit reached
- Users are limited to 10 messages/hour
- Wait time shown in the error message
- Can be adjusted in `src/utils/rateLimiter.js` (line 3)

### "No response received"
- Check browser console for detailed error messages
- Verify API key is correct
- Check Google Cloud Console for API quota/billing issues

## Features

✅ **Cost-Optimized:** 99% token reduction via RAG
✅ **Rate Limited:** 10 messages/hour prevents abuse
✅ **Usage Tracking:** Monitor daily API usage
✅ **Knowledge Base:** Answers from your church documents
✅ **Modal Interface:** Clean, professional UI
✅ **Mobile Friendly:** Works on all devices
✅ **Conversation History:** Remembers last 4 messages

## Cost Breakdown

Using Gemini 2.5 Flash pricing:
- Input: $0.30 per 1M tokens
- Output: $2.50 per 1M tokens

**Per message with RAG:**
- Input: ~2,600 tokens × $0.30 / 1M = $0.00078
- Output: ~300 tokens × $2.50 / 1M = $0.00075
- **Total: ~$0.00153 per message**

**Monthly estimates:**
- 200 messages: **$0.31**
- 500 messages: **$0.77**
- 1,000 messages: **$1.53**
- 2,500 messages: **$3.83**

## Security Notes

- Never commit `.env.local` to git (it's already in `.gitignore`)
- Keep your API key secure
- Monitor usage regularly
- Set up billing alerts in Google Cloud Console
- Rate limiting provides additional protection

## Support

For questions:
- Check browser console for error details
- Review [README_CHATBOT.md](README_CHATBOT.md)
- Contact: office@newlifebfcde.org

---

**Ready to go!** Just add your API key to `.env.local` and test locally before deploying.
