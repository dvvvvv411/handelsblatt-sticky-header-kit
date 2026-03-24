

## Fix: Simpler Spinner + Access Denied nach Login

### Problem 1: Spinner too much
Der Spinner hat unnötige Glow-Effekte und einen pulsierenden Ring.

### Problem 2: Access Denied nach Login
Nach dem Einloggen: `loading` wird `false` bevor `checkRoles()` fertig ist → `hasAccess` ist noch `false` → "Zugriff verweigert" wird kurz angezeigt.

### Lösung

**`src/layouts/AdminLayout.tsx`** (Zeilen 30-38)
Spinner vereinfachen — ein simpler `border-4 border-violet-500 border-t-transparent rounded-full animate-spin` ohne Glow, ohne pulsierenden Ring.

```tsx
if (authLoading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
```

**`src/contexts/AuthContext.tsx`**
- `loading` darf erst auf `false` gesetzt werden NACHDEM `checkRoles()` abgeschlossen ist
- In `getSession()`: erst `await checkRoles()`, dann `setLoading(false)`
- In `onAuthStateChange` bei neuem User: `checkRoles()` mit `await` abwarten bevor Rollen-State verwendet wird
- Neuen State `rolesReady` oder einfach sicherstellen, dass `loading` den gesamten Bootstrap (Session + Rollen) abdeckt

Konkret in der `getSession`-Logik (Zeile ~68):
```ts
supabase.auth.getSession().then(async ({ data: { session } }) => {
  setSession(session);
  setUser(session?.user ?? null);
  if (session?.user) {
    currentUserIdRef.current = session.user.id;
    await checkRoles(session.user.id);  // ← bereits so, gut
  }
  setLoading(false);  // ← erst NACH checkRoles
  initialDone = true;
});
```

Und im `onAuthStateChange` (Zeile ~50): Wenn ein neuer User einloggt und `initialDone` ist true, muss auch hier `loading` kurz auf `true` gesetzt werden bis `checkRoles` fertig ist:
```ts
if (session.user.id !== currentUserIdRef.current) {
  currentUserIdRef.current = session.user.id;
  setLoading(true);  // ← NEU: Loading wieder aktivieren
  checkRoles(session.user.id).then(() => setLoading(false));
}
```

### Ergebnis
- Simpler lila Spinner ohne Schnickschnack
- Nach Login: Spinner statt "Zugriff verweigert", bis Rollen geladen sind

