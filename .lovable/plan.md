

## Plan: Text-Auswahl auf öffentlicher Artikelseite erlauben

### Problem
`ArticleProtection` blockiert aktuell überall Text-Auswahl (`userSelect: 'none'`), Rechtsklick und Ctrl+C. Auf der öffentlichen Artikelseite soll man aber Text markieren und kopieren können — nur im Admin-Preview soll alles blockiert bleiben.

### Lösung

**`src/components/ArticleProtection.tsx`**: Neue Prop `strictMode?: boolean` (default: `false`)

- **`strictMode={true}`** (Admin-Preview): Alles blockiert wie bisher — kein Text-Select, kein Rechtsklick, kein Ctrl+C/A
- **`strictMode={false}`** (öffentliche Seite): 
  - `userSelect: 'auto'` → Text markieren erlaubt
  - Rechtsklick auf Text erlaubt
  - Ctrl+A und Ctrl+C erlaubt
  - Weiterhin blockiert: Ctrl+U, Ctrl+S, Ctrl+P, F12, DevTools-Shortcuts

**`src/components/ArticleForm.tsx`** (Zeile 979): `<ArticleProtection strictMode>` setzen

**`src/pages/DynamicArticle.tsx`** (Zeile 225): Bleibt `<ArticleProtection>` ohne strictMode → lockerer Schutz

### Dateien
- `src/components/ArticleProtection.tsx`
- `src/components/ArticleForm.tsx` (1 Zeile)
- `src/pages/DynamicArticle.tsx` (keine Änderung nötig)

