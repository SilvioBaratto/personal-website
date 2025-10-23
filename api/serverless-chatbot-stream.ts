import type { VercelRequest, VercelResponse } from '@vercel/node';

// Dynamic import for BAML client to handle ES module in Vercel
let b: any;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Initialize BAML client on first request
  if (!b) {
    const bamlModule = await import('./_baml');
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

    // Set headers for Server-Sent Events
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    try {
      // Call BAML function and get complete response
      const response = await b.StreamChatWithSilvio(
        message,
        conversationHistory || null,
        context || null
      );

      // Stream the response word by word
      const words = response.answer.split(' ');
      let accumulatedText = '';

      for (let i = 0; i < words.length; i++) {
        accumulatedText += (i > 0 ? ' ' : '') + words[i];

        const chunk = {
          answer: accumulatedText,
          category: response.category,
          sources: response.sources,
          urls: response.urls,
          follow_up_suggestions: response.follow_up_suggestions,
          isComplete: i === words.length - 1
        };

        res.write(`data: ${JSON.stringify(chunk)}\n\n`);

        // Small delay between words for streaming effect
        await new Promise(resolve => setTimeout(resolve, 30));
      }

      res.write('data: [DONE]\n\n');
      res.end();
      return;
    } catch (streamError) {
      const errorData = {
        error: 'Streaming failed',
        details: streamError instanceof Error ? streamError.message : 'Unknown error'
      };
      res.write(`data: ${JSON.stringify(errorData)}\n\n`);
      res.end();
      return;
    }
  } catch (error) {
    console.error('Chatbot streaming error:', error);
    return res.status(500).json({
      error: 'Failed to process message',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
