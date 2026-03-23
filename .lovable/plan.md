

## Live-Vorschau fixiert beim Scrollen

### Änderung in `src/pages/admin/CreateCardPage.tsx`

Das Layout von einer einfachen vertikalen Spalte auf ein 2-Spalten-Layout umstellen (nur auf Desktop):

- **Links**: Sticky Live-Vorschau (`sticky top-8`) die beim Scrollen sichtbar bleibt
- **Rechts**: Scrollbare Formular-Sektionen

Auf Mobile bleibt es vertikal gestapelt (Preview oben, Form darunter).

### Konkret

Die aktuelle Struktur:
```
<div className="space-y-6 max-w-4xl">
  {/* Header */}
  {/* Preview */}
  {/* Form sections */}
</div>
```

Wird zu:
```
<div className="max-w-7xl">
  {/* Header */}
  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
    {/* Left: Sticky Preview */}
    <div className="xl:sticky xl:top-8 xl:self-start">
      <CustomCardPreview ... />
    </div>
    {/* Right: Form sections */}
    <div className="space-y-6">
      {/* All 4 form cards + save button */}
    </div>
  </div>
</div>
```

Alle Formular-Cards bleiben weiß (`bg-white`). Die `Field`-Komponente und Logik bleiben komplett unverändert.

