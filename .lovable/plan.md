
## Fix: "Erste Card erstellen" Empty State auf /admin/card-previews

### Problem
Der leere Zustand bei "Benutzerdefinierte Cards" nutzt dunkle Farben (`bg-slate-800/40`, `text-slate-400`, `border-slate-700/50`), die auf dem hellen Admin-Hintergrund verbuggt und kaum lesbar aussehen.

### Änderung in `src/pages/admin/CardPreviewsPage.tsx` (Zeilen 96-112)

- Section-Titel `text-white` → `text-black`
- Container: `bg-slate-800/40 border-slate-700/50` → `bg-slate-50 border-slate-200`
- Text: `text-slate-400` → `text-slate-500`
- Button: `text-indigo-400 hover:text-indigo-300` → `text-violet-600 hover:text-violet-500`
- Auch die "Standard-Cards" Überschrift (Zeile 77) `text-white` → `text-black`
- Die Label-Texte `text-slate-300` → `text-slate-600` (Zeilen 82, 121)

Ergebnis: Sauberer, lesbarer Empty-State passend zum hellen Admin-Design.
