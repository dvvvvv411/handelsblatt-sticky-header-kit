

## Änderungen: Copyright 2026 + Abschnittstitel entfernen

### 1. Copyright aktualisieren
- `src/components/HandelsblattFooter.tsx` Zeile 248: `© 2025` → `© 2026`
- `src/components/HandelsblattFooterH2.tsx` Zeile 229: `© 2024` → `© 2026`

### 2. Abschnittstitel aus dem System entfernen

**Interface anpassen:**
- `ContentSection` Interface: `title` Feld entfernen, nur noch `text` behalten
- Betrifft: `ArticleForm.tsx` (Zeile 28), `DynamicArticle.tsx` (Zeile 18), `EditArticleForm.tsx`

**ArticleForm.tsx:**
- Überschrift-Input (Zeilen 535-541) komplett entfernen aus den Content-Sektionen
- Default content: `{ title: '', text: '' }` → `{ text: '' }` (title bleibt als leerer String für DB-Kompatibilität, wird aber nicht mehr angezeigt/editiert)
- Preview-Rendering (Zeilen 714-719): `<h2>` Block entfernen
- `handleContentChange` und `fillWithTestContent`: title-Referenzen entfernen

**DynamicArticle.tsx:**
- Content-Rendering (ca. Zeile 233-240): `<h2>{section.title}</h2>` Block entfernen, nur noch `<p>{section.text}</p>` rendern

**Statische Artikel-Komponenten:**
- `ArticleContent.tsx` + `ArticleContentH2.tsx`: Alle `<h2>` Tags entfernen, nur Paragraph-Texte behalten

### 3. Bestehende Artikel in DB: Titel entfernen
- SQL-Update via Migration: `UPDATE articles SET content = ...` — alle content-Arrays durchgehen und `title` auf `''` setzen
- Da `content` JSONB ist, wird ein Update-Query nötig, der alle Objekte im Array modifiziert

### Technische Details
- Das `title` Feld bleibt im JSONB-Content als leerer String bestehen (DB-Kompatibilität), wird aber nirgends mehr angezeigt oder editierbar gemacht
- Kein Schema-Change nötig da content ein JSONB-Feld ist

