'use client';

import { createBrowserClient } from '@supabase/ssr';
import { useMutation } from '@tanstack/react-query';

import { useUserState } from '@/lib/store/user.store';

export function useProfile() {
  const setUser = useUserState((state) => state.setUser);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['logout'],
    mutationFn: async () => {
      await supabase.auth.signOut();

      setUser(undefined);
    },
  });

  return {
    mutateAsync,
    isPending,
  };
}
