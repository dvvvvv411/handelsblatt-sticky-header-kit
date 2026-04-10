

## Entwurf-Artikel: Button-Logik anpassen

### Problem
Wenn ein Artikel im Entwurf-Status (`published: false`) bearbeitet wird, zeigt der Submit-Button "Artikel aktualisieren". Das ist verwirrend, da "Entwurf speichern" bereits zum Speichern dient. Der Submit-Button soll stattdessen den Artikel veröffentlichen.

### Lösung in `src/components/ArticleForm.tsx`

1. **Submit-Button Text ändern** (Zeile 965-968):
   - Wenn `isEditing` und Artikel ist Entwurf (`!formData.published`): "Artikel veröffentlichen"
   - Wenn `isEditing` und Artikel ist veröffentlicht (`formData.published`): "Artikel aktualisieren"
   - Wenn neu: "Artikel veröffentlichen"

2. **`handleSubmit` anpassen** (Zeile 348):
   - Wenn der Artikel ein Entwurf ist und der Submit-Button geklickt wird, `published: true` setzen (statt den aktuellen `formData.published`-Wert zu übernehmen)
   - So wird der Artikel beim Klick auf "Artikel veröffentlichen" tatsächlich veröffentlicht

3. **Loading-Text anpassen** (Zeile 966):
   - Entwurf → "Wird veröffentlicht..."
   - Veröffentlicht → "Wird aktualisiert..."

### Dateien
- `src/components/ArticleForm.tsx` — Button-Text + handleSubmit-Logik

