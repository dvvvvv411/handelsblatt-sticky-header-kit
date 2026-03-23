

## Neuer "Kunde" Rang mit Daten-Isolation

### Konzept
Neuer Enum-Wert `kunde` für `app_role`. Registrierung vergibt automatisch `kunde` statt `user`. Kunden haben Zugriff auf das Admin-Panel, sehen aber nur ihre eigenen Daten. Admins sehen alles. Kunden sehen `/admin/users` nicht.

### 1. Datenbank-Migration

**Enum erweitern:**
```sql
ALTER TYPE public.app_role ADD VALUE 'kunde';
```

**`handle_new_user()` Trigger anpassen:** Default-Rolle von `'user'` auf `'kunde'` ändern.

**RLS-Policies aktualisieren:**

- **`articles`**: Bestehende Admin-Policies bleiben. Neue Policies für `kunde`:
  - SELECT/INSERT/UPDATE/DELETE: `WHERE created_by = auth.uid()` AND `has_role(auth.uid(), 'kunde')`
  
- **`custom_cards`**: Neue Policies für `kunde`:
  - CRUD: `WHERE created_by = auth.uid()` AND `has_role(auth.uid(), 'kunde')`

- **`article_visits`**: Neue SELECT-Policy für `kunde`:
  - `WHERE article_id IN (SELECT id FROM articles WHERE created_by = auth.uid())`

- **`redirects`**: Neue Policies für `kunde` basierend auf `article_id` → `articles.created_by`

### 2. AuthContext (`src/contexts/AuthContext.tsx`)
- Neuer State: `isKunde: boolean`
- Query auf `user_roles` erweitern: neben `admin` auch `kunde` prüfen
- `hasAccess` = `isAdmin || isKunde` für Panel-Zugriff
- Interface erweitern: `isKunde`, `hasAccess`

### 3. AdminLayout (`src/layouts/AdminLayout.tsx`)
- Access-Check: `!isAdmin && !isKunde` → Access Denied (statt nur `!isAdmin`)
- Nav-Items: `/admin/users` nur anzeigen wenn `isAdmin` (nicht für `kunde`)

### 4. Dashboard (`src/pages/admin/AdminDashboard.tsx`)
- Stats-Queries: Wenn `isKunde`, nur eigene Daten zählen (`.eq('created_by', user.id)`)
- Wenn `isAdmin`, alles wie bisher
- "Total Users" Stat-Card nur für Admin anzeigen

### 5. ArticlesPage (`src/pages/admin/ArticlesPage.tsx`)
- Query: Wenn `isKunde`, `.eq('created_by', user.id)` hinzufügen
- RLS sorgt serverseitig auch dafür, aber clientseitig explizit filtern für korrekte Counts

### 6. StatisticsPage (`src/pages/admin/StatisticsPage.tsx`)
- Query: Wenn `isKunde`, nur Artikel mit `created_by = user.id` laden

### 7. CardPreviewsPage (`src/pages/admin/CardPreviewsPage.tsx`)
- Query: Wenn `isKunde`, `.eq('created_by', user.id)` hinzufügen

### 8. ArticleStatisticsPage
- Kein Code-Change nötig — RLS auf `articles` und `article_visits` sorgt dafür, dass Kunden nur eigene Artikel-Stats sehen

### Dateien
- **Migration**: Enum + Trigger + RLS Policies
- **Geändert**: AuthContext, AdminLayout, AdminDashboard, ArticlesPage, StatisticsPage, CardPreviewsPage

