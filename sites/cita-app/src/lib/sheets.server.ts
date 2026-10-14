// Google Sheets helper for appending registration rows.
// Server-only — do not import from client code.
const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_sheets/v4";

export type RegistrationRow = {
  createdAt: string;
  fullName: string;
  email: string;
  phone: string;
  cpf: string;
  crm: string;
  crmUf: string;
  rqe: string;
  specialty: string;
  couponCode: string;
  type: "Convidado" | "Pago";
  status: string;
};

export async function appendRegistrationToSheet(row: RegistrationRow): Promise<void> {
  const lovableKey = process.env.LOVABLE_API_KEY;
  const connectionKey = process.env.GOOGLE_SHEETS_API_KEY;
  const spreadsheetId = process.env.GOOGLE_SHEETS_REGISTRATIONS_ID;

  if (!lovableKey || !connectionKey || !spreadsheetId) {
    console.error("[sheets] Missing env vars for Google Sheets integration");
    return;
  }

  const range = "Inscrições!A:L";
  const url =
    `${GATEWAY_URL}/spreadsheets/${spreadsheetId}/values/${range}:append` +
    `?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;

  const values = [[
    row.createdAt,
    row.fullName,
    row.email,
    row.phone,
    row.cpf,
    row.crm,
    row.crmUf,
    row.rqe,
    row.specialty,
    row.couponCode,
    row.type,
    row.status,
  ]];

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": connectionKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values }),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error(`[sheets] append failed [${res.status}]: ${body}`);
    }
  } catch (err) {
    console.error("[sheets] append threw", err);
  }
}