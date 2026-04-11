

## Plan: Artikel-Textbereiche an Handelsblatt-Original anpassen

### Analyse-Ergebnis
Die echte Handelsblatt-Seite verwendet:
- **Font**: "Handelsblatt" (proprietare Schrift, nicht frei zugänglich)
- **Font-Size**: 18px
- **Line-Height**: 28px
- **Font-Weight**: 400
- **Color**: #222222
- **Font-Family Fallback**: Arial, sans-serif

Das Problem: "AlergiaCondensed" ist eine **Condensed**-Schrift (zu schmal). Die echte "Handelsblatt"-Font ist eine normale sans-serif, ähnlich wie "Source Sans 3" oder "IBM Plex Sans".

### Vorschlag

Da die echte "Handelsblatt"-Font proprietär ist und nicht heruntergeladen werden kann, verwende ich **"Source Sans 3"** (Google Fonts, kostenlos) als beste Annäherung. Diese ist eine professionelle, gut lesbare sans-serif mit ähnlichen Proportionen.

### Änderungen

**1. `index.html`**
- Google Fonts Link für "Source Sans 3" (weight 400, 700) hinzufügen
- Bestehende @font-face Deklarationen bleiben als Fallback

**2. `src/index.css`**
- `.font-classic-grotesque` aktualisieren: `font-family: 'Source Sans 3', Arial, sans-serif`

**3. `tailwind.config.ts`**
- `classic-grotesque` Font-Familie auf `['Source Sans 3', 'Arial', 'sans-serif']` setzen

**4. `src/pages/DynamicArticle.tsx`** (Zeile 333-343)
- `fontSize: '18px'`, `lineHeight: '28px'`, `color: '#222222'`
- Paragraph-Klasse: `text-lg md:text-xl` entfernen (überflüssig weil inline style)
- `font-classic-grotesque` Klasse beibehalten (übernimmt neue Font)

**5. `src/components/ArticleContent.tsx`**
- Gleiche Anpassungen: 18px, 28px line-height, #222222

**6. `src/components/ArticleContentH2.tsx`**
- Gleiche Anpassungen

### Alternative
Falls du die echte "Handelsblatt"-Font als Datei hast oder beschaffen kannst, kann ich die stattdessen einbinden -- dann ist es 100% identisch.

### Dateien
- `index.html` -- Google Fonts Link
- `src/index.css` -- Font-Klasse
- `tailwind.config.ts` -- Font-Familie
- `src/pages/DynamicArticle.tsx` -- Sizing/Color
- `src/components/ArticleContent.tsx` -- Sizing/Color
- `src/components/ArticleContentH2.tsx` -- Sizing/Color

