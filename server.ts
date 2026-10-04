import express from 'express';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

// Simple in-memory rate limiting by IP (60 requests/minute)
interface RateLimitRecord {
  count: number;
  resetTime: number;
}
const ipRateLimits = new Map<string, RateLimitRecord>();

function checkRateLimit(ip: string, limit = 60, windowMs = 60000): boolean {
  const now = Date.now();
  const record = ipRateLimits.get(ip);
  if (!record || now > record.resetTime) {
    ipRateLimits.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  if (record.count >= limit) {
    return false;
  }
  record.count += 1;
  return true;
}

// Clean up expired rate limit records every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of ipRateLimits.entries()) {
    if (now > record.resetTime) {
      ipRateLimits.delete(ip);
    }
  }
}, 300000);

// Validate coordinates: lat within [8.5, 11.3] and lng within [106.3, 107.2]
function parseAndValidateCoordinates(
  rawLat: any,
  rawLng: any
): { valid: true; lat: number; lng: number } | { valid: false; error: string } {
  if (rawLat === undefined || rawLat === null || rawLat === '' || rawLng === undefined || rawLng === null || rawLng === '') {
    return { valid: false, error: 'Thiếu tham số tọa độ lat hoặc lng.' };
  }
  const lat = Number(rawLat);
  const lng = Number(rawLng);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return { valid: false, error: 'Tọa độ lat và lng phải là số hợp lệ.' };
  }
  if (lat < 8.5 || lat > 11.3 || lng < 106.3 || lng > 107.2) {
    return {
      valid: false,
      error: `Tọa độ nằm ngoài phạm vi khu vực cho phép (lat: 8.5 - 11.3, lng: 106.3 - 107.2). Nhận được: lat=${lat}, lng=${lng}`,
    };
  }
  return { valid: true, lat, lng };
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

  // In-memory rate limiting middleware for API routes
  app.use('/api', (req, res, next) => {
    if (req.path.startsWith('/health')) {
      return next();
    }
    const clientIp =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ||
      req.socket.remoteAddress ||
      'unknown';

    if (!checkRateLimit(clientIp, 60, 60000)) {
      res.status(429).json({ error: 'Quá nhiều yêu cầu từ địa chỉ IP này. Vui lòng thử lại sau 1 phút.' });
      return;
    }
    next();
  });

  // Readiness & liveness health check routes for Cloud Run rollout
  app.get(['/api/health', '/health', '/healthz'], (_req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Direct meteorological query endpoint from Open-Meteo & ECMWF
  app.get('/api/weather/live', async (req, res) => {
    try {
      const coordValidation = parseAndValidateCoordinates(req.query.lat, req.query.lng);
      if (!coordValidation.valid) {
        res.status(400).json({ error: coordValidation.error });
        return;
      }
      const { lat, lng } = coordValidation;

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
      const coordValidation = parseAndValidateCoordinates(req.query.lat, req.query.lng);
      if (!coordValidation.valid) {
        res.status(400).json({ error: coordValidation.error });
        return;
      }
      const { lat, lng } = coordValidation;

      const params = new URLSearchParams({
        latitude: lat.toFixed(4),
        longitude: lng.toFixed(4),
        current: 'european_aqi,us_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone',
        hourly: 'pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,us_aqi,european_aqi',
        timezone: 'Asia/Bangkok',
        past_days: '1',
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
