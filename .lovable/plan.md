

## Fix: Einspaltiges Layout mit Sticky Preview oben

### Problem
Zeile 139 hat noch `grid grid-cols-1 xl:grid-cols-2` — das erzeugt das 1/2-Layout.

### Änderung in `src/pages/admin/CreateCardPage.tsx`

**Zeile 139:** `grid grid-cols-1 xl:grid-cols-2 gap-6 items-start` ersetzen durch einfaches `space-y-6`

**Zeilen 140-155 (Preview-Block):** `xl:sticky xl:top-8 xl:self-start` ersetzen durch `sticky top-0 z-10` — Preview wird oben am Viewport fixiert beim Scrollen, volle Breite.

**Zeilen 156+ (Form-Block):** Bleibt als `space-y-6` div, aber ohne Grid-Kontext → automatisch full-width.

### Resultat
- Preview: volle Breite, sticky oben
- Alle Form-Sektionen: volle Breite, untereinander
- Kein 2-Spalten-Layout mehr

