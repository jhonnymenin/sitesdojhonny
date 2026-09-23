import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().trim().min(2, "Nome muito curto").max(120),
  phone: z.string().trim().min(8, "Telefone inválido").max(30),
  source: z.string().trim().max(60).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

const SPREADSHEET_ID = "1V1se6MeBuiChFf98ueWhzWqKtvp-y5ROHkMJpS7t6DI";
const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_sheets/v4";

/**
 * Registra o lead (nome + telefone) numa planilha Google externa,
 * usada para recuperação de carrinho.
 */
export const saveLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    const lovableKey = process.env["LOVABLE_API_KEY"];
    const sheetsKey = process.env["GOOGLE_SHEETS_API_KEY"];

    if (!lovableKey || !sheetsKey) {
      console.error("saveLead: credenciais da planilha ausentes");
      return { ok: false as const, error: "storage_unavailable" };
    }

    const timestamp = new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
      timeZone: "America/Sao_Paulo",
    }).format(new Date());

    try {
      const res = await fetch(
        `${GATEWAY_URL}/spreadsheets/${SPREADSHEET_ID}/values/Leads!A:D:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${lovableKey}`,
            "X-Connection-Api-Key": sheetsKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            values: [[timestamp, data.name, data.phone, data.source ?? "landing"]],
          }),
        },
      );

      if (!res.ok) {
        const body = await res.text();
        console.error(`saveLead: planilha respondeu [${res.status}]: ${body}`);
        return { ok: false as const, error: "sheet_error" };
      }

      return { ok: true as const };
    } catch (err) {
      console.error("saveLead: falha inesperada", err);
      return { ok: false as const, error: "unexpected" };
    }
  });
