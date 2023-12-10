'use client';

import { createBrowserClient } from '@supabase/ssr';
import { SupabaseClient } from '@supabase/supabase-js';

import { Database } from './types';

class ClientSideSupabase {
  private instance: SupabaseClient<Database, 'public'> | undefined = undefined;
  
  getInstance() {
    if (this.instance) return this.instance;

    this.instance = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    return this.instance;
  }
}

export const clientSideSupabase = new ClientSideSupabase();
