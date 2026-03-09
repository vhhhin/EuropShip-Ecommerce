/**
 * Configuration du formulaire Book Demo
 * 
 * ⚠️ IMPORTANT: Remplacez l'URL ci-dessous par votre URL Google Apps Script
 * 
 * Comment obtenir l'URL:
 * 1. Ouvrez votre Google Sheet
 * 2. Extensions → Apps Script
 * 3. Cliquez sur "Déployer" → "Gérer les déploiements"
 * 4. Cliquez sur le déploiement "Application web"
 * 5. Copiez l'URL complète (commence par https://script.google.com/macros/d/)
 * 6. Remplacez l'URL ci-dessous
 */

// ⭐ REMPLACEZ CETTE URL PAR VOTRE URL GOOGLE APPS SCRIPT
export const GOOGLE_APPS_SCRIPT_URL =
  "https://docs.google.com/spreadsheets/d/15iwQ1tp_lneoJPXGbSdd1gYQQZWOigpvseSEjQR2sdQ/edit?usp=sharing";

/**
 * Vérifier si l'URL a été configurée
 */
export const isUrlConfigured = (): boolean => {
  return !GOOGLE_APPS_SCRIPT_URL.includes("YOUR_DEPLOYMENT_ID");
};

/**
 * Obtenir le message d'erreur si non configuré
 */
export const getConfigError = (): string | null => {
  if (!isUrlConfigured()) {
    return `⚠️ L'URL du Google Apps Script n'est pas configurée.\n\nVeuillez:\n1. Ouvrir config.ts\n2. Remplacer YOUR_DEPLOYMENT_ID par votre URL\n3. Relancer npm run build`;
  }
  return null;
};
