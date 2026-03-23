

## Flüssigere Navigation im Admin Panel

### Problem
Alle Admin-Seiten (Dashboard, Articles, Visits, etc.) sind mit `lazy()` importiert. Beim Wechsel zwischen Reitern muss der Browser das neue JS-Bundle laden, und während dieser Zeit zeigt `Suspense fallback={null}` eine leere (weiße) Seite.

### Lösung
Die Admin-Unterseiten direkt (nicht-lazy) importieren, da sie häufig gewechselt werden und relativ klein sind. Die Lazy-Imports bleiben nur für die nicht-Admin-Seiten.

### Änderung in `src/App.tsx`

Die folgenden Imports von `lazy()` auf direkte Imports umstellen:

```typescript
// Direkte Imports statt lazy für Admin-Seiten
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ArticlesPage from "./pages/admin/ArticlesPage";
import CreateArticlePage from "./pages/admin/CreateArticlePage";
import EditArticlePage from "./pages/admin/EditArticlePage";
import VisitsPage from "./pages/admin/VisitsPage";
import AnalyticsPage from "./pages/admin/AnalyticsPage";
import UsersPage from "./pages/admin/UsersPage";
import CardPreviewsPage from "./pages/admin/CardPreviewsPage";
```

Die lazy-Versionen dieser Imports werden entfernt. Alles andere bleibt unverändert.

### Ergebnis
Navigation zwischen Admin-Reitern erfolgt sofort ohne weiße Seite, da alle Komponenten bereits geladen sind.

