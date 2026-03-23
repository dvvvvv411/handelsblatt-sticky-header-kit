
-- Create custom_cards table
create table public.custom_cards (
  id uuid primary key default gen_random_uuid(),
  created_by uuid references auth.users(id) on delete cascade not null,
  name text not null,
  sponsor_label text not null default 'ÜBER IHRE FIRMA',
  logo_url text,
  headline text not null default 'Ihre Headline hier',
  description text not null default 'Ihre Beschreibung hier...',
  trust_indicator_1 text not null default 'Vorteil 1',
  trust_indicator_2 text not null default 'Vorteil 2',
  metric_value text not null default '+XX%',
  metric_label text not null default 'Ihre Kennzahl',
  service_title text not null default 'PREMIUM-SERVICE',
  service_line_1 text not null default 'Service Zeile 1',
  service_line_2 text not null default 'Service Zeile 2',
  cta_button_text text not null default 'JETZT STARTEN',
  cta_url text not null default 'https://example.com',
  accent_color text not null default '#ef6400',
  disclaimer_text text not null default 'Ihr Risikohinweis hier',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.custom_cards enable row level security;

create policy "Admins can manage custom cards" on public.custom_cards
  for all to authenticated
  using (has_role(auth.uid(), 'admin'::app_role))
  with check (has_role(auth.uid(), 'admin'::app_role));

-- Create storage bucket for card logos
insert into storage.buckets (id, name, public) values ('card-logos', 'card-logos', true);

-- Allow authenticated users to upload logos
create policy "Authenticated users can upload card logos"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'card-logos');

-- Allow public read access to card logos
create policy "Public read access to card logos"
  on storage.objects for select to public
  using (bucket_id = 'card-logos');

-- Allow authenticated users to delete their logos
create policy "Authenticated users can delete card logos"
  on storage.objects for delete to authenticated
  using (bucket_id = 'card-logos');
