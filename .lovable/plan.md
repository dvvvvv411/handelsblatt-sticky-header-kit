

## Fix: Endlos-Loading durch Deadlock in AuthContext

### Problem
`onAuthStateChange` ruft `await checkRoles()` auf, was eine Supabase-DB-Query innerhalb des Auth-Callbacks macht. Supabase warnt explizit davor — das kann zu einem Deadlock führen, bei dem der Callback nie resolved und `loading` nie `false` wird.

### Fix in `src/contexts/AuthContext.tsx`

**`onAuthStateChange`:** Keine async DB-Calls mehr im Callback. Stattdessen nur Session/User setzen und `checkRoles` via `setTimeout(() => checkRoles(...), 0)` aus dem Callback-Kontext herauslösen.

Konkret:
1. `onAuthStateChange` Callback wird **nicht** mehr `async` — setzt nur `session`, `user`, und triggert `checkRoles` deferred
2. `getSession` bleibt als primärer Initializer — hier ist `await checkRoles()` sicher da es nicht im Auth-Callback-Kontext läuft
3. Flag `initialLoadDone` um doppeltes Laden zu vermeiden: `getSession` lädt initial, `onAuthStateChange` übernimmt danach nur noch bei echten Auth-Änderungen (SIGNED_IN, SIGNED_OUT, TOKEN_REFRESHED)

### Ergebnis
Kein Deadlock mehr → Loading-Spinner verschwindet nach kurzer Zeit → Admin-Panel oder Auth-Seite wird korrekt angezeigt.

