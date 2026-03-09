import type { NextApiRequest, NextApiResponse } from 'next';

// URL du Google Apps Script déployé
const GAS_URL = 'https://script.google.com/macros/s/AKfycbyXw4nEvw-VhJuVY6olr-TfYc861NW-NSi8aTIdBlVG0uKj_Nofq_pv8p6g6ixer_C_cQ/exec';

// Type pour le payload reçu du frontend
interface ContactPayload {
  fullName: string;
  email: string;
  phone: string;
  averageSalesVolume: string;
  marketExperience: string;
  message: string;
}

// Type pour la réponse de Google Apps Script
interface GasResponse {
  ok: boolean;
  error?: string;
}

/**
 * Next.js API Route Handler
 * Proxy pour Google Apps Script
 * Frontend POST → /api/contact → Google Apps Script (server-side)
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GasResponse>
) {
  // seulement POST autorisé
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const payload = req.body as ContactPayload;

    // validation : tous les champs requis et non vides
    const required: Array<keyof ContactPayload> = [
      'fullName',
      'email',
      'phone',
      'averageSalesVolume',
      'marketExperience',
      'message'
    ];

    for (const field of required) {
      if (!payload[field] || String(payload[field]).trim() === '') {
        return res.status(400).json({ 
          ok: false, 
          error: `${field} est requis` 
        });
      }
    }

    // requête server-side vers Google Apps Script (pas de CORS !)
    const gasRes = await fetch(GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data: GasResponse = await gasRes.json();

    // relayer la réponse au frontend
    if (!gasRes.ok) {
      return res.status(gasRes.status).json(data);
    }

    return res.status(200).json(data);
  } catch (err: any) {
    console.error('api/contact error', err);
    return res.status(500).json({ 
      ok: false, 
      error: err.message || 'Erreur serveur' 
    });
  }
}