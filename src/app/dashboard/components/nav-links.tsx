'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReaderIcon, PersonIcon } from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';

const links = [
  {
    href: '/dashboard',
    text: 'Dashboard',
    icon: ReaderIcon,
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <div className="flex items-start gap-5 border-b pb-2">
      {links.map(({ icon: Icon, ...link }, index) => (
        <Link
          href={link.href}
          key={index}
          className={cn(
            'inline-flex items-center gap-1 hover:underline translate-all',
            { 'text-green-500 underline': pathname === link.href }
          )}
        >
          <Icon /> {link.text}
        </Link>
      ))}
    </div>
  );
}
