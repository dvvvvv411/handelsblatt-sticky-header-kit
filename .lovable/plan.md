

## Live-Vorschau: Sticky oben, alles Full-Width

### Änderung in `src/pages/admin/CreateCardPage.tsx`

Zurück zu einem einspaltigen Layout (`max-w-4xl`), aber die Live-Vorschau wird `sticky top-0` am oberen Rand fixiert:

```
<div className="max-w-4xl mx-auto space-y-6">
  {/* Header */}
  
  {/* Sticky Preview - fixiert oben beim Scrollen */}
  <div className="sticky top-0 z-10 bg-white rounded-xl border border-slate-200 p-4 shadow-lg">
    <h2>Live-Vorschau</h2>
    <CustomCardPreview ... />
  </div>

  {/* Form Sections - alle full-width, scrollbar */}
  <div className="space-y-6">
    {/* Sektion 1-4 + Save Button */}
  </div>
</div>
```

- Entferne das `grid grid-cols-1 xl:grid-cols-2` Layout
- Preview bekommt `sticky top-0 z-10` mit weißem Hintergrund und Schatten damit sie über dem Content schwebt
- Alle Formular-Cards bleiben full-width untereinander
- Auf allen Screengrößen gleiches Layout

