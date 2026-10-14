import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const registrationSchema = z.object({
  fullName: z.string().trim().min(3, "Informe seu nome completo").max(120),
  email: z.string().trim().email("E-mail inválido").max(160),
  phone: z.string().trim().min(8, "Telefone inválido").max(40),
  cpf: z.string().trim().min(11, "CPF inválido").max(20),
  crm: z.string().trim().min(2, "Informe o CRM").max(30),
  crmUf: z.string().trim().length(2, "UF inválida"),
  rqe: z.string().trim().max(30).optional().or(z.literal("")),
  specialty: z.string().trim().min(2, "Informe a especialidade").max(120),
  couponCode: z.string().trim().max(60).optional().or(z.literal("")),
});

export const submitRegistration = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => registrationSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { appendRegistrationToSheet } = await import("./sheets.server");

    const couponInput = (data.couponCode ?? "").trim().toUpperCase();
    let couponId: string | null = null;
    let isFree = false;

    if (couponInput) {
      const { data: coupon, error: cErr } = await supabaseAdmin
        .from("coupons")
        .select("id, code, revoked_at, max_uses, uses_count")
        .ilike("code", couponInput)
        .maybeSingle();

      if (cErr) {
        console.error("[registration] coupon lookup error", cErr);
        throw new Error("Não foi possível validar o cupom. Tente novamente.");
      }
      if (!coupon) throw new Error("Cupom não encontrado.");
      if (coupon.revoked_at) throw new Error("Cupom inválido.");
      if (coupon.max_uses !== null && coupon.uses_count >= coupon.max_uses) {
        throw new Error("Cupom esgotado.");
      }

      couponId = coupon.id;
      isFree = true;
    }

    const status = isFree ? "confirmed" : "pending";

    const { data: reg, error: rErr } = await supabaseAdmin
      .from("registrations")
      .insert({
        full_name: data.fullName,
        email: data.email.toLowerCase(),
        phone: data.phone,
        cpf: data.cpf,
        crm: data.crm,
        crm_uf: data.crmUf.toUpperCase(),
        rqe: data.rqe || null,
        specialty: data.specialty,
        coupon_id: couponId,
        coupon_code: couponInput || null,
        is_free: isFree,
        status,
      })
      .select("id")
      .single();

    if (rErr) {
      console.error("[registration] insert error", rErr);
      throw new Error("Não foi possível concluir a inscrição. Tente novamente em instantes.");
    }

    if (couponId) {
      const { data: cur } = await supabaseAdmin
        .from("coupons")
        .select("uses_count")
        .eq("id", couponId)
        .single();
      await supabaseAdmin
        .from("coupons")
        .update({ uses_count: (cur?.uses_count ?? 0) + 1 })
        .eq("id", couponId);
    }

    // Best-effort: log to Google Sheets. Never blocks the user.
    await appendRegistrationToSheet({
      createdAt: new Date().toISOString(),
      fullName: data.fullName,
      email: data.email.toLowerCase(),
      phone: data.phone,
      cpf: data.cpf,
      crm: data.crm,
      crmUf: data.crmUf.toUpperCase(),
      rqe: data.rqe || "",
      specialty: data.specialty,
      couponCode: couponInput,
      type: isFree ? "Convidado" : "Pago",
      status,
    });

    return {
      ok: true,
      registrationId: reg.id,
      isFree,
      paymentUrl: isFree ? null : "https://pay.finaliza.shop/pl/32fc1c9d26",
    };
  });