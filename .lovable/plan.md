

## Visits + Analytics zusammenführen zu "Statistiken"

### Konzept
Die beiden Reiter "Visits" und "Analytics" werden zu einem einzigen Reiter **"Statistiken"** zusammengeführt. Die Seite zeigt eine Übersicht aller Artikel mit Visits, Unique Visitors, Redirect Clicks, Conversion Rate und Erstellungsdatum. Klickt man auf eine Zeile, öffnet sich eine Detail-Seite mit stündlichen Visits und weiteren Infos.

### Änderungen

**1. `src/pages/admin/StatisticsPage.tsx` (NEU)**
- Ersetzt beide bisherigen Seiten
- Stat-Cards oben: Total Visits, Unique Visitors, Redirect Clicks, Avg. Conversion (aus VisitsPage)
- Tabelle mit allen Artikeln:
  - Titel, Slug, Erstellungsdatum, Total Visits, Unique Visitors, Redirect Clicks, Conversion Rate
  - Sortiert nach Visits (absteigend)
- Klick auf eine Zeile navigiert zu `/admin/statistics/:articleId`

**2. `src/pages/admin/ArticleStatisticsPage.tsx` (NEU)**
- Detail-Seite für einen einzelnen Artikel
- Header mit Artikel-Titel und Zurück-Button
- Stat-Cards: Visits, Unique Visitors, Redirect Clicks, Conversion Rate
- Stündliche Visits heute (Grid wie bisher in VisitsPage)
- Zusätzliche Infos: Erstellungsdatum, Slug, alle zugehörigen Redirect-URLs mit deren individuellen Click-Counts (aus `redirects` Tabelle)

**3. `src/layouts/AdminLayout.tsx`**
- Nav-Items: "Visits" und "Analytics" entfernen, neuen Eintrag "Statistiken" mit `BarChart3` Icon und Pfad `/admin/statistics`

**4. `src/App.tsx`**
- Routes: `/admin/visits` und `/admin/analytics` entfernen
- Neue Routes: `/admin/statistics` → StatisticsPage, `/admin/statistics/:articleId` → ArticleStatisticsPage
- Imports anpassen (VisitsPage und AnalyticsPage entfernen)

**5. Alte Dateien**
- `src/pages/admin/VisitsPage.tsx` und `src/pages/admin/AnalyticsPage.tsx` bleiben bestehen (nicht gelöscht), werden aber nicht mehr geroutet

### Daten-Logik
- StatisticsPage nutzt die gleiche Logik wie VisitsPage (RPC `get_article_visit_stats` + `get_total_visit_stats`)
- ArticleStatisticsPage nutzt `get_article_visit_stats` für den einzelnen Artikel + Query auf `article_visits` für stündliche Daten + Query auf `redirects` für zugehörige Short-URLs

