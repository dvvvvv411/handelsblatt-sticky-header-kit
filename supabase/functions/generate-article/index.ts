import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sectionCount, newsType, topic } = await req.json();

    if (!sectionCount || !newsType || !topic) {
      return new Response(
        JSON.stringify({ error: "sectionCount, newsType und topic sind erforderlich" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Authenticate user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Nicht authentifiziert" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    // Get user from token
    const token = authHeader.replace("Bearer ", "");
    const supabaseAnon = createClient(supabaseUrl, Deno.env.get("SUPABASE_ANON_KEY")!);
    const { data: { user }, error: userError } = await supabaseAnon.auth.getUser(token);

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "Ungültiger Token" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check if AI assistant is enabled for this user
    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("ai_assistant_enabled")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      return new Response(
        JSON.stringify({ error: "Profil nicht gefunden" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!profile.ai_assistant_enabled) {
      return new Response(
        JSON.stringify({ error: "Der KI-Assistent wurde für deinen Account deaktiviert." }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(
        JSON.stringify({ error: "LOVABLE_API_KEY not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const systemPrompt = `Du bist ein professioneller Journalist und Texter. Du schreibst Nachrichtenartikel zu beliebigen Themen — von Finanzen über Technologie bis hin zu Stellenanzeigen, Sport oder Lifestyle. Passe Tonalität und Stil an das jeweilige Thema und den gewählten Artikeltyp an. Schreibe auf Deutsch.`;

    const userPrompt = `Erstelle einen Nachrichtenartikel mit folgenden Parametern:
- Artikeltyp: ${newsType}
- Anzahl Textabschnitte: ${sectionCount}
- Thema/Beschreibung: ${topic}

Generiere passende Werte für Kategorie, Titel, Untertitel, URL-Slug und genau ${sectionCount} Textabschnitte. Jeder Textabschnitt soll eine Überschrift und einen ausführlichen Text haben. Der Slug soll URL-freundlich sein (nur Kleinbuchstaben, Zahlen und Bindestriche).`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "generate_article",
              description: "Generiert einen strukturierten Nachrichtenartikel",
              parameters: {
                type: "object",
                properties: {
                  category: { type: "string", description: "Artikel-Kategorie, z.B. Finanzen, Technologie, Sport" },
                  title: { type: "string", description: "Aussagekräftiger Artikel-Titel" },
                  subtitle: { type: "string", description: "Erklärender Untertitel / Lead-Text" },
                  slug: { type: "string", description: "URL-freundlicher Slug (nur Kleinbuchstaben, Zahlen, Bindestriche)" },
                  sections: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        title: { type: "string", description: "Überschrift des Abschnitts" },
                        text: { type: "string", description: "Ausführlicher Text des Abschnitts" },
                      },
                      required: ["title", "text"],
                      additionalProperties: false,
                    },
                    description: "Die Textabschnitte des Artikels",
                  },
                },
                required: ["category", "title", "subtitle", "slug", "sections"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "generate_article" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate-Limit erreicht, bitte versuche es später erneut." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Guthaben aufgebraucht. Bitte lade Credits in den Workspace-Einstellungen nach." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "KI-Fehler bei der Artikelgenerierung" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];

    if (!toolCall?.function?.arguments) {
      console.error("No tool call in response:", JSON.stringify(data));
      return new Response(
        JSON.stringify({ error: "Keine strukturierte Antwort von der KI erhalten" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const article = JSON.parse(toolCall.function.arguments);

    // Increment AI usage count
    await supabaseAdmin.rpc("increment_ai_usage", { _user_id: user.id });

    return new Response(JSON.stringify(article), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("generate-article error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unbekannter Fehler" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
