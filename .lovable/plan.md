

## Plan: Echte ClassicGrotesque-Font für Textbereiche laden

### Problem
Die Artikel-Textbereiche verwenden aktuell "Work Sans" als Ersatz für die Handelsblatt-Font "ClassicGrotesque". Die echte Font-Datei ist verfügbar unter `https://assets.www.handelsblatt.com/hb/fonts/ClassicGrotesqueW05-Bold.5a8d8fa4208bc274c28f5d4069510b68.woff2`.

### Hinweis
Die verlinkte Font ist die **Bold**-Variante. Für den Fließtext brauchen wir idealerweise auch die Regular-Variante. Handelsblatt verwendet typischerweise auch eine Regular-Version. Ich werde die Bold-Variante einbinden und prüfen, ob weitere Varianten unter ähnlichen URLs verfügbar sind (z.B. `ClassicGrotesqueW05-Regular`).

### Änderungen

**1. `index.html`**
- `@font-face`-Deklaration für "ClassicGrotesqueW05" mit der woff2-URL hinzufügen
- Font-Weight `700` (Bold) zuweisen
- Falls Regular-URL gefunden wird, zweite `@font-face` mit Weight `400`

**2. `tailwind.config.ts`**
- `font-classic-grotesque` Familie ändern: `'ClassicGrotesqueW05'` als erste Font, dann die bisherigen Fallbacks

**3. `src/index.css`**
- `.font-classic-grotesque` Klasse aktualisieren: `font-family: 'ClassicGrotesqueW05', 'Work Sans', 'Inter', Arial, sans-serif`

### Betroffene Stellen (keine Änderung nötig)
Alle Komponenten die `font-classic-grotesque` nutzen (ArticleContent, DynamicArticle, Paywall, Footer etc.) übernehmen die Font automatisch — keine Datei-Änderungen dort nötig.

### Dateien
- `index.html` — @font-face Deklaration
- `tailwind.config.ts` — Font-Familie aktualisieren
- `src/index.css` — Font-Klasse aktualisieren

