

## KI-Artikelassistent auf /admin/articles/new

### Übersicht
Die "Testdaten generieren"-Card (Zeilen 329-353 in ArticleForm.tsx) wird durch eine "KI-Artikelassistent"-Card ersetzt. Per Klick öffnet sich ein Dialog mit Eingabefeldern. Eine Edge Function ruft Lovable AI auf und generiert strukturierte Artikeldaten. Das Ergebnis wird zur Überprüfung angezeigt und kann ins Formular übernommen werden.

### Änderungen

**1. Neue Edge Function: `supabase/functions/generate-article/index.ts`**
- Nimmt `sectionCount`, `newsType` und `topic` entgegen
- Nutzt Lovable AI Gateway mit `google/gemini-3-flash-preview`
- **Generischer System-Prompt**: "Du bist ein professioneller Journalist und Texter. Du schreibst Nachrichtenartikel zu beliebigen Themen — von Finanzen über Technologie bis hin zu Stellenanzeigen oder Lifestyle. Passe Tonalität und Stil an das jeweilige Thema und den gewählten Artikeltyp an."
- Das `topic`-Feld des Users liefert den gesamten Kontext — die KI passt sich daran an
- Tool Calling für strukturiertes JSON-Output (Kategorie, Titel, Untertitel, Slug, Content-Array mit title+text pro Abschnitt)

**2. ArticleForm.tsx — Card ersetzen + Dialog**
- Zeilen 329-353 (Testdaten-Card) ersetzen durch "KI-Artikelassistent"-Card
- `generateTestContent` Import entfernen (Test-Bild Button bleibt erhalten, wird in die neue Card integriert)
- Neuer State: `showAiDialog`, `aiSectionCount`, `aiNewsType`, `aiTopic`, `aiResult`, `aiGenerating`
- Dialog mit:
  - Number-Input: Anzahl Textabschnitte (1-15)
  - Select-Dropdown: Artikeltyp (Nachricht, Analyse, Storytelling, Meinungsbeitrag, Interview)
  - Textarea: Worum geht es? (frei formuliert — bestimmt Thema, Branche, Tonalität)
  - Button "Generieren"
- Nach Generierung: Vorschau im Dialog (Kategorie, Titel, Untertitel, Slug, alle Absätze)
- "Übernehmen" → füllt formData, Dialog schließt
- "Neu generieren" → erneuter API-Call

**3. Config: `supabase/config.toml`**
- Neue Function `generate-article` hinzufügen

### Newstyp-Optionen
1. Nachricht (klassische News-Meldung)
2. Analyse (tiefgehende Berichterstattung)
3. Storytelling (narrative Erzählung)
4. Meinungsbeitrag (Kommentar/Editorial)
5. Interview (Frage-Antwort-Format)

### Ablauf
```text
User klickt "KI-Assistent starten"
  → Dialog öffnet sich
  → User gibt Abschnitte, Artikeltyp, Thema ein
  → Klick "Generieren"
  → Edge Function → Lovable AI → strukturiertes JSON
  → Vorschau im Dialog
  → "Übernehmen" → formData befüllt, Dialog schließt
  → oder "Neu generieren" → erneuter Call
```

