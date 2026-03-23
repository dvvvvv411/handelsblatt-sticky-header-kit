

## Dashboard überarbeiten + Sidebar-Anpassungen

### Änderungen

**1. `src/layouts/AdminLayout.tsx`**
- Nav-Item "Card Previews" umbenennen zu "CTA-Cards"

**2. `src/pages/admin/AdminDashboard.tsx`** — Komplett überarbeiten:

**Quick Actions aktualisieren:**
- "New Article" → bleibt, navigiert zu `/admin/articles/new`
- "View Visits" → wird zu "Statistiken", navigiert zu `/admin/statistics`
- "Analytics" → wird zu "CTA-Cards", navigiert zu `/admin/card-previews`

**Stat Card "Total Visits":** Navigation von `/admin/visits` auf `/admin/statistics` ändern

**Neue Sektion: "Letzte Artikel"**
- Unterhalb der Quick Actions
- Fetcht die letzten 5-10 Artikel aus der DB (Titel, Slug, Published-Status, Erstellungsdatum, Visits-Count)
- Jeder Artikel als Card/Row mit:
  - Titel + Slug
  - Published/Draft Badge (grün/amber)
  - Erstellungsdatum
  - Visit-Anzahl
  - Button "Statistiken" → navigiert zu `/admin/statistics/:articleId`
  - Button "Bearbeiten" → navigiert zu `/admin/articles/edit/:id`
- Modernes Design passend zum bestehenden Admin-Theme (weiße Cards, farbige Akzente, Gradient-Icons)

**Daten-Fetch erweitern:**
- Neben den bisherigen Stats auch die Artikel mit ihren Visit-Counts laden
- Query: `articles` mit `id, title, slug, published, created_at` + Join/Count auf `article_visits`

