import http from 'http';
import url from 'url';

const GAS_URL = 'https://script.google.com/macros/s/AKfycbyRSSUzfAp4Q5JnV6kz20rhLUgZ6ggFQI3WOzTKd2yrAYbhaqvThhjvKEswnV4Ohis6-w/exec';

const server = http.createServer(async (req, res) => {
  // ──────────────────────────────────────────────────────────────────────────
  // CORS (development & production)
  // ──────────────────────────────────────────────────────────────────────────
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // short‑circuit preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url || '', true);
  const pathname = parsedUrl.pathname;
  console.log(`[${new Date().toISOString()}] ${req.method} ${pathname}`);

  // ---------------------------------------------------------------------------
  // Contact route -- unchanged from original implementation
  // ---------------------------------------------------------------------------
  if (pathname === '/api/contact' && req.method === 'POST') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      try {
        const payload = JSON.parse(body);
        console.log('[API] [contact] received payload:', payload);

        // validate required contact fields
        const requiredFields = [
          'fullName',
          'email',
          'phone',
          'averageSalesVolume',
          'marketExperience',
          'message',
        ];

        for (const field of requiredFields) {
          if (!payload[field]) {
            console.log(`[API] [contact] validation failed: ${field} is missing`);
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ ok: false, error: `${field} is required` }));
            return;
          }
        }

        // proxy to GAS (sheet1)
        const gasRes = await fetch(GAS_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const text = await gasRes.text();
        let data;
        try {
          data = JSON.parse(text);
        } catch (e) {
          data = { ok: false, error: 'Invalid response from GAS' };
        }

        res.writeHead(data.ok ? 200 : 400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
      } catch (err) {
        console.error('[API] [contact] error', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: 'Server error' }));
      }
    });

    return; // done with contact route
  }

  // ---------------------------------------------------------------------------
  // Book-demo route -- validates and proxies to GAS (Sheet 2)
  // ---------------------------------------------------------------------------
  if (pathname === '/api/book-demo' && req.method === 'POST') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      try {
        const payload = JSON.parse(body);
        console.log('[API] [book-demo] received payload:', payload);

        // required fields for book-demo submission
        const requiredFields = [
          'fullName',
          'phone',
          'hearAboutUs',
          'experience',
          'budgetRange',
          'meetingTime',
        ];

        for (const field of requiredFields) {
          if (!payload[field] || String(payload[field]).trim() === '') {
            console.log(`[API] [book-demo] validation failed: ${field} is missing`);
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ ok: false, error: `${field} is required` }));
            return;
          }
        }

        // attach formType for GAS to route to Sheet2
        const sheetPayload = { ...payload, formType: 'bookDemo' };

        // perform the proxy request to GAS
        const gasRes = await fetch(GAS_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sheetPayload),
        });

        const text = await gasRes.text();
        let data;
        try {
          data = JSON.parse(text);
        } catch (e) {
          console.error('[API] [book-demo] failed to parse GAS response', e);
          data = { ok: false, error: 'Invalid response from GAS' };
        }

        // forward GAS response directly (status + body)
        const status = gasRes.ok ? (data.ok ? 200 : 400) : gasRes.status;
        res.writeHead(status, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
      } catch (err) {
        console.error('[API] [book-demo] error', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: 'Server error' }));
      }
    });

    return; // done with book-demo route
  }

  // anything else
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ ok: false, error: 'Not found' }));
});

let PORT = 4001;

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Trying port ${PORT + 1}...`);
    PORT = PORT + 1;
    server.listen(PORT, () => {
      console.log(`✓ API Server running on http://localhost:${PORT}`);
    });
  } else {
    throw err;
  }
});

server.listen(PORT, () => {
  console.log(`✓ API Server running on http://localhost:${PORT}`);
});
