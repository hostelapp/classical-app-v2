-- Tighten video management security and enforce data integrity
begin;

-- Replace the broad authenticated policy with an admin-only policy
drop policy if exists "Authenticated users can manage videos" on public.videos;

create policy "Admins can manage videos"
  on public.videos
  for all
  to authenticated
  using (
    auth.role() = 'authenticated'
    and coalesce((auth.jwt()->'app_metadata'->>'is_admin')::boolean, false)
  )
  with check (
    auth.role() = 'authenticated'
    and coalesce((auth.jwt()->'app_metadata'->>'is_admin')::boolean, false)
  );

-- Enforce non-empty string fields
alter table public.videos
  alter column search_term set not null,
  alter column youtube_id set not null,
  alter column genre set not null,
  alter column composer set not null,
  alter column symphony set not null;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'videos_trimmed_values_check'
  ) then
    alter table public.videos
      add constraint videos_trimmed_values_check
      check (
        btrim(search_term) <> '' and
        btrim(youtube_id) <> '' and
        btrim(genre) <> '' and
        btrim(composer) <> '' and
        btrim(symphony) <> ''
      );
  end if;
end;
$$;

-- Ensure YouTube IDs look valid
do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'videos_youtube_id_length_check'
  ) then
    alter table public.videos
      add constraint videos_youtube_id_length_check
      check (char_length(youtube_id) = 11);
  end if;
end;
$$;

-- Guard against implausible composition years
do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'videos_year_range_check'
  ) then
    alter table public.videos
      add constraint videos_year_range_check
      check (year is null or (year between 1600 and 2100));
  end if;
end;
$$;

-- Prevent duplicate composer/piece combinations
do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'videos_composer_symphony_key'
  ) then
    alter table public.videos
      add constraint videos_composer_symphony_key unique (composer, symphony);
  end if;
end;
$$;

commit;
