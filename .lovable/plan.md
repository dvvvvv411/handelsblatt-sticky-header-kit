

## Admin-Panel komplett auf Deutsch übersetzen

### Betroffene Dateien und Änderungen

**1. `src/layouts/AdminLayout.tsx`**
- "Access Denied" → "Zugriff verweigert"
- "You don't have permission..." → "Du hast keine Berechtigung auf das Admin-Panel zuzugreifen."
- "Return to Home" → "Zurück zur Startseite"
- "Loading..." → "Laden..."
- "Sign Out" → "Abmelden"
- "Administrator" bleibt (ist auch im Deutschen korrekt)

**2. `src/pages/admin/AdminDashboard.tsx`**
- "Dashboard" bleibt
- "Welcome back. Here's an overview..." → "Willkommen zurück. Hier ist eine Übersicht deiner Plattform."
- "Total Users" → "Nutzer gesamt"
- "Total Articles" → "Artikel gesamt"
- "Published" → "Veröffentlicht"
- "Total Visits" → "Besuche gesamt"
- "Quick Actions" → "Schnellzugriff"
- "New Article" / "Create a new article" → "Neuer Artikel" / "Neuen Artikel erstellen"
- "Published" / "Draft" Badges → "Veröffentlicht" / "Entwurf"

**3. `src/pages/admin/ArticlesPage.tsx`**
- "Articles" → "Artikel"
- "Manage your published articles" → "Verwalte deine veröffentlichten Artikel"
- "New Article" → "Neuer Artikel"
- "No articles yet" → "Noch keine Artikel"
- "Create your first article..." → "Erstelle deinen ersten Artikel."
- "Create Article" → "Artikel erstellen"
- Table headers: Title→Titel, Category→Kategorie, Author→Autor, Status bleibt, Ad→Werbung, Clicks bleibt, Created→Erstellt, Actions→Aktionen
- "Published"/"Draft" → "Veröffentlicht"/"Entwurf"
- "None" → "Keine"
- Dropdown: Edit→Bearbeiten, View→Ansehen, Delete→Löschen
- Toast messages auf Deutsch
- Confirm dialog auf Deutsch

**4. `src/pages/admin/StatisticsPage.tsx`**
- "Total Visits" → "Besuche gesamt"
- "Unique Visitors" → "Eindeutige Besucher"
- "Redirect Clicks" → "Redirect-Klicks"
- "Avg. Conversion" → "Ø Conversion"
- "Loading articles..." → "Lade Artikel..."

**5. `src/pages/admin/UsersPage.tsx`**
- "User Management" → "Benutzerverwaltung"
- "Manage users and their roles" → "Verwalte Benutzer und ihre Rollen"
- "Total Users" → "Nutzer gesamt"
- "Administrators" → "Administratoren"
- "All Users" → "Alle Benutzer"
- "Loading users..." → "Lade Benutzer..."
- "No users yet" → "Noch keine Benutzer"
- "Users will appear here..." → "Benutzer erscheinen hier nach der Registrierung."
- Table: Email bleibt, Name bleibt, Role→Rolle, Joined→Beigetreten, Actions→Aktionen
- "User" Badge → "Kunde"
- "Make Admin" → "Zum Admin machen"
- "Remove Admin" → "Admin entfernen"
- Toast messages auf Deutsch

**6. `src/pages/admin/EditArticlePage.tsx`**
- "Edit Article" → "Artikel bearbeiten"
- "Article not found" → "Artikel nicht gefunden"
- "The article you're looking for..." → "Der gesuchte Artikel existiert nicht."
- "Back to Articles" → "Zurück zu Artikel"
- "Loading article..." → "Lade Artikel..."
- Toast/Error messages auf Deutsch

**7. `src/pages/admin/CreateArticlePage.tsx`**
- Header-Text ist bereits Deutsch, Styling-Klassen prüfen

**8. `src/pages/admin/ArticleStatisticsPage.tsx`**
- "Total Visits" → "Besuche gesamt"
- "Unique Visitors" → "Eindeutige Besucher"
- "Redirect Clicks" → "Redirect-Klicks"
- "Conversion Rate" bleibt
- Table: "Short Code" bleibt, "Original URL" bleibt, "Clicks" → "Klicks"

**9. `src/pages/admin/CardPreviewsPage.tsx`**
- "Card Previews" → "Card-Vorschau"

