-- Add balance column to profiles
ALTER TABLE public.profiles ADD COLUMN balance numeric(12,2) NOT NULL DEFAULT 0;

-- Admins can update all profiles (for manual balance changes)
CREATE POLICY "Admins can update all profiles" ON public.profiles
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Create transactions table
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

-- Users view own transactions
CREATE POLICY "Users view own transactions" ON public.transactions
  FOR SELECT TO authenticated USING (user_id = auth.uid());

-- Users create own transactions
CREATE POLICY "Users create own transactions" ON public.transactions
  FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

-- Admins full access
CREATE POLICY "Admins full access transactions" ON public.transactions
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- updated_at trigger
CREATE TRIGGER update_transactions_updated_at
  BEFORE UPDATE ON public.transactions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();