-- Users profiles (extends Supabase auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  name text,
  role text not null default 'user' check (role in ('user','admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Policies
create policy "Users can read own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

create policy "Admins can read all profiles" on public.profiles
  for select using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- Progress table
create table if not exists public.progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  skill text check (skill in ('CO','CE','EE','EO')),
  score integer check (score between 0 and 100),
  metadata jsonb,
  created_at timestamptz not null default now()
);

alter table public.progress enable row level security;

create policy "Users can read own progress" on public.progress
  for select using (auth.uid() = user_id);
create policy "Users can insert own progress" on public.progress
  for insert with check (auth.uid() = user_id);
create policy "Users can update own progress" on public.progress
  for update using (auth.uid() = user_id);

-- Attempts (rich history)
create table if not exists public.attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  kind text not null check (kind in ('leçon','évaluation','examen')),
  skill text not null check (skill in ('CO','CE','EE','EO')),
  label text not null,
  score_percent integer not null check (score_percent between 0 and 100),
  created_at timestamptz not null default now()
);

alter table public.attempts enable row level security;

create policy "Users can read own attempts" on public.attempts
  for select using (auth.uid() = user_id);
create policy "Users can insert own attempts" on public.attempts
  for insert with check (auth.uid() = user_id);
create policy "Users can update own attempts" on public.attempts
  for update using (auth.uid() = user_id);
