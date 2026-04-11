
## Plan: Bold-Formatierung für Textabschnitte im Artikel-Editor

### Ansatz
Die Textarea für jeden Textabschnitt wird durch einen Rich-Text-Editor ersetzt, der eine **Bold-Toolbar** hat. Der Text wird intern mit `<strong>`-Tags gespeichert und beim Rendern als HTML ausgegeben.

### Änderungen

**1. Neue Komponente `src/components/RichTextEditor.tsx`**
- Wrapper um ein `contentEditable` div mit einer kleinen Toolbar (nur Bold-Button)
- Bold per Toolbar-Button oder `Ctrl+B` / `Cmd+B`
- Gibt HTML-String zurück (z.B. `"Normaler Text <strong>fetter Text</strong> weiter"`)
- Styling passend zum bestehenden Textarea-Look

**2. `src/components/ArticleForm.tsx`**
- Import `RichTextEditor` statt `Textarea` für die Text-Felder der Inhaltsbereiche (Zeile 867-871)
- `handleContentChange` bleibt gleich, empfängt jetzt HTML-Strings

**3. `src/pages/DynamicArticle.tsx`** (Zeile 343-344)
- `{section.text}` ersetzen durch `dangerouslySetInnerHTML={{ __html: section.text }}`
- Damit `<strong>`-Tags korrekt gerendert werden

**4. `src/components/ArticleContent.tsx`** (Zeile 14-18 etc.)
- Gleiche Änderung: `dangerouslySetInnerHTML` für Paragraphen

**5. `src/components/ArticleContentH2.tsx`**
- Gleiche Änderung

**6. Vorschau im ArticleForm** (Zeile 1044-1047)
- `dangerouslySetInnerHTML` statt `{section.text}` in der Live-Vorschau

### Sicherheit
- Nur `<strong>` und `<b>` Tags werden im RichTextEditor erzeugt
- Beim Rendern via `dangerouslySetInnerHTML` ist das Risiko minimal, da der Content nur von Admins/Kunden erstellt wird (authentifiziert + RLS)

### Dateien
- `src/components/RichTextEditor.tsx` (neu)
- `src/components/ArticleForm.tsx`
- `src/pages/DynamicArticle.tsx`
- `src/components/ArticleContent.tsx`
- `src/components/ArticleContentH2.tsx`
