

## Plan: Textbereich vergroessern auf Handelsblatt-Original

### Was aendert sich

Nur die Fliesstext-Absaetze (nicht Titel, nicht Untertitel). Aktuell: 18px/28px. Neu: **19px/30px** — das entspricht dem Handelsblatt-Original.

### Aenderungen

**`src/pages/DynamicArticle.tsx`** (Zeile 336-338)
- `fontSize`: `'18px'` → `'19px'`
- `lineHeight`: `'28px'` → `'30px'`

**`src/components/ArticleContent.tsx`** (gleiche Stelle)
- `fontSize`: `'18px'` → `'19px'`
- `lineHeight`: `'28px'` → `'30px'`

**`src/components/ArticleContentH2.tsx`** (gleiche Stelle)
- `fontSize`: `'18px'` → `'19px'`
- `lineHeight`: `'28px'` → `'30px'`

### Dateien
- `src/pages/DynamicArticle.tsx`
- `src/components/ArticleContent.tsx`
- `src/components/ArticleContentH2.tsx`

