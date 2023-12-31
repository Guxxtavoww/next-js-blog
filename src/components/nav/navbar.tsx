'use client';

import React from 'react';
import Link from 'next/link';

import { useUserState } from '@/lib/store/user.store';

import Profile from './components/profile';
import GithubLogin from './components/github-login';

export default function Navbar() {
  const user = useUserState((state) => state.user);

  return (
    <nav className="flex justify-between items-center">
      <div className="group">
        <Link href="/" className="text-2xl font-bold">
          Next JS Blog
        </Link>
        <div className="h-1 w-0 group-hover:w-full transition-all bg-green-500" />
      </div>
      {user ? <Profile userData={user} /> : <GithubLogin />}
    </nav>
  );
}
