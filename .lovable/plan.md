

## Plan: Guthaben-System vollständig entfernen

### Was wird entfernt
Das gesamte Krypto-Zahlungssystem (NOWPayments), die Balance-Verwaltung, Transaktionsseiten und alle zugehörigen Referenzen.

### Änderungen

**1. Dateien löschen**
- `src/pages/admin/BalancePage.tsx`
- `src/pages/admin/TransactionsPage.tsx`
- `supabase/functions/create-invoice/index.ts`
- `supabase/functions/nowpayments-ipn/index.ts`

**2. `src/App.tsx`**
- Imports für `BalancePage` und `TransactionsPage` entfernen
- Routen `/admin/balance` und `/admin/transactions` entfernen

**3. `src/layouts/AdminLayout.tsx`**
- Nav-Einträge für "Guthaben" und "Transaktionen" entfernen
- Imports `ArrowLeftRight`, `Wallet` entfernen (falls nicht anderswo genutzt)

**4. `src/pages/admin/UsersPage.tsx`**
- Spalte "Guthaben" aus der Tabelle entfernen
- `balance` aus Interface, Query und Rendering entfernen
- `Wallet` Import entfernen

**5. `src/pages/admin/UserDetailPage.tsx`**
- Balance-Anzeige, Balance-Bearbeitung (Dialog), und Transaktionsverlauf-Sektion entfernen
- Alles was mit `balance`, `newBalance`, `editOpen`, `transactions`, `handleSaveBalance` zu tun hat

**6. DB-Migration**
- `transactions`-Tabelle droppen
- `balance`-Spalte aus `profiles` entfernen

### Nicht verändert
- Auth-System, Rollen, KI-Features bleiben unberührt
- `profiles`-Tabelle bleibt bestehen (nur `balance`-Spalte weg)

