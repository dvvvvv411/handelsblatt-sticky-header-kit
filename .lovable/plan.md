

## KI-Nutzung tracken & pro User steuerbar machen

### Übersicht
Jedes Mal wenn ein User den KI-Artikelassistenten nutzt, wird ein Counter in einer neuen DB-Spalte hochgezählt. Admins sehen die Nutzung in der User-Liste und können den Zugang pro User deaktivieren. Die Edge Function prüft vor Ausführung ob der User gesperrt ist.

### 1. DB-Migration: Neue Spalten in `profiles`
```sql
ALTER TABLE profiles 
  ADD COLUMN ai_usage_count integer NOT NULL DEFAULT 0,
  ADD COLUMN ai_assistant_enabled boolean NOT NULL DEFAULT true;
```

### 2. Edge Function `generate-article/index.ts` erweitern
- Auth-Header auswerten → User identifizieren (via Supabase Service Role Client + `getUser()`)
- Vor der Generierung prüfen: `SELECT ai_assistant_enabled FROM profiles WHERE id = user_id`
- Falls `false` → 403 zurückgeben
- Nach erfolgreicher Generierung: `UPDATE profiles SET ai_usage_count = ai_usage_count + 1 WHERE id = user_id`

### 3. `UsersPage.tsx` — Neue Spalte "KI-Nutzung"
- In der Tabelle eine Spalte "KI-Nutzung" mit `profile.ai_usage_count` hinzufügen (zwischen Guthaben und Beigetreten)
- Icon: `Sparkles` von lucide

### 4. `UserDetailPage.tsx` — Neue Card + Deaktivierungs-Toggle
- Neue Card zwischen Balance und Transaktionen: "KI-Artikelassistent"
  - Zeigt `ai_usage_count` (Anzahl Nutzungen)
  - Switch-Toggle für `ai_assistant_enabled` (aktiviert/deaktiviert)
  - Bei Toggle-Änderung: `supabase.from('profiles').update({ ai_assistant_enabled }).eq('id', userId)`

### 5. `ArticleForm.tsx` — Disabled-State
- Beim Öffnen des AI-Dialogs prüfen ob `ai_assistant_enabled` für den aktuellen User `true` ist
- Falls `false`: Toast-Meldung "KI-Assistent wurde deaktiviert" und Dialog öffnet sich nicht

### Dateien
- **Migration**: neue Spalten `ai_usage_count`, `ai_assistant_enabled`
- **`supabase/functions/generate-article/index.ts`**: Auth + Check + Counter
- **`src/pages/admin/UsersPage.tsx`**: Spalte hinzufügen
- **`src/pages/admin/UserDetailPage.tsx`**: Card mit Count + Toggle
- **`src/components/ArticleForm.tsx`**: Berechtigungsprüfung vor Dialog

