# Ask New Life Chatbot - Knowledge Base Management

## Overview

The "Ask New Life" chatbot uses a knowledge base built from 4 text documents located in `src/docs/`.

## Updating the Knowledge Base

### Quick Start

1. **Edit any document** in the `src/docs/` folder:
   - `A BRIEF HISTORY OF THE BIBLE FELLOWSHIP CHURCH.txt`
   - `Knowledge Document for the Ask New Life Gem.txt`
   - `Summary of BFC AOF and BPL.txt`
   - `MEN AND WOMEN ROLES rev2.txt`

2. **Run the update command:**
   ```bash
   npm run update-knowledge
   ```

3. **Refresh your browser** to see the changes in the chatbot

### What the Update Script Does

The `npm run update-knowledge` command:
- ✅ Reads all 4 text files from `src/docs/`
- ✅ Combines them into a single knowledge base
- ✅ Generates `src/data/knowledgeBase.js` (auto-generated file)
- ✅ Shows statistics about the knowledge base size

### Important Notes

- **DO NOT** manually edit `src/data/knowledgeBase.js` - it's auto-generated
- **DO** edit the `.txt` files in `src/docs/` and then run `npm run update-knowledge`
- The chatbot will only answer questions based on information in these documents
- After updating, refresh your browser to see changes

## File Structure

```
src/
├── docs/                           # Source documents (EDIT THESE)
│   ├── A BRIEF HISTORY...txt
│   ├── Knowledge Document...txt
│   ├── Summary of BFC AOF...txt
│   └── MEN AND WOMEN ROLES...txt
├── data/
│   └── knowledgeBase.js           # Auto-generated (DON'T EDIT)
├── utils/
│   └── geminiApi.js               # Chatbot API logic
└── components/
    ├── AskNewLifeButton.jsx       # Chat button
    └── ChatbotModal.jsx           # Chat interface

scripts/
└── updateKnowledgeBase.mjs        # Update script
```

## Adding New Documents

To add a new knowledge document:

1. Add your new `.txt` file to `src/docs/`
2. Edit `scripts/updateKnowledgeBase.mjs` to include the new file
3. Run `npm run update-knowledge`

## Gemini API Configuration

The chatbot uses Google's Gemini API. The API key is stored in `.env.local`:

```
VITE_GEMINI_API_KEY=your_api_key_here
```

**Never commit the `.env.local` file to git!**

## Troubleshooting

### Chatbot not showing updated content
- Make sure you ran `npm run update-knowledge`
- Refresh your browser (hard refresh: Ctrl+Shift+R or Cmd+Shift+R)
- Check browser console for errors

### Script fails to run
- Make sure all 4 text files exist in `src/docs/`
- Check file names match exactly (case-sensitive)

### API errors
- Verify `VITE_GEMINI_API_KEY` is set in `.env.local`
- Check browser console for specific error messages
- Ensure you're not exceeding API rate limits

## Support

For questions, contact the church office:
- Phone: (302)945-8145
- Email: office@newlifebfcde.org
