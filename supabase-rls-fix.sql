-- RLS Policies Fix - Drop old and create new policies
-- Run this if you already ran the schema and got 406 errors

-- Drop old profiles policies
drop policy if exists profiles_select_self on public.profiles;
drop policy if exists profiles_select_admin on public.profiles;
drop policy if exists profiles_insert_admin on public.profiles;
drop policy if exists profiles_update_self on public.profiles;
drop policy if exists profiles_update_admin on public.profiles;
drop policy if exists profiles_delete_admin on public.profiles;

-- Recreate profiles policies (with better rules)
create policy profiles_select_authenticated on public.profiles
  for select using (auth.uid() is not null);

create policy profiles_insert_authenticated on public.profiles
  for insert with check (auth.uid() is not null);

create policy profiles_update_self on public.profiles
  for update using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy profiles_update_admin on public.profiles
  for update using (public.is_user_admin())
  with check (public.is_user_admin());

create policy profiles_delete_admin on public.profiles
  for delete using (public.is_user_admin());

-- Drop old product policies if needed
drop policy if exists products_select_authenticated on public.products;
drop policy if exists products_insert_admin on public.products;
drop policy if exists products_update_admin on public.products;
drop policy if exists products_delete_admin on public.products;

-- Recreate product policies
create policy products_select_all on public.products
  for select using (true);

create policy products_insert_admin on public.products
  for insert with check (public.is_user_admin());

create policy products_update_admin on public.products
  for update using (public.is_user_admin())
  with check (public.is_user_admin());

create policy products_delete_admin on public.products
  for delete using (public.is_user_admin());
