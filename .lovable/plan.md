

## Auth-Seite komplett neu gestalten

### Design-Konzept
Cleanes, professionelles Design statt überladene Glasmorphism-Effekte. Minimalistisch, dunkel, mit subtilen Akzenten. Inspiriert von modernen SaaS-Login-Seiten.

### Änderungen in `src/pages/Auth.tsx`

**Layout:** Zwei-Spalten-Design auf Desktop:
- **Links**: Dunkle Branding-Seite mit Logo/Titel, kurzer Tagline und dezenten geometrischen Akzenten
- **Rechts**: Weißer/heller Formular-Bereich, clean und aufgeräumt

Auf Mobile: Nur der Formular-Bereich, fullscreen.

**Formular-Bereich (hell):**
- Weißer Hintergrund, `bg-white`
- Überschrift in `text-slate-900`, Beschreibung in `text-slate-500`
- Inputs: Clean mit `bg-slate-50 border-slate-200`, keine Icons in den Inputs
- Labels in `text-slate-700`
- Submit-Button: Solid `bg-slate-900 hover:bg-slate-800 text-white` (kein Gradient)
- Tab-Umschalter: Dezenter Underline-Style oder simple Text-Tabs

**Registrierung: Felder anpassen:**
- "Vollständiger Name" Feld entfernen
- Stattdessen: E-Mail + Passwort + Passwort bestätigen
- Validierung: Passwörter müssen übereinstimmen, Fehlermeldung wenn nicht
- `fullName` State entfernen, `confirmPassword` State hinzufügen

**Linke Spalte (dunkel, nur Desktop):**
- `bg-slate-950` mit subtiler Gradient-Linie oder geometrischem Pattern
- Großer Titel wie "Panel" oder App-Name
- Kurze Beschreibung/Tagline
- Kein übertriebenes Glow/Blur

**Entfernen:**
- Dekorative Blobs
- Gradient-Icon-Box oben
- Gradient-Text-Effekte auf Überschriften
- Icons in Input-Feldern
- `fullName` State und zugehörige Logik

### AuthContext anpassen
- `signUp` Aufruf: `fullName` Parameter nicht mehr übergeben (oder leer lassen)

