/**
 * Alternative: Solution Backend Node.js + Google Sheets API
 * 
 * Pour utiliser cette solution à la place de Google Apps Script:
 * 1. Installez: npm install google-auth-library google-spreadsheet axios
 * 2. Suivez les étapes dans GOOGLE_SHEETS_BACKEND.md
 * 3. Déployez le backend (Vercel, Firebase, ou votre serveur)
 * 4. Remplacez l'URL dans BookDemo.tsx
 */

import express from 'express';
import cors from 'cors';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const SHEET_ID = "15iwQ1tp_lneoJPXGbSdd1gYQQZWOigpvseSEjQR2sdQ";

/**
 * POST /api/book-demo
 * Reçoit les données du formulaire et les ajoute au Google Sheet
 */
app.post('/api/book-demo', async (req, res) => {
  try {
    const { fullName, phone, source, experience, budget, meetingTime, notes } = req.body;

    // Valider les champs requis
    if (!fullName || !phone || !budget) {
      return res.status(400).json({
        success: false,
        message: 'Full Name, Phone, and Budget are required'
      });
    }

    // Initialiser l'authentification avec Google Sheets API
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // Ouvrir le document
    const doc = new GoogleSpreadsheet(SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();

    // Accéder à la feuille "Réponses"
    const sheet = doc.sheetsByTitle['Réponses'] || doc.sheetsByIndex[0];

    if (!sheet) {
      return res.status(500).json({
        success: false,
        message: 'Sheet not found'
      });
    }

    // Initialiser les headers si c'est la première fois
    if (sheet.rowCount === 0) {
      await sheet.setHeaderRow([
        'Timestamp',
        'Full Name',
        'Phone',
        'Source (How did you hear about us?)',
        'Experience in e-commerce',
        'Budget Range',
        'Time Meeting Proposed',
        'Additional Notes'
      ]);
    }

    // Ajouter une nouvelle ligne
    const timestamp = new Date().toISOString();
    await sheet.addRow({
      'Timestamp': timestamp,
      'Full Name': fullName || '',
      'Phone': phone || '',
      'Source (How did you hear about us?)': source || '',
      'Experience in e-commerce': experience || '',
      'Budget Range': budget || '',
      'Time Meeting Proposed': meetingTime || '',
      'Additional Notes': notes || ''
    });

    // Succès
    res.json({
      success: true,
      message: 'Form submitted successfully',
      timestamp
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing request',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
