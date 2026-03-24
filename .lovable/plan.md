

## Wasserzeichen aus Preview entfernen

### Änderung in `src/components/ArticleForm.tsx`

Zeile 645: `watermarkEmail` Prop entfernen — `<ArticleProtection>` ohne Email aufrufen. Dadurch bleibt der Kopierschutz (Rechtsklick, Textauswahl, Tastenkürzel) aktiv, aber das Wasserzeichen-Overlay wird nicht gerendert.

`<ArticleProtection watermarkEmail={user?.email || ''}>` → `<ArticleProtection>`

