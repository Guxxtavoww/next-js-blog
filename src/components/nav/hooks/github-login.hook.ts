'use client';

import { usePathname } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import { useMutation } from '@tanstack/react-query';

export function useGithubLogin() {
  const pathname = usePathname();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['github-login'],
    mutationFn: async () => {
      supabase.auth.signInWithOAuth({
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
