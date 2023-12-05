'use client';

import React from 'react';
import Image from 'next/image';
import { User } from '@supabase/supabase-js';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface iProfileProps {
  userData: User;
}

export default function Profile({ userData }: iProfileProps) {
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
      <PopoverContent>
        <div className="px-4 text-sm">
          <p>{userData.user_metadata?.user_name}</p>
          <p className="text-gray-500">{userData.email}</p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
