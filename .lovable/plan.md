

## Überarbeitung der Create Article Seite

### 4 Aufgaben

### 1. Modernes Design für CreateArticlePage + ArticleForm
- CreateArticlePage Header: Gradient-Text, farbige Icon-Box (wie AdminDashboard)
- ArticleForm: Alle Sektionen in eigene Cards mit farbigen Section-Headers und Gradient-Icons verpacken
- Inputs/Textareas: `bg-slate-50 border-slate-200` statt plain white
- Buttons: Gradient-Buttons (indigo/violet) statt plain
- Test Content Section: Moderneres Design mit Gradient-Border
- Content Section Cards: Farbige Nummerierung, hover-Effekte

### 2. Hero Image Upload
- Neben dem URL-Input einen "Bild hochladen" Button hinzufügen
- Upload in Supabase Storage Bucket `article-images` (public)
- Nach Upload wird die public URL automatisch ins `hero_image_url` Feld gesetzt
- Bildvorschau unterhalb des Inputs wenn URL vorhanden
- Storage Bucket via SQL Migration erstellen

### 3. CTA Card Sektion generalisieren
- Die 3 hardcoded Ad-Sektionen (Bitloon, Braun, Bovensiepen) entfernen
- Ersetzen durch eine einzelne "CTA Card" Sektion:
  - Toggle: "CTA Card aktivieren"
  - Wenn aktiv: Dropdown mit allen verfügbaren Cards (aus `custom_cards` Tabelle + die 3 eingebauten Cards als Optionen)
  - Die ausgewählte Card-ID wird gespeichert
- Datenbank: Neues Feld `selected_card_id` in `articles` Tabelle (uuid, nullable, FK zu custom_cards)
- Für die 3 eingebauten Cards: Spezielle Werte wie `"builtin:bitloon"`, `"builtin:braun"`, `"builtin:bovensiepen"` als String im Feld
- Alternativ: Feld `cta_card_type` (text) das sowohl built-in IDs als auch custom_cards UUIDs speichert

### 4. Artikel Preview Button
- Neben "Artikel veröffentlichen" einen "Artikel Preview" Button
- Öffnet ein Modal/Dialog mit der gerenderten Artikel-Vorschau
- Nutzt die bestehenden Article-Rendering-Komponenten (ArticleHeader, ArticleContent, etc.)
- Zeigt den Artikel so wie er auf der öffentlichen Seite aussehen würde

### Dateien

**Neu:**
- SQL Migration: `article-images` Storage Bucket + `cta_card_type` Spalte in articles

**Geändert:**
- `src/pages/admin/CreateArticlePage.tsx` — Moderneres Design, Gradient-Header
- `src/components/ArticleForm.tsx` — Hero Upload, CTA Card Dropdown, Preview Button, modernes Styling
- `src/integrations/supabase/types.ts` — Neues Feld in articles Type

### Technische Details
- Hero Upload: `supabase.storage.from('article-images').upload(...)` → `getPublicUrl()`
- CTA Dropdown: `useEffect` fetcht `custom_cards` für die Auswahl
- Preview: Dialog-Komponente die ArticleHeader + HeroImage + ArticleContent rendert mit den aktuellen Formular-Daten
- Die alten `bitloon_ad_enabled`, `braun_investments_ad_enabled`, `bovensiepen_partners_ad_enabled` Felder bleiben in der DB bestehen, werden im Form aber nicht mehr einzeln angezeigt

