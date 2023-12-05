'use client';

import React, { useCallback } from 'react';
import { SiGithub } from 'react-icons/si';
import { usePathname } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';

import { Button } from '../ui/button';

export default function GithubLogin() {
  const pathname = usePathname();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const handleGithubLogin = useCallback(async () => {
    return supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${location.origin}/auth/callback?next=${pathname}`,
      },
    });
  }, [supabase, pathname]);

  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
      onClick={handleGithubLogin}
    >
      <SiGithub /> Login
    </Button>
  );
}
