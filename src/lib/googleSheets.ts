import { google } from "googleapis";
import { SPREADSHEET_ID } from "./sheetConstants";

export { SPREADSHEET_ID };
export * from "./sheetConstants";

// Singleton: reuse the authenticated client across all requests in the same Node.js process.
// Creating a new GoogleAuth per request costs ~300-500ms for token refresh.
let _sheetsClient: ReturnType<typeof google.sheets> | null = null;

export async function getSheetsClient() {
  if (_sheetsClient) return _sheetsClient;

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  _sheetsClient = google.sheets({ version: "v4", auth });
  return _sheetsClient;
}
