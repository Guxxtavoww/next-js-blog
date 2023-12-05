'use client';

import React from 'react';
import Image from 'next/image';
import { User } from '@supabase/supabase-js';

interface iProfileProps {
  userData: User;
}

export default function Profile({ userData }: iProfileProps) {
  return (
    <Image
      src={userData.user_metadata?.avatar_url}
      alt="Profile Pic"
      width={50}
      height={50}
      className="rounded-full ring-2 ring-green-500"
      loading="lazy"
    />
  );
}
