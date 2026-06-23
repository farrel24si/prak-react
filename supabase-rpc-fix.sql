-- Function: award points and update tier for a member (bypass RLS via security definer)
-- Admin calls this when accepting an order

create or replace function public.award_points(
  p_user_id uuid,
  p_points_earned int
) returns void
language plpgsql security definer
as $$
declare
  current_pts int;
  new_pts int;
  new_tier text;
begin
  -- Ambil poin saat ini
  select coalesce(points, 0) into current_pts
  from public.profiles where user_id = p_user_id;

  new_pts := current_pts + p_points_earned;

  -- Tentukan tier baru
  if new_pts > 3000 then
    new_tier := 'Platinum';
  elsif new_pts >= 1501 then
    new_tier := 'Gold';
  elsif new_pts >= 501 then
    new_tier := 'Silver';
  else
    new_tier := 'Bronze';
  end if;

  -- Update profile — admin can update any profile via security definer
  update public.profiles
  set
    points = new_pts,
    loyalty_tier = new_tier,
    updated_at = now()
  where user_id = p_user_id;
end;
$$;