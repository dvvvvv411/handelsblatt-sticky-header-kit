

## CreateCardPage Layout-Umbau

### Änderungen an `src/pages/admin/CreateCardPage.tsx`

**Layout:** Statt Side-by-Side (grid 2 cols) wird alles vertikal gestapelt:
1. Header (bleibt)
2. Live-Vorschau oben (volle Breite, weißer Hintergrund)
3. Darunter alle 4 Formular-Cards untereinander (volle Breite)
4. Save-Button ganz unten

**Styling:**
- Formular-Cards: `bg-white` statt `bg-slate-800/40`, mit `border-slate-200` statt `border-slate-700/50`
- Input/Textarea: Helle Variante (`bg-slate-50 border-slate-200 text-slate-900`) statt dunkle Slate-Töne
- Labels: `text-slate-600` statt `text-slate-300`
- Section Headers: Text bleibt weiß (da Admin-Hintergrund dunkel ist) — oder passend zum Admin-Theme anpassen

### Technische Details
- Entferne `grid grid-cols-1 xl:grid-cols-2` und `order-*` Klassen
- Preview ist nicht mehr sticky, sondern einfach oben fixiert als erste Sektion
- Alle Formular-Sektionen in einer einzigen Spalte untereinander
- Card-Hintergründe von gräulich-transparent auf weiß umstellen

