

## Fix: Access Denied Flash nach Login

### Problem
In `AuthContext.tsx` wird `loading` auf `false` gesetzt BEVOR `checkRoles()` fertig ist. `checkRoles` läuft asynchron in einem `setTimeout`, daher: User ist da, Rollen noch nicht → "Access Denied" wird kurz angezeigt.

### Fix in `src/contexts/AuthContext.tsx`

**Neuer State:** `rolesLoading: boolean` (default `true`) — wird erst `false` wenn `checkRoles` abgeschlossen ist.

**`checkRoles`:** Setzt `rolesLoading = true` vor der Query und `rolesLoading = false` danach.

**`onAuthStateChange`:** `checkRoles` direkt `await`en statt in `setTimeout`. `setLoading(false)` erst NACH `checkRoles`.

**`getSession`:** Gleiches Prinzip — `setLoading(false)` erst nach `checkRoles`.

**`loading` Export:** Kombiniert: `loading || rolesLoading` — solange einer der beiden lädt, gilt `loading = true`.

### Fix in `src/layouts/AdminLayout.tsx`

Kein Change nötig — der bestehende `authLoading`-Check zeigt bereits den Spinner. Durch den Fix im Context bleibt `loading` solange `true` bis die Rollen geladen sind → Spinner statt "Access Denied".

### Dateien
- `src/contexts/AuthContext.tsx` — Loading-Logik reparieren

