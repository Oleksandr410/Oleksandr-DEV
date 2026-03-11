-- Case Studies table for Supabase
-- Run this in your Supabase SQL Editor or via Supabase CLI

create table if not exists public.case_studies (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),

  -- Core fields
  title text not null,
  industries text[] default '{}',
  skills text[] default '{}',

  -- Card display
  client_info text,
  timeline text,
  slug text unique,

  -- Content
  project_overview text,
  challenge text,
  solution text,
  result text,

  -- Links
  live_link text,
  github_repo_link text,

  -- Media (separate for flexibility)
  -- screenshots: [{"url": "...", "alt": "..."}]
  screenshots jsonb default '[]',
  -- videos: [{"url": "...", "caption": "..."}]
  videos jsonb default '[]',

  -- Display order
  sort_order int default 0
);

-- RLS
alter table public.case_studies enable row level security;

create policy "Allow public read access on case_studies"
  on public.case_studies
  for select
  using (true);

-- Index for slug lookups
create index if not exists case_studies_slug_idx on public.case_studies(slug);

-- Slugify: derive slug from title
create or replace function public.slugify_title(title text)
returns text as $$
  select trim(both '-' from regexp_replace(
    lower(regexp_replace(regexp_replace(coalesce(trim(title), ''), '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g')),
    '-+', '-', 'g'
  ));
$$ language sql immutable;

-- Trigger: auto-set slug from title
create or replace function public.case_studies_slug_from_title()
returns trigger as $$
begin
  new.slug := public.slugify_title(new.title);
  return new;
end;
$$ language plpgsql;

create trigger case_studies_slug_from_title
  before insert or update of title on public.case_studies
  for each row
  execute function public.case_studies_slug_from_title();

-- Trigger: update updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger case_studies_updated_at
  before update on public.case_studies
  for each row
  execute function public.handle_updated_at();
