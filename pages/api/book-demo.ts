// /pages/api/book-demo.ts
import type { NextApiRequest, NextApiResponse } from "next";

// Google Apps Script URL (déployé)
const GAS_URL =
  "https://script.google.com/macros/s/AKfycbyXw4nEvw-VhJuVY6olr-TfYc861NW-NSi8aTIdBlVG0uKj_Nofq_pv8p6g6ixer_C_cQ/exec";
// Payload attendu depuis le frontend
interface BookDemoPayload {
  fullName: string;
  phone: string;
  hearAboutUs: string;
  experience: string;
  budgetRange: string;
  meetingTime: string;
  additionalNotes?: string;
  formType: "bookDemo";
}

// Réponse API / GAS
interface ApiResponse {
  ok: boolean;
  error?: string;
  message?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  // ======================
  // CORS headers
  // ======================
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Préflight OPTIONS
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  // POST uniquement
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const body = req.body as Partial<BookDemoPayload>;

    // ======================
    // Validation strict
    // ======================
    const required: Array<keyof Omit<BookDemoPayload, "formType" | "additionalNotes">> = [
      "fullName",
      "phone",
      "hearAboutUs",
      "experience",
      "budgetRange",
      "meetingTime",
    ];

    for (const field of required) {
      if (!body[field] || String(body[field]).trim() === "") {
        return res.status(400).json({ ok: false, error: `${field} is required` });
      }
    }

    // ======================
    // Construction payload
    // ======================
    const payload: BookDemoPayload = {
      formType: "bookDemo",
      fullName: String(body.fullName),
      phone: String(body.phone),
      hearAboutUs: String(body.hearAboutUs),
      experience: String(body.experience),
      budgetRange: String(body.budgetRange),
      meetingTime: String(body.meetingTime),
      additionalNotes: body.additionalNotes ? String(body.additionalNotes) : undefined,
    };

    // ======================
    // Forward vers Google Apps Script
    // ======================
    const gasRes = await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    let gasData: ApiResponse;
    try {
      gasData = await gasRes.json();
    } catch (err) {
      console.error("[BookDemo API] Failed to parse GAS response:", err);
      return res.status(500).json({
        ok: false,
        error: "Failed to parse server response from GAS",
      });
    }

    if (!gasRes.ok || !gasData.ok) {
      console.error("[BookDemo API] GAS returned error:", gasData.error);
      return res.status(gasRes.ok ? 200 : gasRes.status).json({
        ok: false,
        error: gasData.error || "Server processing error",
      });
    }

    console.log("[BookDemo API] Submission successful");
    return res.status(200).json({ ok: true });
  } catch (err: any) {
    console.error("[BookDemo API] Unexpected error:", err);
    return res.status(500).json({ ok: false, error: err?.message || "Server error" });
  }
}