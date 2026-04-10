

## Logo Drag-Schutz in CustomCardPreview

### Problem
Das Logo-`<img>` in `CustomCardPreview.tsx` hat kein `draggable={false}` und kein `onContextMenu`-Block. Man kann es in die Adressleiste ziehen und so die URL sehen.

### Fix
**`src/components/CustomCardPreview.tsx`** Zeile 59: Zum `<img>` Tag hinzufügen:
- `draggable={false}`
- `onContextMenu={(e) => e.preventDefault()}`

Eine einzige Zeile Änderung.

