import React from 'react';
import Link from 'next/link';

import GithubLogin from '../github-login/github-login';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center">
      <div className="group">
        <Link href="/" className="text-2xl font-bold">
          Blog
        </Link>
        <div className="h-1 w-0 group-hover:w-full transition-all bg-green-500" />
      </div>
      <GithubLogin />
    </nav>
  );
}
