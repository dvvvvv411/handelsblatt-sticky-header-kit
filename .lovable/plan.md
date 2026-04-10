

## Fix: Empty State "Erste Card erstellen" — hell mit lila Outline

### Problem
Der Empty-State-Container ist verdunkelt und Text kaum lesbar. User will helles Design mit moderner lila Outline.

### Änderung in `src/pages/admin/CardPreviewsPage.tsx` (Zeilen 102-111)

Aktuell:
```tsx
<div className="bg-slate-50 rounded-xl border border-slate-200 p-8 text-center">
  <p className="text-slate-500 text-sm">...</p>
  <Button variant="ghost" className="mt-3 text-violet-600 hover:text-violet-500">
```

Neu:
```tsx
<div className="bg-white rounded-xl border-2 border-violet-200 p-10 text-center">
  <p className="text-slate-600 text-base">Noch keine benutzerdefinierten Cards erstellt.</p>
  <Button
    onClick={() => navigate('/admin/card-previews/create')}
    variant="outline"
    className="mt-4 border-violet-300 text-violet-600 hover:bg-violet-50 hover:text-violet-700"
  >
    <Plus className="h-4 w-4 mr-1" /> Erste Card erstellen
  </Button>
</div>
```

- Weißer Hintergrund (`bg-white`)
- Lila Outline (`border-2 border-violet-200`)
- Lesbarer Text (`text-slate-600 text-base`)
- Button mit lila Outline-Style statt ghost
- Mehr Padding für cleanes Aussehen

