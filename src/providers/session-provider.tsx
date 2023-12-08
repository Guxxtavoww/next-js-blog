'use client';

import React, { useCallback, useEffect } from 'react';

import { useUserState } from '@/lib/store/user.store';
import { clientSideSupabase } from '@/lib/supabase/browser-client';

export default function SessionProvider({ children }: WithChildren) {
  const setUser = useUserState((state) => state.setUser);

  const readUserSession = useCallback(async () => {
    const { data } = await clientSideSupabase.auth.getSession();

    setUser(data.session?.user);
  }, [setUser]);

  useEffect(() => {
    readUserSession();
  }, [readUserSession]);

  return <>{children}</>;
}
