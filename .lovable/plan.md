

## Hero-Bild: Upload ODER Link-Eingabe

### Änderung

In `src/components/ArticleForm.tsx` (Zeilen 716-758) wird der leere Zustand erweitert um zwei Optionen:

**Kein Bild vorhanden — zwei Tabs/Buttons:**
1. **"Hochladen"** — wie bisher, öffnet File-Picker
2. **"Bild-URL einfügen"** — zeigt ein Input-Feld für eine externe URL

```text
[Kein Bild]
┌─────────────────────────────────────┐
│  [📤 Hochladen]  [🔗 Bild-URL]     │  ← Toggle zwischen beiden Modi
│                                     │
│  (je nach Modus: Dropzone oder      │
│   URL-Input mit Vorschau)           │
└─────────────────────────────────────┘

[Bild vorhanden - egal ob Upload oder URL]
┌─────────────────────────────────────┐
│ 🖼️ dateiname.jpg / URL-Domain  [✕] │
│  Klicken zum Ändern                  │
└─────────────────────────────────────┘
[Bildvorschau]
```

### Technisch
- Neuer lokaler State: `heroInputMode: 'upload' | 'url'` (default `'upload'`)
- Im leeren Zustand: zwei kleine Buttons zum Umschalten des Modus
- Modus `'upload'`: bestehende Dropzone
- Modus `'url'`: Input-Feld + "Übernehmen"-Button, setzt `hero_image_url` auf die eingegebene URL
- Bild-vorhanden-Ansicht bleibt wie jetzt (Dateiname/URL-Anzeige + X-Button + Vorschau)
- Beim Klick auf "Ändern" im vorhanden-Zustand: zurück zum leeren Zustand mit letztem Modus

### Datei
- `src/components/ArticleForm.tsx` — Zeilen 716-758 umbauen, neuer State `heroInputMode`

