

## Plan: CTA Button in CustomCardPreview klickbar machen

### Problem
Der CTA-Button in `CustomCardPreview` hat keinen `onClick`-Handler und keine `ctaUrl`-Prop. Die `cta_url` wird zwar aus der Datenbank geladen (`customCard.cta_url`), aber nie an die Komponente weitergegeben.

### Fix

1. **`src/components/CustomCardPreview.tsx`**:
   - Neue Prop `ctaUrl?: string` hinzufügen
   - `onClick`-Handler auf den Button: `window.open(ctaUrl, '_blank', 'noopener,noreferrer')`
   - Hover-Effekt beibehalten (`hover:opacity-90`, `cursor-pointer`)

2. **`src/pages/DynamicArticle.tsx`** (Zeile 363-379):
   - `ctaUrl={customCard.cta_url}` an `CustomCardPreview` übergeben

3. **`src/components/ArticleForm.tsx`**:
   - Prüfen ob im Preview dort ebenfalls `ctaUrl` übergeben wird (falls nicht, ergänzen)

### Dateien
- `src/components/CustomCardPreview.tsx` — Prop + onClick
- `src/pages/DynamicArticle.tsx` — ctaUrl durchreichen
- `src/components/ArticleForm.tsx` — ctaUrl im Preview durchreichen

