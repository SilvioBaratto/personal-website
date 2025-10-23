import 'dotenv/config';
import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import { b } from './baml_client/index.js';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

// Add JSON body parser for API endpoints
app.use(express.json());

/**
 * Chatbot API endpoint using BAML (streaming with SSE)
 */
app.post('/api/chatbot/stream', async (req, res) => {
  try {
    const { message, conversationHistory, context } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required and must be a string' });
      return;
    }

    // Set headers for Server-Sent Events
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

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
    } catch (streamError) {
      const errorData = {
        error: 'Streaming failed',
        details: streamError instanceof Error ? streamError.message : 'Unknown error'
      };
      res.write(`data: ${JSON.stringify(errorData)}\n\n`);
      res.end();
    }
  } catch (error) {
    console.error('Chatbot streaming error:', error);
    res.status(500).json({
      error: 'Failed to process message',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * Chatbot API endpoint using BAML (non-streaming fallback)
 */
app.post('/api/chatbot', async (req, res) => {
  try {
    const { message, conversationHistory, context } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required and must be a string' });
      return;
    }

    // Call BAML function (non-streaming to avoid OpenAI verification requirement)
    const response = await b.StreamChatWithSilvio(
      message,
      conversationHistory || null,
      context || null
    );

    res.json(response);
  } catch (error) {
    console.error('Chatbot API error:', error);
    res.status(500).json({
      error: 'Failed to process message',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
