

## Auth-Seite im Admin-Panel Design überarbeiten

### Konzept
Die /auth Seite bekommt das gleiche dunkle Premium-Design wie das Admin-Panel: Gradient-Hintergrund (slate-950 bis indigo-950), glasartige Card, farbige Akzente, moderne Inputs.

### Änderung in `src/pages/Auth.tsx`

**Hintergrund:** `bg-gray-50` → `min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950` mit dekorativen Gradient-Blobs (absolute, blur)

**Card:** Glasmorphism-Stil: `bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl`

**Header:**
- Icon-Box mit Gradient (indigo/violet) oben
- Titel in Gradient-Text (`bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200`)
- Beschreibung in `text-slate-400`

**Inputs:**
- `bg-white/10 border-white/20 text-white placeholder:text-slate-500`
- Labels in `text-slate-300`
- Focus-Ring in indigo

**Buttons:**
- Submit: `bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500`
- Toggle Login/Register: `text-indigo-400 hover:text-indigo-300`

**Tab-Umschalter:** Statt Text-Link unten einen modernen Tab-Toggle oben (Login / Registrieren) mit `bg-white/10` inactive und `bg-gradient-to-r from-indigo-600 to-violet-600` active

**Animationen:** Subtile Transition beim Wechsel zwischen Login und Register (Eingabefeld für Name ein-/ausblenden)

