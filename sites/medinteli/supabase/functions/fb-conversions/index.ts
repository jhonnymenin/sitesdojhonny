import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const FB_TOKEN = Deno.env.get("FB_CONVERSIONS_API_TOKEN");
    if (!FB_TOKEN) {
      console.warn("FB_CONVERSIONS_API_TOKEN not configured - skipping CAPI send");
      return new Response(JSON.stringify({ skipped: true, reason: "token_not_configured" }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }


    const PIXEL_ID = "927463216939252";
    const { event_name, event_id, event_time, event_source_url, user_data, custom_data } = await req.json();

    if (!event_name) {
      return new Response(JSON.stringify({ error: "event_name is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Capture IP from request headers (server-side)
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
                     req.headers.get("cf-connecting-ip") ||
                     req.headers.get("x-real-ip") ||
                     undefined;

    // Build enhanced user_data with required parameters
    const enhanced_user_data: Record<string, unknown> = {};

    // client_user_agent is required by Facebook
    if (user_data?.client_user_agent) {
      enhanced_user_data.client_user_agent = user_data.client_user_agent;
    } else {
      enhanced_user_data.client_user_agent = req.headers.get("user-agent") || "";
    }

    // client_ip_address - captured server-side for accuracy
    if (clientIp) {
      enhanced_user_data.client_ip_address = clientIp;
    }

    // Facebook browser cookies for deduplication
    if (user_data?.fbp) enhanced_user_data.fbp = user_data.fbp;
    if (user_data?.fbc) enhanced_user_data.fbc = user_data.fbc;

    // Pass through any additional user identifiers (email, phone, etc.)
    if (user_data?.em) enhanced_user_data.em = user_data.em;
    if (user_data?.ph) enhanced_user_data.ph = user_data.ph;
    if (user_data?.fn) enhanced_user_data.fn = user_data.fn;
    if (user_data?.ln) enhanced_user_data.ln = user_data.ln;
    if (user_data?.external_id) enhanced_user_data.external_id = user_data.external_id;

    const payload = {
      data: [
        {
          event_name,
          ...(event_id ? { event_id } : {}),
          event_time: event_time || Math.floor(Date.now() / 1000),
          event_source_url: event_source_url || "",
          action_source: "website",
          user_data: enhanced_user_data,
          ...(custom_data && Object.keys(custom_data).length > 0 ? { custom_data } : {}),
        },
      ],
    };

    console.log("Sending to Facebook:", JSON.stringify(payload));

    const fbResponse = await fetch(
      `https://graph.facebook.com/v21.0/${PIXEL_ID}/events?access_token=${FB_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const fbData = await fbResponse.json();
    console.log("Facebook response:", JSON.stringify(fbData));

    return new Response(JSON.stringify(fbData), {
      status: fbResponse.ok ? 200 : 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("Edge function error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
