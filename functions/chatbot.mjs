const SYSTEM_PROMPT_TEMPLATE = `You are "Ask New Life", an assistant for New Life Bible Fellowship Church, Long Neck, DE.

RULES:
- Answer ONLY using the knowledge base below
- If info isn't available, say: "I don't have that information. Contact (302)945-8145 or office@newlifebfcde.org"
- Be friendly and concise
- Cite sources when referencing scripture or policies

KNOWLEDGE BASE:
{KNOWLEDGE}

Answer based ONLY on the above information:`;

// Updated to Gemini 2.5 Flash (v1 Stable) as Gemini 1.5 has been retired.
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent';

export const handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method Not Allowed' }) 
    };
  }

  try {
    if (!event.body) {
      throw new Error('Empty request body');
    }

    const payload = JSON.parse(event.body);
    const { message, conversationHistory, relevantKnowledge } = payload;

    if (!message) {
      throw new Error('No message provided');
    }

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    if (!GEMINI_API_KEY) {
      console.error('SERVER_ERROR: GEMINI_API_KEY is not set');
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'API key not configured on server' }),
      };
    }

    const systemPrompt = SYSTEM_PROMPT_TEMPLATE.replace('{KNOWLEDGE}', relevantKnowledge || 'No specific knowledge provided.');

    // Build conversation context safely
    let context = '';
    if (Array.isArray(conversationHistory)) {
      context = conversationHistory
        .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.text}`)
        .join('\n');
    }

    const fullPrompt = `${systemPrompt}\n\n${context ? 'Previous conversation:\n' + context + '\n\n' : ''}User: ${message}`;

    console.log('Forwarding request to Gemini API (v1/gemini-2.5-flash)...');

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

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API Error Response:', response.status, errorText);
      return {
        statusCode: response.status,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          error: `Google API Error: ${response.status}`,
          details: errorText 
        }),
      };
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'No response received from AI candidates' }),
      };
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ reply }),
    };
  } catch (error) {
    console.error('CHATBOT_FUNCTION_ERROR:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        error: 'Internal server error', 
        message: error.message 
      }),
    };
  }
};
