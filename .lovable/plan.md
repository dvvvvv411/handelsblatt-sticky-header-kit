

## Plan: Rechtsklick-Schutz für Hero-Bild + Logo-Skalierung in veröffentlichten Artikeln

### Problem 1: Hero-Bild Rechtsklick
Im Admin-Formular (`ArticleForm.tsx`) kann man per Rechtsklick auf das Hero-Bild die URL kopieren.

**Fix**: `onContextMenu={(e) => e.preventDefault()}` auf das `<img>` in Zeile 812 und auf das Hero-Bild-Preview in Zeile 1025 setzen.

### Problem 2: Logo-Skalierung fehlt in veröffentlichten Artikeln
`DynamicArticle.tsx` nutzt noch das alte Ad-System (`bitloon_ad_enabled`, etc.) statt `cta_card_type`. Custom Cards mit `logo_scale` werden dort gar nicht gerendert.

**Fix**:
1. **`DynamicArticle.tsx`**: 
   - `cta_card_type` zum Select-Query hinzufügen
   - `CustomCardPreview` importieren
   - CTA-Rendering umbauen: wenn `cta_card_type` gesetzt ist, die entsprechende Card rendern (builtin oder custom)
   - Bei Custom Cards: Card-Daten aus `custom_cards` laden und `logoScale` übergeben

2. **`ArticleForm.tsx`** (Zeile 1064-1079): `logoScale` an `CustomCardPreview` durchreichen — aktuell fehlt die Prop:
   ```
   logoScale={(card as any).logo_scale ?? 1}
   ```

### Dateien
- `src/pages/DynamicArticle.tsx` — cta_card_type Query + CustomCardPreview Rendering
- `src/components/ArticleForm.tsx` — Rechtsklick-Schutz auf Bilder + logoScale-Prop

