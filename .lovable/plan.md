

## Loading-Spinner modernisieren

### Änderung in `src/layouts/AdminLayout.tsx` (Zeilen 31-38)

Aktuellen hässlichen Text-Loader ersetzen durch einen cleanen, animierten Spinner in der lila Branding-Farbe — kein Text, nur ein eleganter Spinner mit Glow-Effekt:

- Größerer Spinner (w-12 h-12) mit `border-violet-500` / `border-t-transparent`
- Subtiler Glow-Ring dahinter via `shadow-lg shadow-violet-500/20`
- Pulsierender äußerer Ring für Premium-Look
- Kein "Laden..." Text mehr — nur der Spinner
- Hintergrund bleibt der bestehende Admin-Gradient

