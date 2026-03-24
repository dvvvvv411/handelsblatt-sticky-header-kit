
## Fix: Kein globales "Laden..." mehr beim Tab-Wechsel im Admin

### Ursache
`refetchOnWindowFocus: false` war nicht der eigentliche Auslöser für den Admin-Spinner.

Der sichtbare Loader kommt aus `src/layouts/AdminLayout.tsx` und wird über `useAuth().loading` gesteuert. In `src/contexts/AuthContext.tsx` wird `loading` aktuell als `loading || rolesLoading` berechnet. Sobald Supabase beim Zurückkehren in den Tab ein Auth-Event wie `TOKEN_REFRESHED` auslöst, startet `checkRoles()` erneut, setzt `rolesLoading` auf `true` und das komplette Admin-Layout springt wieder auf den Vollbild-Loader "Laden...".

### Geplante Änderung

**1. `src/contexts/AuthContext.tsx`**
- Initiales Laden von späteren Hintergrund-Updates trennen
- `loading` nur noch für den allerersten Auth-/Session-Bootstrap verwenden
- Rollen-Nachladen bei späteren Auth-Events darf **nicht** mehr die komplette App blockieren
- `checkRoles()` so umbauen, dass es optional im Hintergrund läuft, ohne `rolesLoading` auf `true` zu setzen
- Bei `TOKEN_REFRESHED` bzw. gleichem User:
  - Session/User still aktualisieren
  - vorhandene Rollen behalten
  - kein globaler Ladezustand mehr
- Nur wenn sich der Benutzer wirklich ändert (`SIGNED_IN`, `SIGNED_OUT`, anderer `user.id`) wird sauber neu synchronisiert

**2. `src/layouts/AdminLayout.tsx`**
- Bestehenden Fullscreen-Loader beibehalten, aber er darf nur noch beim echten Initialstart erscheinen
- Kein erneutes "Laden..." mehr beim normalen Tab-Wechsel

### Ergebnis
- Tab wechseln → zurückkommen → Admin bleibt exakt stehen
- Kein Vollbild-Refresh
- Kein erneutes "Laden..."
- Sidebar, geöffnete Ansicht und sichtbarer Inhalt bleiben stabil

### Technische Umsetzung
Kurz gesagt:
- `combinedLoading = loading || rolesLoading` entfernen
- `loading` = nur Initial-Bootstrap
- Rollen-Refresh nach `onAuthStateChange` nur noch non-blocking
- Rollen nur dann hart zurücksetzen, wenn wirklich ausgeloggt oder der User gewechselt hat

### Optionaler Zusatz
Wenn gewünscht, kann ich im gleichen Schritt auch prüfen, ob einzelne Admin-Seiten zusätzlich eigene Loader beim Tab-Wechsel auslösen. Der aktuelle Hauptfehler sitzt aber sehr wahrscheinlich im `AuthContext` und nicht mehr in React Query.
