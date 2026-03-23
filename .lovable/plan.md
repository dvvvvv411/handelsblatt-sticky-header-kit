

## Fix: CTA Card Dropdown + Artikel Preview

### Problem 1: CTA Card Dropdown zeigt keine Custom Cards
Die Supabase-Query auf Zeile 89 von ArticleForm.tsx fetcht `custom_cards` korrekt, aber der Typ-Cast könnte Probleme machen. Tatsächlich sieht der Code korrekt aus — das Problem könnte sein, dass noch keine Custom Cards erstellt wurden ODER dass die RLS-Policy nur für `admin` Role greift und der Query fehlschlägt. Ich werde den Fetch robuster machen und sicherstellen, dass auch `as any` verwendet wird falls nötig.

### Problem 2: Artikel Preview zeigt vereinfachte Version
Die Preview (Zeilen 624-672) rendert eine eigene, vereinfachte Darstellung statt das echte Artikel-Layout. Sie soll exakt wie `/article/:slug` (DynamicArticle.tsx) aussehen.

### Änderungen in `src/components/ArticleForm.tsx`

**1. CTA Card Dropdown Fix:**
- Query auf Zeile 89 mit `as any` casten um TypeScript-Probleme zu vermeiden
- Alle Felder der custom_cards fetchen (nicht nur id, name, accent_color) damit sie auch in der Preview gerendert werden können
- CustomCard Interface erweitern um alle Felder

**2. Preview Dialog komplett ersetzen:**
- Den Dialog-Inhalt (Zeilen 630-670) durch das exakte Layout aus DynamicArticle.tsx ersetzen
- Gleiche Fonts (`Guyot Headline`, `ClassicGrotesquePro`), gleiche Spacing, gleiche Struktur
- HandelsblattHeader und PostArticleContent in der Preview einbinden
- CTA Card in der Preview tatsächlich rendern (nicht nur als Text-Hinweis):
  - Bei `builtin:bitloon` → `<ArticlePaywall />` rendern
  - Bei `builtin:braun` → `<ArticleBraunInvestments />` rendern  
  - Bei `builtin:bovensiepen` → `<ArticleBovensiepenPartners />` rendern
  - Bei custom card UUID → `<CustomCardPreview />` mit den Daten der Card rendern
- Dialog auf `max-w-6xl` vergrößern für realistische Darstellung

**3. Imports hinzufügen:**
- `HandelsblattHeader`, `HandelsblattFooter`, `PostArticleContent`
- `ArticlePaywall`, `ArticleBraunInvestments`, `ArticleBovensiepenPartners`
- `CustomCardPreview`

### Ergebnis
- Dropdown zeigt sowohl Built-in als auch Custom Cards aus der DB
- Preview sieht identisch aus wie der veröffentlichte Artikel unter `/article/:slug`

