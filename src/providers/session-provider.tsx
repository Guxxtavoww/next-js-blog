'use client';

import React, { useCallback, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';

import { useUserState } from '@/lib/store/user.store';

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUser = useUserState((state) => state.setUser);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const readUserSession = useCallback(async () => {
    const { data } = await supabase.auth.getSession();

    setUser(data.session?.user);
  }, [supabase, setUser]);

  useEffect(() => {
    readUserSession();
  }, [readUserSession]);

  return <>{children}</>;
}
