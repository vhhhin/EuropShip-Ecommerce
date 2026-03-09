// Google Apps Script - À copier dans Google Sheet
// Ce script reçoit les données du formulaire (JSON) et les ajoute à la feuille

const SHEET_ID = "15iwQ1tp_lneoJPXGbSdd1gYQQZWOigpvseSEjQR2sdQ";
const SHEET_NAME = "Sheet1"; // Par défaut, Google Sheets crée "Sheet1"

function doPost(e) {
  try {
    // Récupérer les données du corps JSON
    let data = {};
    
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else {
      data = e.parameter || {};
    }
    
    Logger.log("Données reçues: " + JSON.stringify(data));

    // Récupérer la feuille
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({
        ok: false,
        error: "Feuille '" + SHEET_NAME + "' non trouvée"
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Initialiser les headers si la première ligne est vide
    const firstRow = sheet.getRange(1, 1, 1, 7).getValues()[0];
    const hasHeaders = firstRow.some(cell => cell !== "");
    
    if (!hasHeaders) {
      initializeHeaders(sheet);
    }

    // Extraire les données du corps de la requête
    const timestamp = new Date().toISOString();
    const fullName = data.fullName || "";
    const email = data.email || "";
    const phone = data.phone || "";
    const averageSalesVolume = data.averageSalesVolume || "";
    const marketExperience = data.marketExperience || "";
    const message = data.message || "";

    // Validation basique
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      return ContentService.createTextOutput(JSON.stringify({
        ok: false,
        error: "Champs requis manquants"
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Ajouter une nouvelle ligne
    const newRow = [
      timestamp,
      fullName,
      email,
      phone,
      averageSalesVolume,
      marketExperience,
      message
    ];

    sheet.appendRow(newRow);

    Logger.log("Nouvelle ligne ajoutée: " + fullName + " (" + email + ")");

    // Réponse de succès
    return ContentService.createTextOutput(JSON.stringify({
      ok: true,
      message: "Données enregistrées avec succès",
      row: sheet.getLastRow(),
      timestamp: timestamp
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log("ERREUR: " + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      ok: false,
      error: "Erreur serveur: " + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function initializeHeaders(sheet) {
  const headers = [
    "Timestamp",
    "Full Name",
    "Email",
    "Phone",
    "Average Sales Volume",
    "Market Experience",
    "Message"
  ];
  sheet.appendRow(headers);
  Logger.log("Headers initialisés");
}

// Fonction de test (optionnelle - pour déboguer)
function testSubmission() {
  const testData = {
    parameter: {
      fullName: "Test User",
      phone: "+33 6 12 34 56 78",
      source: "Direct Test",
      experience: "5 years",
      budget: "50K-200K",
      meetingTime: "14:30",
      notes: "Ceci est un test"
    }
  };
  
  var result = doPost(testData);
  Logger.log("Résultat du test: " + result.getContent());
}
