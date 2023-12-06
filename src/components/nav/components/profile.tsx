'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { User } from '@supabase/supabase-js';
import { DashboardIcon, LockOpen1Icon } from '@radix-ui/react-icons';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import Loader from '../../ui/loader';
import { Button } from '../../ui/button';
import { useProfile } from '../hooks/profile.hook';

interface iProfileProps {
  userData: User;
}

export default function Profile({ userData }: iProfileProps) {
  const { isPending, mutateAsync, isAdmin } = useProfile(userData);

  return (
    <Popover>
      <PopoverTrigger>
        <Image
          src={userData.user_metadata?.avatar_url}
          alt="Profile Pic"
          width={50}
          height={50}
          className="rounded-full ring-2 ring-green-500"
          loading="lazy"
        />
      </PopoverTrigger>
      <PopoverContent className="p-2 space-y-3 divide-y-1" align="end">
        <div className="px-4 text-sm">
          <p>{userData.user_metadata?.user_name}</p>
          <p className="text-gray-500">{userData.email}</p>
        </div>
        {isAdmin ? (
          <Link href="/dashboard" className="block">
            <Button
              variant="ghost"
              className="w-full flex items-center justify-between"
            >
              Dashboard
              <DashboardIcon />
            </Button>
          </Link>
        ) : null}
        <Button
          variant="ghost"
          className="w-full flex items-center justify-between"
          onClick={() => mutateAsync()}
          disabled={isPending}
        >
          Logout
          {isPending ? <Loader /> : <LockOpen1Icon />}
        </Button>
      </PopoverContent>
    </Popover>
  );
}
