import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, 'dist');

const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = '0.0.0.0';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
};

import { handleAuthApi } from './server/authService.js';

const server = http.createServer(async (req, res) => {
  // Handle backend Auth & Admin APIs
  try {
    const handledAuth = await handleAuthApi(req, res);
    if (handledAuth) return;
  } catch (err) {
    console.error('Server error handling auth API:', err);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, message: 'Lỗi máy chủ' }));
    return;
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
    return;
  }

  const parsedUrl = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  const pathname = decodeURIComponent(parsedUrl.pathname);

  // High-speed Instant Translate API (0ms-50ms)
  if (pathname === '/api/instant-translate') {
    const text = parsedUrl.searchParams.get('text') || '';
    const sl = parsedUrl.searchParams.get('sl') || 'auto';
    const tl = parsedUrl.searchParams.get('tl') || 'vi';

    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });

    if (!text.trim()) {
      res.end(JSON.stringify({ translation: '' }));
      return;
    }

    const targetUrl = `https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=${encodeURIComponent(sl)}&tl=${encodeURIComponent(tl)}&q=${encodeURIComponent(text.trim())}`;
    import('node:https').then(({ default: https }) => {
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
    });
    return;
  }

  // Proxy Google Translate fallback without CORS
  if (pathname.startsWith('/api/gt')) {
    const targetPath = parsedUrl.pathname.replace(/^\/api\/gt/, '') + parsedUrl.search;
    import('node:https').then(({ default: https }) => {
      https.get(`https://translate.googleapis.com${targetPath}`, (gtRes) => {
        res.writeHead(gtRes.statusCode || 200, {
          'Content-Type': gtRes.headers['content-type'] || 'application/json',
          'Access-Control-Allow-Origin': '*',
        });
        gtRes.pipe(res);
      }).on('error', () => {
        res.writeHead(502, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify([]));
      });
    });
    return;
  }

  // Proxy MyMemory translation fallback without CORS
  if (pathname.startsWith('/api/mymemory')) {
    const targetPath = parsedUrl.pathname.replace(/^\/api\/mymemory/, '') + parsedUrl.search;
    import('node:https').then(({ default: https }) => {
      https.get(`https://api.mymemory.translated.net${targetPath}`, (mmRes) => {
        res.writeHead(mmRes.statusCode || 200, {
          'Content-Type': mmRes.headers['content-type'] || 'application/json',
          'Access-Control-Allow-Origin': '*',
        });
        mmRes.pipe(res);
      }).on('error', () => {
        res.writeHead(502, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ responseStatus: 500 }));
      });
    });
    return;
  }

  // Security check against path traversal
  const safePath = path.normalize(pathname).replace(/^(\.\.[/\\])+/, '');
  const filePath = path.join(DIST_DIR, safePath);

  fs.stat(filePath, (err, stats) => {
    let serveFile = filePath;
    let isSpaFallback = false;

    if (err || stats.isDirectory()) {
      serveFile = path.join(DIST_DIR, 'index.html');
      isSpaFallback = true;
    }

    fs.readFile(serveFile, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error loading application. Please build the app first.');
        return;
      }

      const ext = path.extname(serveFile).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      const headers = {
        'Content-Type': contentType,
        'X-Content-Type-Options': 'nosniff',
      };

      if (isSpaFallback || ext === '.html') {
        headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
      } else {
        headers['Cache-Control'] = 'public, max-age=31536000, immutable';
      }

      res.writeHead(200, headers);
      if (req.method === 'HEAD') {
        res.end();
      } else {
        res.end(content);
      }
    });
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Production server running at http://${HOST}:${PORT}`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing server...');
  server.close(() => process.exit(0));
});

process.on('SIGINT', () => {
  console.log('SIGINT received, closing server...');
  server.close(() => process.exit(0));
});
