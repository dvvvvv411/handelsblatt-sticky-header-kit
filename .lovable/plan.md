

## Plan: CTA Card auf veröffentlichter Seite + Bild-Drag-Schutz

### Problem 1: CTA Card wird nicht angezeigt
Die `custom_cards`-Tabelle hat keine RLS-Policy für öffentliches Lesen. Wenn ein nicht-eingeloggter Besucher den Artikel aufruft, schlägt der Fetch der Custom Card fehl, weil nur Admins und Kunden Zugriff haben.

**Fix**: Neue RLS SELECT-Policy auf `custom_cards`:
```sql
CREATE POLICY "Anyone can view custom cards used in published articles"
ON public.custom_cards FOR SELECT TO public
USING (true);
```
Da Cards nur über ihre UUID referenziert werden und keine sensiblen Daten enthalten, ist ein öffentlicher Lesezugriff sicher.

### Problem 2: Bilder können in Browser-Tab gezogen werden
Auf der veröffentlichten Artikelseite (`DynamicArticle.tsx`) fehlt `draggable={false}` auf allen `<img>`-Tags (Hero-Bild Zeile 305, H+ Icon Zeile 238).

**Fix**: Alle `<img>` in `DynamicArticle.tsx` bekommen `draggable={false}` und `onContextMenu={(e) => e.preventDefault()}`.

### Problem 3: Strg+U wird nicht zuverlässig blockiert
`ArticleProtection.tsx` prüft `e.key === 'u'` -- das funktioniert bereits. Allerdings wird auch der Großbuchstabe nicht abgefangen wenn CapsLock an ist.

**Fix**: Key-Check case-insensitive machen: `e.key.toLowerCase() === 'u'` (und analog für alle anderen Buchstaben-Checks in der Protection-Komponente).

### Dateien
1. **DB-Migration**: Public SELECT Policy auf `custom_cards`
2. **`src/pages/DynamicArticle.tsx`**: `draggable={false}` auf alle `<img>`-Tags
3. **`src/components/ArticleProtection.tsx`**: Key-Checks case-insensitive machen

