import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

function sortObject(obj: Record<string, unknown>): Record<string, unknown> {
  return Object.keys(obj)
    .sort()
    .reduce((result: Record<string, unknown>, key) => {
      result[key] = obj[key] && typeof obj[key] === "object" && !Array.isArray(obj[key])
        ? sortObject(obj[key] as Record<string, unknown>)
        : obj[key];
      return result;
    }, {});
}

async function verifyHmac(body: Record<string, unknown>, signature: string, secret: string): Promise<boolean> {
  const sorted = sortObject(body);
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-512" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(JSON.stringify(sorted)));
  const hex = Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("");
  return hex === signature;
}

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const ipnSecret = Deno.env.get("NOWPAYMENTS_IPN_SECRET")!;
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const signature = req.headers.get("x-nowpayments-sig");
    if (!signature) {
      return new Response("Missing signature", { status: 400 });
    }

    const body = await req.json();
    const valid = await verifyHmac(body, signature, ipnSecret);
    if (!valid) {
      console.error("Invalid HMAC signature");
      return new Response("Invalid signature", { status: 403 });
    }

    const {
      invoice_id,
      payment_id,
      payment_status,
      pay_currency,
      pay_amount,
      actually_paid,
      price_amount,
    } = body;

    console.log(`IPN received: invoice=${invoice_id}, status=${payment_status}`);

    const adminClient = createClient(supabaseUrl, serviceRoleKey);

    // Find transaction by invoice_id
    const { data: tx, error: findError } = await adminClient
      .from("transactions")
      .select("id, user_id, amount_eur, status")
      .eq("nowpayments_invoice_id", String(invoice_id))
      .maybeSingle();

    if (findError) throw findError;
    if (!tx) {
      console.error("Transaction not found for invoice:", invoice_id);
      return new Response("Transaction not found", { status: 404 });
    }

    // Update transaction
    const updateData: Record<string, unknown> = {
      status: payment_status,
      nowpayments_payment_id: payment_id ? String(payment_id) : null,
      pay_currency: pay_currency || null,
      pay_amount: pay_amount || null,
      actually_paid: actually_paid || null,
    };

    const { error: updateError } = await adminClient
      .from("transactions")
      .update(updateData)
      .eq("id", tx.id);

    if (updateError) throw updateError;

    // If finished and not already finished, credit balance
    if (payment_status === "finished" && tx.status !== "finished") {
      const { data: profile } = await adminClient
        .from("profiles")
        .select("balance")
        .eq("id", tx.user_id)
        .single();

      const currentBalance = Number(profile?.balance || 0);
      const newBalance = currentBalance + Number(tx.amount_eur);

      const { error: balanceError } = await adminClient
        .from("profiles")
        .update({ balance: newBalance })
        .eq("id", tx.user_id);

      if (balanceError) throw balanceError;
      console.log(`Credited ${tx.amount_eur} EUR to user ${tx.user_id}. New balance: ${newBalance}`);
    }

    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("IPN error:", err);
    return new Response("Internal error", { status: 500 });
  }
});
