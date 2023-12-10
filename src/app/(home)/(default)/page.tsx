import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { getPosts } from '@/lib/supabase/actions';

export default async function Page() {
  const posts = await getPosts();

  if (!posts.length || !posts) {
    return (
      <span className="text-lg font-extrabold text-white">Não há posts</span>
    );
  }

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 p-5 xl:p-0">
      {posts.map((post, index) => (
        <Link
          key={index}
          href={`/post/${post.id}`}
          className="w-full border rounded-md dark:bg-graident-dark p-5 hover:ring-2 ring-green-500 transition-all cursor-pointer space-y-5 first:lg:col-span-2 first:md"
        >
          <div className="relative w-full h-72 md:h-64 xl:h-96">
            <Image
              priority
              loading="lazy"
              src={post.image_url}
              alt={`Post image ${post.id}`}
              className="rounded-lg"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="space-y-2">
            <p className="text-sm dark:text-gray-400">
              {new Date(post.created_at).toLocaleDateString()}
            </p>
            <h1 className="text-xl font-bold dark:text-gray-300">
              {post.title}
            </h1>
          </div>
        </Link>
      ))}
    </div>
  );
}
