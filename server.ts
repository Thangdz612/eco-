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

  // Direct meteorological query endpoint from Open-Meteo & ECMWF
  app.get('/api/weather/live', async (req, res) => {
    try {
      const lat = parseFloat(req.query.lat as string) || 11.1352;
      const lng = parseFloat(req.query.lng as string) || 106.5241;

      const params = new URLSearchParams({
        latitude: lat.toFixed(4),
        longitude: lng.toFixed(4),
        current:
          'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m,uv_index',
        hourly:
          'temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,weather_code,surface_pressure,uv_index,direct_normal_irradiance,wind_speed_10m,wind_gusts_10m',
        daily:
          'temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,uv_index_max,wind_speed_10m_max',
        past_days: '3',
        forecast_days: '4',
        timezone: 'Asia/Bangkok',
      });

      const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
      const response = await fetch(url);
      if (!response.ok) {
        res.status(response.status).json({ error: 'Failed to fetch from Open-Meteo' });
        return;
      }
      const data = await response.json();
      res.json({
        source: 'Open-Meteo & ECMWF Meteorological Database',
        apiUrl: url,
        data,
      });
    } catch (err: any) {
      console.warn('Weather API notice:', err?.message || err);
      res.status(500).json({ error: err?.message || 'Weather service error' });
    }
  });

  // Direct atmospheric & air quality query endpoint from Open-Meteo Air Quality & Copernicus CAMS
  app.get('/api/air-quality/live', async (req, res) => {
    try {
      const lat = parseFloat(req.query.lat as string);
      const lng = parseFloat(req.query.lng as string);

      if (isNaN(lat) || isNaN(lng)) {
        res.status(400).json({ error: 'Valid latitude and longitude required' });
        return;
      }

      const params = new URLSearchParams({
        latitude: lat.toFixed(4),
        longitude: lng.toFixed(4),
        current: 'european_aqi,us_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone',
        hourly: 'pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,us_aqi,european_aqi',
        timezone: 'Asia/Bangkok',
      });

      const url = `https://air-quality-api.open-meteo.com/v1/air-quality?${params.toString()}`;
      const response = await fetch(url);
      if (!response.ok) {
        res.status(response.status).json({ error: 'Failed to fetch from Open-Meteo Air Quality API' });
        return;
      }
      const data = await response.json();
      res.json({
        source: 'Open-Meteo Air Quality API • Copernicus Atmosphere Monitoring Service (CAMS) & NOAA GFS-Aerosol',
        dataType: 'forecast_model',
        apiUrl: url,
        data,
      });
    } catch (err: any) {
      console.warn('Air Quality API notice:', err?.message || err);
      res.status(500).json({ error: err?.message || 'Air quality service error' });
    }
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
