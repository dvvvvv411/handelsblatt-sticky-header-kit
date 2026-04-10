

## Fix: Zwei Probleme — Sidebar + Edge Function Error

### Problem 1: "Transaktionen" fehlt in Admin-Sidebar
Die Sidebar-Logik sieht korrekt aus (Zeile 66 prüft `isAdmin`). Das Problem liegt wahrscheinlich daran, dass der Admin-User sowohl die Rolle `admin` **als auch** `kunde` hat. Da `isAdmin` und `isKunde` unabhängig gesetzt werden, erscheint "Transaktionen" nur wenn `isAdmin === true`. Das sollte funktionieren — ich muss die Rollen des Admin-Users in der DB prüfen und ggf. die Sidebar anpassen, damit Admins auch "Guthaben" sehen (zum Testen).

**Aktion:** DB-Query der `user_roles` Tabelle für den Admin-User, um sicherzustellen dass die Rolle korrekt ist. Falls korrekt, könnte es ein Timing-Problem sein (Rollen werden noch geladen während die Sidebar rendert).

### Problem 2: Edge Function `create-invoice` crasht
Der Fehler ist klar aus den Logs:
```
TypeError: userClient.auth.getClaims is not a function
```
`getClaims()` existiert nicht in `@supabase/supabase-js@2.49.1`. Stattdessen muss `getUser()` verwendet werden.

**Fix in `supabase/functions/create-invoice/index.ts`:**
Zeilen 32-41 ersetzen — statt `getClaims(token)` → `getUser()` verwenden:
```typescript
const { data: { user }, error: userError } = await userClient.auth.getUser();
if (userError || !user) {
  return new Response(JSON.stringify({ error: "Unauthorized" }), {
    status: 401,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
const userId = user.id;
```

### Zusammenfassung
1. **Edge Function fixen** — `getClaims` → `getUser()` (Hauptproblem für den Einzahlungs-Error)
2. **Sidebar debuggen** — Admin-Rollen in DB prüfen, ggf. Timing-Fix wenn Rollen noch nicht geladen sind wenn Sidebar rendert

