

## Plan: Passwort-Aendern Button in der Benutzerliste

### Problem
Admins sollen das Passwort jedes Benutzers (inkl. sich selbst) direkt aendern koennen -- mit nur einmaliger Eingabe.

### Loesung
Da `supabase.auth.admin.updateUserById()` den Service Role Key benoetigt, wird eine **Edge Function** erstellt, die serverseitig das Passwort setzt. Im Frontend kommt ein Dialog mit Passwortfeld hinzu.

### Aenderungen

**1. Neue Edge Function: `supabase/functions/admin-update-password/index.ts`**
- Empfaengt `{ userId, newPassword }` per POST
- Verifiziert dass der Aufrufer Admin ist (via JWT + `has_role`)
- Ruft `supabase.auth.admin.updateUserById(userId, { password })` auf
- Mindestlaenge 6 Zeichen validieren

**2. `src/pages/admin/UsersPage.tsx`**
- State fuer Dialog (offen/zu, ausgewaehlter User, Passwort-Input)
- Neuer Button "Passwort aendern" (Key-Icon) pro Zeile neben dem Rollen-Button
- Dialog mit einem Passwort-Input und Speichern-Button
- Aufruf der Edge Function beim Speichern
- Erfolgsmeldung per Toast

### Dateien
- `supabase/functions/admin-update-password/index.ts` (neu)
- `src/pages/admin/UsersPage.tsx` (erweitert)

