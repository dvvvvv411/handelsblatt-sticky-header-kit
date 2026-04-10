

## KI-Artikelassistent: Zurück-Button + Einzelabschnitt neu generieren

### Änderungen

**1. `src/components/ArticleForm.tsx` — Zurück-Button in Ergebnis-Ansicht**
- In der Ergebnis-Ansicht (Zeile 490+) einen "Zurück"-Button mit `ArrowLeft`-Icon hinzufügen
- Klick setzt `aiResult` auf `null`, sodass man wieder zur Eingabe-Ansicht kommt (Prompt-Text, Abschnitte, Artikeltyp bleiben erhalten)
- Platzierung: oben im Ergebnis-Bereich, vor den Vorschau-Karten

**2. `src/components/ArticleForm.tsx` — Einzelnen Abschnitt neu generieren**
- Pro Abschnitt in der Ergebnis-Liste ein `RefreshCw`-Icon-Button hinzufügen (rechts neben dem Abschnittstitel)
- Neue Funktion `handleRegenerateSection(index)`:
  - Ruft die Edge Function `generate-article` auf mit `sectionCount: 1` und einem angepassten Topic-Prompt der den Kontext des Gesamtartikels + die Abschnittsüberschrift enthält
  - Ersetzt nur den betreffenden Abschnitt im `aiResult.sections` Array
  - Zeigt einen Loading-State nur für diesen Abschnitt

**3. `supabase/functions/generate-article/index.ts` — Einzelabschnitt-Modus**
- Neuen optionalen Parameter `regenerateSection` (string) akzeptieren
- Wenn gesetzt: Prompt anpassen um nur einen einzelnen Abschnitt mit der gegebenen Überschrift im Kontext des Gesamtartikels zu generieren
- Gibt dann nur ein einzelnes Section-Objekt zurück statt eines ganzen Artikels

### Neuer State
- `regeneratingSection: number | null` — Index des Abschnitts der gerade neu generiert wird

### UI-Flow
```text
[Ergebnis-Ansicht]
  ← Zurück bearbeiten          (setzt aiResult=null, Eingaben bleiben)
  
  Kategorie | Slug
  Titel
  Untertitel
  
  Abschnitt 1  [🔄]            (RefreshCw Icon)
  Abschnitt 2  [🔄]
  ...
  
  [Übernehmen]  [Neu generieren]
```

### Dateien
- `src/components/ArticleForm.tsx` — UI + Logik
- `supabase/functions/generate-article/index.ts` — Einzelabschnitt-Modus

