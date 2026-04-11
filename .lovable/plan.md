

## Plan: Artikel-Fonts austauschen (Baskervville + Alergia)

### Ziel
- **Titel**: Font von "Guyot Headline" auf **Baskervville** wechseln
- **Textbereiche**: Font von "ClassicGrotesque" auf **AlergiaCondensed** wechseln

### Änderungen

**1. Font-Dateien ins Projekt kopieren**
- `user-uploads://Baskervville-VariableFont_wght.ttf` → `public/fonts/Baskervville-VariableFont_wght.ttf`
- `user-uploads://AlergiaCondensed-Regular.otf` → `public/fonts/AlergiaCondensed-Regular.otf`

**2. `index.html`** — Zwei neue `@font-face` Deklarationen
- `Baskervville` mit der TTF-Datei (variable font, weight 400-700)
- `AlergiaCondensed` mit der OTF-Datei (weight 400)
- Bestehende ClassicGrotesque `@font-face` bleibt als Fallback

**3. `tailwind.config.ts`** — Font-Familien aktualisieren
- `font-guyot-headline` → `['Baskervville', 'Playfair Display', 'Georgia', 'serif']`
- `font-classic-grotesque` → `['AlergiaCondensed', 'ClassicGrotesqueW05', 'Work Sans', 'Inter', 'Arial', 'sans-serif']`

**4. `src/index.css`** — Font-Klassen aktualisieren
- `.font-guyot-headline` → `font-family: 'Baskervville', 'Playfair Display', Georgia, serif`
- `.font-classic-grotesque` → `font-family: 'AlergiaCondensed', 'ClassicGrotesqueW05', 'Work Sans', 'Inter', Arial, sans-serif`

**5. `index.html`** — `<style>` Block im `<head>` ebenfalls aktualisieren (die inline Font-Klassen dort)

**6. Inline `fontFamily`-Styles für Titel** — 4 Dateien:
- `src/components/ArticleHeader.tsx` (Zeile 52)
- `src/components/ArticleHeaderH2.tsx` (Zeile 48)
- `src/components/ArticleForm.tsx` (Zeile 995)
- `src/pages/DynamicArticle.tsx` (Zeile 249)

Jeweils `fontFamily` von `'"Guyot Headline", Georgia, ...'` auf `'"Baskervville", Georgia, "Times New Roman", serif'` ändern.

### Nicht verändert
- Untertitel-Font bleibt wie sie ist (ClassicGrotesquePro inline style)
- CTA Cards, Paywall etc. übernehmen die neue Alergia-Font automatisch über die `font-classic-grotesque` Klasse

### Dateien
- `public/fonts/` (2 neue Dateien)
- `index.html`
- `tailwind.config.ts`
- `src/index.css`
- `src/components/ArticleHeader.tsx`
- `src/components/ArticleHeaderH2.tsx`
- `src/components/ArticleForm.tsx`
- `src/pages/DynamicArticle.tsx`

