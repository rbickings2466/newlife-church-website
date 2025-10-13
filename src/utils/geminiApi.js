import { getRelevantKnowledge } from './ragSystem.js';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

const SYSTEM_PROMPT_TEMPLATE = `You are "Ask New Life", an assistant for New Life Bible Fellowship Church, Long Neck, DE.

RULES:
- Answer ONLY using the knowledge base below
- If info isn't available, say: "I don't have that information. Contact (302)945-8145 or office@newlifebfcde.org"
- Be friendly and concise
- Cite sources when referencing scripture or policies

KNOWLEDGE BASE:
{KNOWLEDGE}

Answer based ONLY on the above information:`;

// Log usage statistics
function logUsage(inputTokens, outputTokens) {
  try {
    const today = new Date().toISOString().split('T')[0];
    const storageKey = 'askNewLife_usage';

    let usage = {};
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      usage = JSON.parse(stored);
    }

    if (!usage[today]) {
      usage[today] = { queries: 0, inputTokens: 0, outputTokens: 0 };
    }

    usage[today].queries++;
    usage[today].inputTokens += inputTokens;
    usage[today].outputTokens += outputTokens;

    // Keep only last 30 days of data
    const dates = Object.keys(usage);
    if (dates.length > 30) {
      dates.sort();
      const toDelete = dates.slice(0, dates.length - 30);
      toDelete.forEach(date => delete usage[date]);
    }

    localStorage.setItem(storageKey, JSON.stringify(usage));

    // Log summary to console for monitoring
    console.log(`Gemini API Usage - Today: ${usage[today].queries} queries, ${usage[today].inputTokens + usage[today].outputTokens} total tokens`);
  } catch (e) {
    console.error('Error logging usage:', e);
  }
}

export async function sendMessageToGemini(message, conversationHistory = []) {
  try {
    // Check if API key exists
    if (!GEMINI_API_KEY) {
      console.error('Gemini API key is missing');
      throw new Error('API key not configured');
    }

    console.log('Getting relevant knowledge for query:', message);

    // Use RAG to get only relevant knowledge base sections
    const relevantKnowledge = getRelevantKnowledge(message);

    console.log('Retrieved knowledge, length:', relevantKnowledge?.length || 0, 'chars');

    const systemPrompt = SYSTEM_PROMPT_TEMPLATE.replace('{KNOWLEDGE}', relevantKnowledge);

    // Build conversation context
    const context = conversationHistory
      .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.text}`)
      .join('\n');

    const fullPrompt = `${systemPrompt}\n\n${context ? 'Previous conversation:\n' + context + '\n\n' : ''}User: ${message}`;

    console.log('Sending request to Gemini API...');

    // Estimate input tokens (rough approximation: 1 token ≈ 4 characters)
    const estimatedInputTokens = Math.ceil(fullPrompt.length / 4);

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
      const errorText = await response.text();
      console.error('API Error Response (raw):', errorText);
      try {
        const error = JSON.parse(errorText);
        console.error('API Error Response (parsed):', error);
        throw new Error(error.error?.message || `API Error: ${response.status}`);
      } catch (e) {
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }
    }

    const data = await response.json();
    console.log('API Response received successfully');
    console.log('Candidates:', data.candidates?.length || 0);

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      console.error('No reply in response:', data);
      throw new Error('No response received from Gemini');
    }

    // Estimate output tokens
    const estimatedOutputTokens = Math.ceil(reply.length / 4);

    // Log usage
    logUsage(estimatedInputTokens, estimatedOutputTokens);

    return reply;
  } catch (error) {
    console.error('Gemini API Error Details:', error);
    console.error('Error message:', error.message);
    throw error;
  }
}
