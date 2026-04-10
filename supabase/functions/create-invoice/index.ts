import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.49.1/cors";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const nowpaymentsApiKey = Deno.env.get("NOWPAYMENTS_API_KEY")!;

    // Verify user
    const userClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await userClient.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userId = claimsData.claims.sub;

    // Parse body
    const { amount_eur } = await req.json();
    if (!amount_eur || typeof amount_eur !== "number" || amount_eur < 1 || amount_eur > 100000) {
      return new Response(JSON.stringify({ error: "Betrag muss zwischen 1 und 100.000 EUR liegen" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check open transactions (max 3)
    const adminClient = createClient(supabaseUrl, serviceRoleKey);
    const { data: openTx, error: txError } = await adminClient
      .from("transactions")
      .select("id")
      .eq("user_id", userId)
      .in("status", ["pending", "waiting", "confirming", "sending"]);

    if (txError) throw txError;

    if (openTx && openTx.length >= 3) {
      return new Response(
        JSON.stringify({ error: "Maximale Anzahl offener Transaktionen (3) erreicht. Warte bis eine abgeschlossen oder abgelaufen ist." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create NOWPayments invoice
    const ipnCallbackUrl = `${supabaseUrl}/functions/v1/nowpayments-ipn`;
    const successUrl = `${req.headers.get("origin") || "https://id-preview--a182ea64-cab3-423a-ae65-f626fd2a16b1.lovable.app"}/admin/balance`;
    const cancelUrl = successUrl;

    const invoiceRes = await fetch("https://api.nowpayments.io/v1/invoice", {
      method: "POST",
      headers: {
        "x-api-key": nowpaymentsApiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price_amount: amount_eur,
        price_currency: "eur",
        ipn_callback_url: ipnCallbackUrl,
        success_url: successUrl,
        cancel_url: cancelUrl,
        order_description: `Guthaben Aufladung ${amount_eur} EUR`,
      }),
    });

    if (!invoiceRes.ok) {
      const errText = await invoiceRes.text();
      console.error("NOWPayments error:", errText);
      return new Response(JSON.stringify({ error: "Fehler beim Erstellen der Rechnung" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const invoiceData = await invoiceRes.json();

    // Save transaction
    const { error: insertError } = await adminClient.from("transactions").insert({
      user_id: userId,
      amount_eur: amount_eur,
      status: "pending",
      nowpayments_invoice_id: String(invoiceData.id),
      nowpayments_invoice_url: invoiceData.invoice_url,
    });

    if (insertError) throw insertError;

    return new Response(
      JSON.stringify({ invoice_url: invoiceData.invoice_url }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("create-invoice error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
