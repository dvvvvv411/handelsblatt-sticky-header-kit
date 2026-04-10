

## Änderungen an `/admin/articles/new`

### 1. "Test-Bild generieren" Button entfernen
In `ArticleForm.tsx` Zeile 368-371 den Button und den `generateTestImage` Import entfernen.

### 2. "Entwurf speichern" Button hinzufügen
In der Action-Buttons-Leiste (Zeilen 768-780) einen dritten Button "Entwurf speichern" links neben "Artikel Preview" einfügen.

**Logik**: Neue Funktion `handleSaveDraft` — identisch zu `handleSubmit`, aber setzt `published: false` beim Insert/Update. Zeigt Toast "Entwurf gespeichert" und navigiert zurück zur Artikelliste.

```text
[ Entwurf speichern ]  [ Artikel Preview ]  [ Artikel veröffentlichen ]
```

### Dateien
- **`src/components/ArticleForm.tsx`**:
  - `generateTestImage` Import aus `testContentGenerator` entfernen
  - Zeilen 368-371 (Test-Bild Button) entfernen
  - Neue `handleSaveDraft` Funktion: wie `handleSubmit` aber mit `published: false`
  - Zeile 768: neuen Button "Entwurf speichern" mit `Save`-Icon einfügen (grau/outline style)

Keine DB-Änderungen nötig — die `articles`-Tabelle hat bereits ein `published`-Feld.

