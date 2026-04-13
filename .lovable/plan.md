

## Plan: Custom Rechtsklick-Menue (ohne Seitenquelle & Element untersuchen)

### Problem
Browser erlauben keine selektive Entfernung einzelner Kontextmenue-Eintraege. Es ist nur ganz oder gar nicht moeglich.

### Loesung
Natives Kontextmenue blockieren und durch ein Custom-Menue ersetzen, das alle Punkte ausser den letzten zwei enthaelt.

### Menue-Eintraege (aus dem Screenshot)
- Zurueck
- Vorwaerts
- Neu laden
- Zur Schnellwahl hinzufuegen
- Zu Lesezeichen hinzufuegen...
- ---
- Vollbild ein (F11)
- Adresse kopieren
- ---
- Speichern unter... (Ctrl+S)
- Als PDF speichern...
- Drucken... (Ctrl+P)
- Uebertragen...
- ---
- Uebersetzen in English
- ~~Seitenquelle~~ ENTFERNT
- ~~Element untersuchen~~ ENTFERNT

**Hinweis**: Einige Funktionen (Zur Schnellwahl, Lesezeichen, Vollbild, Uebertragen, Uebersetzen) sind Browser-spezifisch und koennen aus JavaScript heraus nicht ausgeloest werden. Diese wuerden entweder weggelassen oder als nicht-funktional angezeigt.

### Realistischere Alternative
Nur die Eintraege einbauen die tatsaechlich per JavaScript funktionieren:
- **Kopieren** (wenn Text markiert)
- **Alles auswaehlen**
- **Adresse kopieren**
- **Speichern unter...** (loest Download aus)
- **Drucken...**
- **Link kopieren** / **Link in neuem Tab oeffnen** (wenn auf Link geklickt)

### Aenderung

**`src/components/ArticleProtection.tsx`**
- `e.preventDefault()` immer bei `onContextMenu`
- Custom-Menue-Komponente mit State fuer Position/Sichtbarkeit
- Kontexterkennung (Text selektiert? Link? Bild?)
- Styling: schlicht, grau, aehnlich dem nativen Browser-Menue
- Schliessen bei Klick ausserhalb oder ESC

### Dateien
- `src/components/ArticleProtection.tsx`

