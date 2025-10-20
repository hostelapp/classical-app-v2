import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let client: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
  client = createClient(supabaseUrl, supabaseAnonKey);
} else if (typeof console !== 'undefined') {
  console.warn(
    'Supabase environment variables are not configured. The application will fall back to the built-in catalogue only.'
  );
}

export const supabase = client;

export const isSupabaseConfigured = () => client !== null;

export interface Video {
  id: string;
  search_term: string;
  youtube_id: string;
  genre: string;
  composer: string;
  symphony: string;
  year: number | null;
  created_at: string;
  updated_at: string;
}

