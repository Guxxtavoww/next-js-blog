'use server';

import { createClient } from '@supabase/supabase-js';

import { Database } from '@/lib/supabase/types';

export async function createSupbaseAdmin() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SERVICE_ROLE,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
