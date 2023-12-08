'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import { useMutation } from '@tanstack/react-query';

import { useUserState } from '@/lib/store/user.store';
import { clientSideSupabase } from '@/lib/supabase/browser-client';

export function useProfile(userData: User) {
  const router = useRouter();
  const setUser = useUserState((state) => state.setUser);

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['logout'],
    mutationFn: async () => {
      await clientSideSupabase.auth.signOut();

      setUser(undefined);
      router.replace('/');
    },
  });

  const isAdmin = useMemo(
    () => userData.user_metadata?.role === 'admin',
    [userData]
  );

  return {
    mutateAsync,
    isPending,
    isAdmin,
  };
}
