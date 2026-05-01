const SYSTEM_PROMPT_TEMPLATE = `You are "Ask New Life", an assistant for New Life Bible Fellowship Church, Long Neck, DE.

RULES:
- Answer ONLY using the knowledge base below
- If info isn't available, say: "I don't have that information. Contact (302)945-8145 or office@newlifebfcde.org"
- Be friendly and concise
- Cite sources when referencing scripture or policies

KNOWLEDGE BASE:
{KNOWLEDGE}

Answer based ONLY on the above information:`;

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export const handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { message, conversationHistory, relevantKnowledge } = JSON.parse(event.body);

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    if (!GEMINI_API_KEY) {
      console.error('Missing GEMINI_API_KEY environment variable');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Server configuration error' }),
      };
    }

    const systemPrompt = SYSTEM_PROMPT_TEMPLATE.replace('{KNOWLEDGE}', relevantKnowledge || 'No specific knowledge provided.');

    // Build conversation context
    const context = conversationHistory
      ? conversationHistory
          .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.text}`)
          .join('\n')
      : '';

    const fullPrompt = `${systemPrompt}\n\n${context ? 'Previous conversation:\n' + context + '\n\n' : ''}User: ${message}`;

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
      console.error('Gemini API Error:', errorText);
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'Failed to communicate with AI service' }),
      };
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'No response received from AI' }),
      };
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ reply }),
    };
  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
