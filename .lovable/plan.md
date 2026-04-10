

## Hero-Bild URL verstecken — Dateiname-Element statt URL-Feld

### Änderung

In `src/components/ArticleForm.tsx` (Zeilen 715-737) wird die aktuelle Darstellung ersetzt:

**Vorher:** Ein Input-Feld zeigt die volle Supabase-URL + daneben ein Upload-Button.

**Nachher:** Zwei Zustände:

1. **Kein Bild hochgeladen**: Ein Upload-Button/Dropzone — "Bild hochladen" mit Upload-Icon
2. **Bild vorhanden**: 
   - Kleine Vorschau-Thumbnail + Dateiname (extrahiert aus URL, z.B. `hero-1712345678.jpg`)
   - Klick auf das Element öffnet den File-Picker zum Ändern
   - Kleiner X-Button zum Entfernen des Bildes
   - Keine URL sichtbar

```text
[Kein Bild]
┌──────────────────────────┐
│  📤 Bild hochladen       │
└──────────────────────────┘

[Bild vorhanden]
┌──────────────────────────┐
│ 🖼️ hero-image.jpg    [✕] │
│  Klicken zum Ändern       │
└──────────────────────────┘
[Bildvorschau darunter]
```

### Technisch
- Dateiname aus URL extrahieren: `formData.hero_image_url.split('/').pop()` 
- Das URL-Input-Feld komplett entfernen
- Das `<input type="file" ref={fileInputRef}>` bleibt hidden wie bisher
- Klick auf das Dateiname-Element triggert `fileInputRef.current?.click()`
- Neuer "Entfernen"-Button setzt `hero_image_url` auf `''`

### Datei
- `src/components/ArticleForm.tsx` — Zeilen 715-737 umbauen

