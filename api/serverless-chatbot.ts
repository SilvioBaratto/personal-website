import type { VercelRequest, VercelResponse } from '@vercel/node';

// Dynamic import for BAML client to handle ES module in Vercel
let b: any;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Initialize BAML client on first request
  if (!b) {
    const bamlModule = await import('../baml_client/async_client');
    b = bamlModule.b;
  }
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, conversationHistory, context } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required and must be a string' });
    }

    // Call BAML function (non-streaming)
    const response = await b.StreamChatWithSilvio(
      message,
      conversationHistory || null,
      context || null
    );

    return res.json(response);
  } catch (error) {
    console.error('Chatbot API error:', error);
    return res.status(500).json({
      error: 'Failed to process message',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
