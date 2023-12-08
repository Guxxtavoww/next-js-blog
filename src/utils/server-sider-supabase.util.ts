'use server';

import { cookies as nextCookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { SupabaseClient } from '@supabase/supabase-js';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

import { Database } from '@/lib/supabase/types';
import { PostFormType } from '@/app/dashboard/post/components/post-form.types';

class ServerSideSupabase {
  private instance: SupabaseClient<Database, 'public'> | undefined = undefined;
  private cookies: ReadonlyRequestCookies | undefined = undefined;

  getCookiesInstance() {
    if (this.cookies) return this.cookies;

    this.cookies = nextCookies();

    return this.cookies;
  }

  getInstance() {
    if (this.instance) return this.instance;

    const cookiesStore = this.getCookiesInstance();

    this.instance = createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          get(name: string) {
            return cookiesStore.get(name)?.value;
          },
        },
      }
    );

    return this.instance;
  }
}

const serverSideSupabase = new ServerSideSupabase().getInstance();

export async function createPost(data: PostFormType) {
  const { content, ...post } = data;

  const createdPost = await serverSideSupabase
    .from('posts')
    .insert(post)
    .select('id')
    .single();

  if (createdPost.error) {
    throw JSON.stringify(createdPost);
  }

  const createdContent = await serverSideSupabase
    .from('posts_content')
    .insert({ content, related_post_id: createdPost.data.id });

  return JSON.stringify(createdContent);
}

export async function getUniquePost(post_id: string) {
  const foundedPost = await serverSideSupabase.from('posts');
}
