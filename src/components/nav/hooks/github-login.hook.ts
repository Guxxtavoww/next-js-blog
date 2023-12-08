'use client';

import { usePathname } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import { clientSideSupabase } from '@/lib/supabase/browser-client';

export function useGithubLogin() {
  const pathname = usePathname();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['github-login'],
    mutationFn: async () => {
      clientSideSupabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${location.origin}/auth/callback?next=${pathname}`,
        },
      });
    },
  });

  return {
    mutateAsync,
    isPending,
  };
}
