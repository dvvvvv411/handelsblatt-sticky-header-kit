

## Fix: Datenisolierung für Kunden auf Articles & Statistiken

### Problem
RLS hat eine "Anyone can view published articles" Policy (nötig für öffentliche Artikelseiten). Dadurch sehen Kunden im Admin-Panel alle veröffentlichten Artikel, nicht nur ihre eigenen. Die Queries filtern nicht nach `created_by` für Kunden.

### Änderungen

**1. `src/pages/admin/ArticlesPage.tsx`**
- `useAuth()` importieren (`user`, `isAdmin`, `isKunde`)
- In `fetchArticles()`: Wenn `isKunde && !isAdmin` → `.eq('created_by', user.id)` an die Articles-Query anhängen
- `useEffect` mit `user`, `isKunde` als Dependency

**2. `src/components/ArticleList.tsx`**
- Gleicher Fix: `useAuth()` importieren, `created_by` Filter für Kunden

**3. `src/pages/admin/StatisticsPage.tsx`**
- Artikel-Query Filter ist bereits vorhanden (Zeile 41-43), korrekt
- `get_total_visit_stats()` RPC gibt globale Zahlen zurück → für Kunden NICHT aufrufen
- Stattdessen: Totals client-seitig aus den bereits gefilterten `articlesWithVisits` berechnen (Summe visits/unique/clicks der eigenen Artikel)

### Keine DB-Änderungen nötig
Die RLS "Anyone can view published articles" Policy muss bleiben (öffentliche Artikelseiten brauchen sie). Die Isolation wird client-seitig im Admin-Panel durchgesetzt.

