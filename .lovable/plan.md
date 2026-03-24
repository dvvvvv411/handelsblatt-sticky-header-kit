

## Artikelschutz: Kopierschutz für öffentliche Artikelseiten

### Ansatz
Ein neuer `<ArticleProtection>` Wrapper-Komponent, der alle Schutzmechanismen kapselt. Wird sowohl auf der öffentlichen Artikelseite (`DynamicArticle.tsx`) als auch in der Artikel-Vorschau (`ArticleForm.tsx` Preview-Dialog) eingesetzt.

### Neue Datei: `src/components/ArticleProtection.tsx`

Wrapper-Komponente mit folgenden Mechanismen:

1. **Rechtsklick deaktivieren** — `onContextMenu={e => e.preventDefault()}` auf dem Container
2. **Text-Auswahl deaktivieren** — CSS `user-select: none` und `-webkit-user-select: none`
3. **Tastenkürzel blockieren** — `keydown`-Event-Listener blockiert:
   - `Ctrl+U` (Quelltext)
   - `Ctrl+S` (Speichern)
   - `Ctrl+Shift+I` / `F12` (DevTools)
   - `Ctrl+Shift+J` (Console)
   - `Ctrl+Shift+C` (Inspect)
   - `Ctrl+A` (Alles markieren)
   - `Ctrl+C` (Kopieren)
   - `Ctrl+P` (Drucken)
4. **Wasserzeichen** — Halbtransparentes, rotiertes Overlay mit der Kunden-E-Mail, wiederholt über die gesamte Fläche. CSS `pointer-events: none` damit es nicht im Weg ist.

### Props
- `children: ReactNode` — der zu schützende Inhalt
- `watermarkEmail: string` — E-Mail für das Wasserzeichen

### Änderungen in bestehenden Dateien

**`src/pages/DynamicArticle.tsx`**
- Wrap den `<article>`-Bereich mit `<ArticleProtection watermarkEmail={...}>`. Da die öffentliche Seite keinen Auth-Context hat, wird die E-Mail hier nicht angezeigt (kein Wasserzeichen für öffentliche Besucher — die sehen nur den Kopierschutz). Alternativ: Wasserzeichen nur in der Admin-Preview.

**`src/components/ArticleForm.tsx`** (Preview-Dialog)
- Preview-Inhalt im Dialog mit `<ArticleProtection watermarkEmail={user.email}>` wrappen. Hier wird das Wasserzeichen mit der Kunden-E-Mail angezeigt.

### Hinweis
Client-seitiger Schutz ist nie 100% sicher (DevTools lassen sich nicht wirklich blockieren), aber diese Maßnahmen erhöhen die Hürde deutlich und schrecken Gelegenheits-Kopierer ab.

