import http from 'http';
import url from 'url';

const GAS_URL = 'https://script.google.com/macros/s/AKfycbyXw4nEvw-VhJuVY6olr-TfYc861NW-NSi8aTIdBlVG0uKj_Nofq_pv8p6g6ixer_C_cQ/exec';

interface ContactPayload {
  fullName: string;
  email: string;
  phone: string;
  averageSalesVolume: string;
  marketExperience: string;
  message: string;
}

interface GasResponse {
  ok: boolean;
  error?: string;
}

const server = http.createServer(async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url || '', true);
  const pathname = parsedUrl.pathname;

  console.log(`[${new Date().toISOString()}] ${req.method} ${pathname}`);

  // Handle /api/contact
  if (pathname === '/api/contact' && req.method === 'POST') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      try {
        const payload: ContactPayload = JSON.parse(body);
        console.log('[API] Received payload:', payload);

        // Validation
        const requiredFields: (keyof ContactPayload)[] = [
          'fullName',
          'email',
          'phone',
          'averageSalesVolume',
          'marketExperience',
          'message'
        ];

        for (const field of requiredFields) {
          if (!payload[field]) {
            console.log(`[API] Validation failed: ${field} is missing`);
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ ok: false, error: `${field} is required` }));
            return;
          }
        }

        console.log('[API] Validation passed, proxying to GAS...');

        // Proxy to Google Apps Script
        const gasRes = await fetch(GAS_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        console.log('[API] GAS Response status:', gasRes.status, gasRes.statusText);
        
        let data: GasResponse;
        const responseText = await gasRes.text();
        console.log('[API] GAS Response text:', responseText);
        
        try {
          data = JSON.parse(responseText);
        } catch (parseErr) {
          data = { ok: false, error: 'Invalid response from GAS' };
        }
        
        console.log('[API] GAS Response data:', data);
        
        res.writeHead(data.ok ? 200 : 400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
      } catch (err) {
        const error = err instanceof Error ? err.message : 'Unknown error';
        console.error('[API] Error:', error, err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: false, error: 'Not found' }));
  }
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`API Server running on http://localhost:${PORT}`);
});
