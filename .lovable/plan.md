

## Guthaben-System mit NOWPayments Krypto-Zahlungen

### Übersicht
Kunden laden per Krypto Guthaben auf (NOWPayments Invoice API). Admins sehen alle Transaktionen und können Guthaben manuell bearbeiten. Max 3 offene Transaktionen pro Kunde. Balance wird direkt in `profiles` gespeichert.

---

### 1. Secrets (zuerst erforderlich)

Zwei Secrets werden benötigt bevor Edge Functions gebaut werden:
- **`NOWPAYMENTS_API_KEY`** — aus dem NOWPayments Dashboard
- **`NOWPAYMENTS_IPN_SECRET`** — IPN Secret Key für Webhook-Verifizierung

### 2. Datenbank-Migrationen

**Migration 1: `balance` Spalte zu `profiles` hinzufügen**
```sql
ALTER TABLE public.profiles ADD COLUMN balance numeric(12,2) NOT NULL DEFAULT 0;

-- Admins dürfen profiles updaten (für manuelle Balance-Änderung)
CREATE POLICY "Admins can update all profiles" ON public.profiles
  FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
```

**Migration 2: `transactions` Tabelle**
```sql
CREATE TABLE public.transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount_eur numeric(12,2) NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  nowpayments_invoice_id text,
  nowpayments_invoice_url text,
  nowpayments_payment_id text,
  pay_currency text,
  pay_amount numeric,
  actually_paid numeric,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz
);

ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Kunden sehen eigene
CREATE POLICY "Users view own transactions" ON public.transactions
  FOR SELECT TO authenticated USING (user_id = auth.uid());

-- Kunden erstellen eigene
CREATE POLICY "Users create own transactions" ON public.transactions
  FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

-- Admins alles
CREATE POLICY "Admins full access transactions" ON public.transactions
  FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Admins können Transaktionen updaten (für manuelle Status-Änderungen)
CREATE POLICY "Admins update transactions" ON public.transactions
  FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- updated_at Trigger
CREATE TRIGGER update_transactions_updated_at
  BEFORE UPDATE ON public.transactions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### 3. Edge Functions

**`create-invoice`** — Erstellt NOWPayments Invoice
- Auth via JWT (`getClaims`)
- Prüft ob User < 3 offene Transaktionen hat (status IN `pending`, `waiting`, `confirming`)
- Ruft `POST https://api.nowpayments.io/v1/invoice` auf:
  - `price_amount`: eingegebener EUR-Betrag
  - `price_currency`: `eur`
  - `ipn_callback_url`: Edge Function URL für IPN
  - `success_url` / `cancel_url`: zurück zu `/admin/balance`
- Speichert Transaktion in DB, gibt `invoice_url` zurück

**`nowpayments-ipn`** — Webhook Handler (verify_jwt = false)
- Verifiziert HMAC-SHA512 Signatur mit `NOWPAYMENTS_IPN_SECRET`
- Sortiert JSON-Keys alphabetisch, erstellt HMAC, vergleicht mit `x-nowpayments-sig` Header
- Aktualisiert Transaktionsstatus in DB (via service_role client)
- Bei `status: 'finished'` → `profiles.balance` um `amount_eur` erhöhen
- Bei `status: 'expired'` / `'failed'` → nur Status updaten

### 4. Frontend — Neue Seiten

**A. `/admin/balance` — BalancePage.tsx (nur Kunden)**
- Guthaben-Card: zeigt `profiles.balance`, Button "Guthaben hinzufügen"
- Dialog: EUR-Betrag Eingabe → bestätigen → `create-invoice` aufrufen → Weiterleitung zu NOWPayments Invoice URL (neuer Tab)
- Transaktionsverlauf-Card: Tabelle eigener Transaktionen
  - Status-Badges: `pending`/`waiting` (gelb, klickbar → öffnet Invoice-URL), `confirming` (blau), `finished` (grün), `expired` (rot, nicht klickbar), `failed` (rot)
  - Abgelaufene/fehlgeschlagene nicht klickbar

**B. `/admin/transactions` — TransactionsPage.tsx (nur Admin)**
- Übersichtskarten: Gesamteinzahlungen (finished), offene Transaktionen, Anzahl gesamt
- Tabelle aller Transaktionen aller User: Email, Betrag, Status, Krypto, Erstellt, Aktualisiert

**C. `/admin/users/:userId` — UserDetailPage.tsx (nur Admin)**
- User-Info (Email, Name, Rolle, Beitrittsdatum)
- Guthaben-Card mit manuellem Bearbeiten-Button → Dialog zum Setzen neuer Balance (direkt `profiles.balance` updaten)
- Transaktionsverlauf dieses Users

**D. UsersPage.tsx erweitern**
- Neue Spalte "Guthaben" (aus `profiles.balance`)
- Email/Name klickbar → navigiert zu `/admin/users/:userId`

### 5. Navigation & Routing

**AdminLayout.tsx** — Neue Nav-Items:
- Admin: "Transaktionen" (Icon: `ArrowLeftRight`) → `/admin/transactions`
- Kunde: "Guthaben" (Icon: `Wallet`) → `/admin/balance`

**App.tsx** — Neue Routen:
```
<Route path="balance" element={<BalancePage />} />
<Route path="transactions" element={<TransactionsPage />} />
<Route path="users/:userId" element={<UserDetailPage />} />
```

### 6. Ablauf

```text
Kunde: "Guthaben hinzufügen" → EUR eingeben → Bestätigen
  ↓
Edge Function: Prüft ≤3 offene → NOWPayments Invoice → DB speichern
  ↓
Kunde: Wird zu NOWPayments weitergeleitet → zahlt Krypto
  ↓
NOWPayments: IPN Webhook → Edge Function verifiziert HMAC
  ↓
Edge Function: Status updaten, bei "finished" → Balance erhöhen
  ↓
Kunde: Sieht neues Guthaben + Transaktion "Abgeschlossen"
```

### 7. Implementierungsreihenfolge

1. Secrets anfragen (NOWPAYMENTS_API_KEY, NOWPAYMENTS_IPN_SECRET)
2. DB-Migrationen (balance-Spalte in profiles, transactions-Tabelle)
3. Edge Functions (create-invoice, nowpayments-ipn)
4. BalancePage (Kunde)
5. TransactionsPage (Admin)
6. UserDetailPage + UsersPage Guthaben-Spalte
7. Navigation + Routing

