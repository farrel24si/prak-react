-- Supabase schema and RLS policy setup
-- Tables: profiles, products, orders, order_items
-- Trigger: synchronize auth.users insert into profiles
-- Row Level Security: enable and policies for admin/member access control

-- Tables (create first, before functions that reference them)
create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text,
  role text not null default 'member' check (role in ('admin', 'member')),
  loyalty_tier text not null default 'Bronze' check (loyalty_tier in ('Bronze', 'Silver', 'Gold', 'Platinum')),
  points int not null default 0 check (points >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.products (
  id serial primary key,
  title text not null,
  code text not null unique,
  category text not null,
  brand text not null,
  price numeric(12,2) not null check (price >= 0),
  stock int not null default 0 check (stock >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id serial primary key,
  user_id uuid not null references public.profiles(user_id) on delete cascade,
  customer_name text not null,
  status text not null default 'Pending' check (status in ('Pending', 'Completed', 'Cancelled')),
  total_price numeric(12,2) not null check (total_price >= 0),
  discount_percentage numeric(5,2) not null default 0 check (discount_percentage >= 0),
  discount_amount numeric(12,2) not null default 0 check (discount_amount >= 0),
  final_amount numeric(12,2) not null check (final_amount >= 0),
  loyalty_tier text not null default 'Bronze' check (loyalty_tier in ('Bronze', 'Silver', 'Gold', 'Platinum')),
  loyalty_points int not null default 0 check (loyalty_points >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id serial primary key,
  order_id int not null references public.orders(id) on delete cascade,
  product_id int not null references public.products(id),
  quantity int not null check (quantity > 0),
  unit_price numeric(12,2) not null check (unit_price >= 0),
  subtotal numeric(14,2) generated always as (quantity * unit_price) stored,
  created_at timestamptz not null default now()
);

-- Helper function to check admin role (create AFTER tables exist)
create or replace function public.is_user_admin() returns boolean
language sql stable as $$
  select exists (
    select 1 from public.profiles
    where user_id = auth.uid() and role = 'admin'
  );
$$;

-- Trigger to populate profiles after auth user registration
create or replace function public.sync_new_auth_user_to_profiles() returns trigger as $$
begin
  insert into public.profiles(
    user_id,
    email,
    full_name,
    role,
    loyalty_tier,
    points,
    created_at,
    updated_at
  ) values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.email),
    'member',
    'Bronze',
    0,
    now(),
    now()
  ) on conflict (user_id) do nothing;

  return new;
end;
$$ language plpgsql security definer;

create trigger trigger_sync_new_auth_user_to_profiles
  after insert on auth.users
  for each row execute function public.sync_new_auth_user_to_profiles();

-- Enable Row Level Security for every table
alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- RLS policies for profiles
create policy profiles_select_authenticated on public.profiles
  for select using (auth.uid() is not null);

create policy profiles_select_self on public.profiles
  for select using (auth.uid() = user_id);

create policy profiles_select_admin on public.profiles
  for select using (public.is_user_admin());

create policy profiles_insert_authenticated on public.profiles
  for insert with check (auth.uid() is not null);

create policy profiles_insert_admin on public.profiles
  for insert with check (public.is_user_admin());

create policy profiles_update_self on public.profiles
  for update using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy profiles_update_admin on public.profiles
  for update using (public.is_user_admin())
  with check (public.is_user_admin());

create policy profiles_delete_admin on public.profiles
  for delete using (public.is_user_admin());

-- RLS policies for products
create policy products_select_authenticated on public.products
  for select using (auth.uid() is not null);

create policy products_insert_admin on public.products
  for insert with check (public.is_user_admin());

create policy products_update_admin on public.products
  for update using (public.is_user_admin())
  with check (public.is_user_admin());

create policy products_delete_admin on public.products
  for delete using (public.is_user_admin());

-- RLS policies for orders
create policy orders_select_owner on public.orders
  for select using (auth.uid() = user_id);

create policy orders_select_admin on public.orders
  for select using (public.is_user_admin());

create policy orders_insert_authenticated on public.orders
  for insert with check (auth.uid() = user_id);

create policy orders_update_admin on public.orders
  for update using (public.is_user_admin())
  with check (public.is_user_admin());

create policy orders_delete_admin on public.orders
  for delete using (public.is_user_admin());

-- RLS policies for order_items
create policy order_items_select_owner on public.order_items
  for select using (
    exists (
      select 1 from public.orders o
      where o.id = order_items.order_id and o.user_id = auth.uid()
    )
  );

create policy order_items_select_admin on public.order_items
  for select using (public.is_user_admin());

create policy order_items_insert_owner on public.order_items
  for insert with check (
    exists (
      select 1 from public.orders o
      where o.id = order_id and o.user_id = auth.uid()
    )
  );

create policy order_items_update_admin on public.order_items
  for update using (public.is_user_admin())
  with check (public.is_user_admin());

create policy order_items_delete_admin on public.order_items
  for delete using (public.is_user_admin());
