import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './types';

let serviceClient: SupabaseClient<Database> | null = null;

/**
 * Get the Supabase service client (server-side only)
 * Uses SUPABASE_SERVICE_ROLE_KEY for admin access
 */
export function getServiceClient(): SupabaseClient<Database> {
  if (serviceClient) return serviceClient;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  }

  serviceClient = createClient<Database>(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return serviceClient;
}

/**
 * Create a Supabase client for browser/client-side use
 * Uses NEXT_PUBLIC_SUPABASE_ANON_KEY
 */
export function getSupabaseClient(): SupabaseClient<Database> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
  }

  return createClient<Database>(url, key);
}
