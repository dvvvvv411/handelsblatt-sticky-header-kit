

## Bearbeiten-Button + Logo-Skalierung für Custom Cards

### 1. DB-Migration: `logo_scale` Spalte
- `ALTER TABLE custom_cards ADD COLUMN logo_scale numeric NOT NULL DEFAULT 1.0;`

### 2. Neue Route + Edit-Page
- **`src/App.tsx`**: Route `card-previews/edit/:id` → `EditCardPage`
- **`src/pages/admin/EditCardPage.tsx`**: Kopie von `CreateCardPage`, aber:
  - Lädt Card-Daten per `supabase.from('custom_cards').select().eq('id', id)` beim Mount
  - Füllt Form mit bestehenden Werten vor
  - `handleSave` nutzt `.update()` statt `.insert()`
  - Titel: "Card bearbeiten"

### 3. Bearbeiten-Button in CardPreviewsPage
- **`src/pages/admin/CardPreviewsPage.tsx`**: Neben dem Trash-Icon einen `Pencil`-Button hinzufügen
  - Navigiert zu `/admin/card-previews/edit/${card.id}`

### 4. Logo-Skalierung in Create + Edit Page
- **Neuer Form-State**: `logoScale: 1` (number, Range 0.5–3.0)
- **UI**: Unter dem Logo-Upload ein Slider (`<input type="range">`) mit Label "Logo-Größe" und Anzeige des Werts (z.B. "1.5x")
- Wird beim Speichern als `logo_scale` in die DB geschrieben

### 5. CustomCardPreview: logoScale prop
- **`src/components/CustomCardPreview.tsx`**: Neue optionale Prop `logoScale?: number` (default 1)
- Das Logo-`<img>` bekommt `style={{ transform: \`scale(${logoScale})\` }}`
- Überall wo `CustomCardPreview` genutzt wird (CardPreviewsPage, CreateCardPage, EditCardPage), `logoScale` durchreichen

### Dateien
- Migration: neue Spalte `logo_scale`
- `src/App.tsx` — neue Route
- `src/pages/admin/EditCardPage.tsx` — neue Datei
- `src/pages/admin/CardPreviewsPage.tsx` — Edit-Button
- `src/pages/admin/CreateCardPage.tsx` — Logo-Slider
- `src/components/CustomCardPreview.tsx` — `logoScale` prop

