import { getRelevantKnowledge } from './ragSystem.js';

// The API is now handled by a secure Netlify Function on the backend.
// This prevents the API key from being exposed in the browser.
const BACKEND_URL = '/.netlify/functions/ask-gemini';

// Log usage statistics
function logUsage(inputLength, outputLength) {
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
    // Simple estimation for logging purposes
    usage[today].inputTokens += Math.ceil(inputLength / 4);
    usage[today].outputTokens += Math.ceil(outputLength / 4);

    localStorage.setItem(storageKey, JSON.stringify(usage));

    console.log(`Chatbot Usage - Today: ${usage[today].queries} queries`);
  } catch (e) {
    console.error('Error logging usage:', e);
  }
}

export async function sendMessageToGemini(message, conversationHistory = []) {
  try {
    console.log('Getting relevant knowledge for query:', message);

    // Use RAG to get only relevant knowledge base sections
    const relevantKnowledge = getRelevantKnowledge(message);

    console.log('Sending request to secure backend...');

    const response = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        conversationHistory,
        relevantKnowledge
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Server Error: ${response.status}`);
    }

    const data = await response.json();
    const reply = data.reply;

    if (!reply) {
      throw new Error('No response received from assistant');
    }

    // Log usage (approximate)
    logUsage(message.length + (relevantKnowledge?.length || 0), reply.length);

    return reply;
  } catch (error) {
    console.error('Chatbot Error:', error.message);
    throw error;
  }
}

