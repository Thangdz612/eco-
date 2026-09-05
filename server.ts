import express from 'express';
import path from 'path';
import fs from 'fs';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured');
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const isProduction = process.env.NODE_ENV === 'production';
  // In development, the container ingress proxy routes external traffic strictly to port 3000.
  // In deployed Cloud Run production, Cloud Run routes traffic to process.env.PORT (defaults to 8080).
  const PORT = isProduction
    ? (process.env.PORT ? parseInt(process.env.PORT, 10) : 8080)
    : 3000;

  app.use(express.json());

  // Readiness & liveness health check routes for Cloud Run rollout
  app.get(['/api/health', '/health', '/healthz'], (_req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.post('/api/ai/chat', async (req, res) => {
    try {
      const { prompt } = req.body;
      if (!prompt || typeof prompt !== 'string') {
        res.status(400).json({ error: 'Prompt is required' });
        return;
      }
      const ai = getGeminiClient();
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      res.json({ text: response.text });
    } catch (err: any) {
      console.error('Gemini error:', err);
      res.status(500).json({ error: err?.message || 'Gemini service error' });
    }
  });

  // Vite middleware for development vs static serve for production
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = fs.existsSync(path.join(process.cwd(), 'dist'))
      ? path.join(process.cwd(), 'dist')
      : path.resolve(__dirname);
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT} (NODE_ENV: ${process.env.NODE_ENV || 'development'})`);
  });

  process.on('SIGTERM', () => {
    console.log('Received SIGTERM, closing server...');
    server.close(() => {
      console.log('Server gracefully terminated.');
      process.exit(0);
    });
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
