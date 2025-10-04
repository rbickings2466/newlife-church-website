import { FULL_KNOWLEDGE_BASE } from '../data/knowledgeBase.js';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

const SYSTEM_PROMPT = `You are "Ask New Life", a helpful assistant for New Life Bible Fellowship Church in Long Neck, Delaware.

IMPORTANT INSTRUCTIONS:
1. You can ONLY answer questions using the information provided in the knowledge base below.
2. If a question cannot be answered using the knowledge base, politely say: "I don't have that information in my knowledge base. Please contact the church office at (302)945-8145 or office@newlifebfcde.org for more details."
3. Be friendly, warm, and helpful in your responses.
4. Keep answers concise but complete.
5. When referencing scripture or church policies, cite the specific information from the knowledge base.
6. For doctrinal questions, provide detailed answers from the Articles of Faith section.
7. For questions about roles and gender, provide thorough answers from the Roles document.

${FULL_KNOWLEDGE_BASE}

Now, please answer the following question based ONLY on the information above:`;

export async function sendMessageToGemini(message, conversationHistory = []) {
  try {
    // Check if API key exists
    if (!GEMINI_API_KEY) {
      console.error('Gemini API key is missing');
      throw new Error('API key not configured');
    }

    // Build conversation context
    const context = conversationHistory
      .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.text}`)
      .join('\n');

    const fullPrompt = `${SYSTEM_PROMPT}\n\n${context ? 'Previous conversation:\n' + context + '\n\n' : ''}User: ${message}`;

    console.log('Sending request to Gemini API...');

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: fullPrompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1000,
        },
      }),
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const error = await response.json();
      console.error('API Error Response:', error);
      throw new Error(error.error?.message || `API Error: ${response.status}`);
    }

    const data = await response.json();
    console.log('API Response:', data);

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      console.error('No reply in response:', data);
      throw new Error('No response received from Gemini');
    }

    return reply;
  } catch (error) {
    console.error('Gemini API Error Details:', error);
    console.error('Error message:', error.message);
    throw error;
  }
}
