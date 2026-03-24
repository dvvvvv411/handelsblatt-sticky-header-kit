

## Fix: Passwort bestätigen Focus-Ring abgeschnitten

### Problem
Das `overflow-hidden` auf dem Wrapper-Div (Zeile 205) schneidet den `focus:ring-2` des Inputs ab.

### Fix in `src/pages/Auth.tsx` (Zeile 204-207)
- `max-h-24` auf `max-h-28` erhöhen (mehr Platz für Ring)
- Padding hinzufügen: `p-0.5` auf dem Wrapper, damit der Focus-Ring nicht abgeschnitten wird

