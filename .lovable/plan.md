

## Auth-Seite in Admin-Panel Farben

### Änderungen in `src/pages/Auth.tsx`

**Linke Branding-Spalte:** `bg-slate-950` → `bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950` (identisch zur Sidebar). Gradient-Linie von `slate-700` auf `indigo-500/30`. Logo-Text mit Gradient (`from-white via-indigo-200 to-violet-300`).

**Rechte Form-Spalte:** `bg-white` → `bg-gradient-to-br from-slate-50 via-indigo-50/30 to-blue-50/20` (identisch zum Admin-Panel Hintergrund).

**Tab-Switcher:** Active-State von `border-slate-900 text-slate-900` → `border-indigo-600 text-indigo-600`. Hover: `text-indigo-500`.

**Inputs:** Focus-Ring von `ring-slate-900` → `ring-indigo-500`.

**Submit-Button:** `bg-slate-900 hover:bg-slate-800` → `bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500`.

**Überschrift:** `text-slate-900` bleibt, passend zum hellen Hintergrund.

