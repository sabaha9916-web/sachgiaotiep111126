import path from 'path';
import https from 'node:https';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

import { handleAuthApi } from './server/authService.js';

function instantTranslatePlugin() {
  return {
    name: 'instant-translate-plugin',
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        try {
          const handled = await handleAuthApi(req, res);
          if (!handled) next();
        } catch (err) {
          next(err);
        }
      });
      server.middlewares.use('/api/instant-translate', handleInstantTranslate);
    },
    configurePreviewServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        try {
          const handled = await handleAuthApi(req, res);
          if (!handled) next();
        } catch (err) {
          next(err);
        }
      });
      server.middlewares.use('/api/instant-translate', handleInstantTranslate);
    },
  };
}

function handleInstantTranslate(req: any, res: any) {
  const parsedUrl = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  const text = parsedUrl.searchParams.get('text') || '';
  const sl = parsedUrl.searchParams.get('sl') || 'auto';
  const tl = parsedUrl.searchParams.get('tl') || 'vi';

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (!text.trim()) {
    res.end(JSON.stringify({ translation: '' }));
    return;
  }

  const targetUrl = `https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=${encodeURIComponent(sl)}&tl=${encodeURIComponent(tl)}&q=${encodeURIComponent(text.trim())}`;
  const gReq = https.get(
    targetUrl,
    {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': '*/*',
      },
      timeout: 3500,
    },
    (gtRes) => {
      let body = '';
      gtRes.on('data', (chunk) => {
        body += chunk;
      });
      gtRes.on('end', () => {
        try {
          const data = JSON.parse(body);
          let translated = '';
          if (Array.isArray(data)) {
            translated = typeof data[0] === 'string' ? data[0] : (data[0]?.[0] || '');
          } else if (typeof data === 'string') {
            translated = data;
          }
          res.end(JSON.stringify({ translation: translated }));
        } catch {
          res.end(JSON.stringify({ translation: '' }));
        }
      });
    }
  );

  gReq.on('error', () => {
    res.end(JSON.stringify({ translation: '' }));
  });
  gReq.on('timeout', () => {
    gReq.destroy();
    res.end(JSON.stringify({ translation: '' }));
  });
}

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        strictPort: true,
        allowedHosts: true,
        proxy: {
          '/api/gt': {
            target: 'https://translate.googleapis.com',
            changeOrigin: true,
            rewrite: (p) => p.replace(/^\/api\/gt/, ''),
          },
          '/api/mymemory': {
            target: 'https://api.mymemory.translated.net',
            changeOrigin: true,
            rewrite: (p) => p.replace(/^\/api\/mymemory/, ''),
          },
        },
      },
      preview: {
        port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
        host: '0.0.0.0',
        strictPort: true,
        proxy: {
          '/api/gt': {
            target: 'https://translate.googleapis.com',
            changeOrigin: true,
            rewrite: (p) => p.replace(/^\/api\/gt/, ''),
          },
          '/api/mymemory': {
            target: 'https://api.mymemory.translated.net',
            changeOrigin: true,
            rewrite: (p) => p.replace(/^\/api\/mymemory/, ''),
          },
        },
      },
      plugins: [react(), instantTranslatePlugin()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
