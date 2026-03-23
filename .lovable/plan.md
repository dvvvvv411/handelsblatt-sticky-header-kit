

## Card Creator mit Live Preview

### Konzept
Neue Supabase-Tabelle `custom_cards` zum Speichern benutzerdefinierter Cards. Neue Seite `/admin/card-previews/create` mit einem Formular links und Live-Preview rechts (Side-by-Side Layout). Das BitloonX Card-Layout wird als Template verwendet, aber mit Platzhaltertexten vorausgefüllt.

### Datenbank

**Neue Tabelle `custom_cards`:**
```sql
create table public.custom_cards (
  id uuid primary key default gen_random_uuid(),
  created_by uuid references auth.users(id) on delete cascade not null,
  name text not null,
  sponsor_label text not null default 'ÜBER IHRE FIRMA',
  logo_url text,
  headline text not null default 'Ihre Headline hier',
  description text not null default 'Ihre Beschreibung hier...',
  trust_indicator_1 text not null default 'Vorteil 1',
  trust_indicator_2 text not null default 'Vorteil 2',
  metric_value text not null default '+XX%',
  metric_label text not null default 'Ihre Kennzahl',
  service_title text not null default 'PREMIUM-SERVICE',
  service_line_1 text not null default 'Service Zeile 1',
  service_line_2 text not null default 'Service Zeile 2',
  cta_button_text text not null default 'JETZT STARTEN',
  cta_url text not null default 'https://example.com',
  accent_color text not null default '#ef6400',
  disclaimer_text text not null default 'Ihr Risikohinweis hier',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.custom_cards enable row level security;

create policy "Admins can manage custom cards" on public.custom_cards
  for all to authenticated
  using (has_role(auth.uid(), 'admin'::app_role))
  with check (has_role(auth.uid(), 'admin'::app_role));
```

### Neue Dateien

**1. `src/components/CustomCardPreview.tsx`**
- Rendert eine Card im exakt gleichen Layout wie ArticlePaywall/BitloonX
- Nimmt alle Textfelder, Logo-URL und Akzentfarbe als Props
- Rein visuell, kein URL-Shortener oder Click-Handler nötig in der Preview

**2. `src/pages/admin/CreateCardPage.tsx`**
- Side-by-Side Layout: Formular links (scrollbar), Live-Preview rechts (sticky)
- Formularfelder:
  - Card Name (interner Name)
  - Sponsor Label ("ÜBER ...")
  - Logo Upload (File-Input, konvertiert zu base64 oder Supabase Storage)
  - Headline
  - Beschreibungstext
  - Trust Indicator 1 & 2
  - Metrik Wert & Label
  - Service Titel, Zeile 1, Zeile 2
  - CTA Button Text & URL
  - Akzentfarbe (Color Picker)
  - Disclaimer Text
- Jede Eingabe aktualisiert sofort die Live-Preview rechts
- "Card speichern" Button speichert in `custom_cards` Tabelle
- Passt zum bestehenden Admin Design (Gradients, Indigo-Akzente)

### Änderungen an bestehenden Dateien

**3. `src/pages/admin/CardPreviewsPage.tsx`**
- Oben: "Neue Card erstellen" Button (navigiert zu `/admin/card-previews/create`)
- Unterhalb der 3 existierenden Cards: Sektion "Benutzerdefinierte Cards"
- Fetcht alle `custom_cards` aus Supabase und zeigt sie mit `CustomCardPreview` an
- Jede custom Card hat einen "Löschen" Button

**4. `src/App.tsx`**
- Neue Route: `<Route path="card-previews/create" element={<CreateCardPage />} />`
- Import von CreateCardPage

### Logo Upload
- Supabase Storage Bucket `card-logos` erstellen (public)
- Beim Upload wird das Bild in den Bucket hochgeladen
- Die public URL wird in `logo_url` gespeichert

### Technische Details
- Live-Preview nutzt `useState` für alle Felder, kein Debounce nötig
- Color Picker: nativer `<input type="color" />` + Text-Input für Hex
- Preview-Komponente ist sticky (`sticky top-8`) damit sie beim Scrollen sichtbar bleibt
- Responsive: auf Mobile wird Preview über dem Formular angezeigt (stacked)

