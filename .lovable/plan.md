

## Plan: Built-in CTA Cards für Kunden ausblenden

### Problem
Kunden sehen die 3 Standard-Cards (Bitloon, Bovensiepen, Braun) sowohl auf der Card-Vorschau-Seite als auch in der CTA-Auswahl beim Artikel-Erstellen. Diese sollen nur für Admins sichtbar sein.

### Änderungen

**1. `src/pages/admin/CardPreviewsPage.tsx`**
- Den gesamten "Standard-Cards"-Block (Zeile 74-90) nur rendern wenn `isAdmin` true ist
- Einfach den Block in `{isAdmin && ( ... )}` wrappen

**2. `src/components/ArticleForm.tsx`**
- `isAdmin` aus `useAuth()` destructuren (Zeile 82)
- `builtinCards` (Zeile 396-400) nur befüllen wenn `isAdmin` true ist, sonst leeres Array
- So tauchen die Built-in Cards weder in der Dropdown-Auswahl noch im Preview auf

### Dateien
- `src/pages/admin/CardPreviewsPage.tsx` — Standard-Cards Block conditional rendern
- `src/components/ArticleForm.tsx` — builtinCards conditional befüllen

