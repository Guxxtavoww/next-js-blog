'use server';

import { revalidatePath } from 'next/cache';
import { createServerClient } from '@supabase/ssr';
import { cookies as nextCookies } from 'next/headers';
import { SupabaseClient } from '@supabase/supabase-js';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

import { PostFormType } from '@/app/dashboard/post/components/post-form.types';

import { Database } from './types';

const DASHBOARD = '/dashboard';

class ServerSideSupabase {
  private instance: SupabaseClient<Database, 'public'> | undefined = undefined;
  private cookies: ReadonlyRequestCookies | undefined = undefined;

  async getCookiesInstance() {
    if (this.cookies) return this.cookies;

    this.cookies = nextCookies();

    return this.cookies;
  }

  async getInstance() {
    if (this.instance) return this.instance;

    const cookiesStore = await this.getCookiesInstance();

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

const supabaseServerClient = new ServerSideSupabase();

export async function getUserPosts() {
  const supabase = await supabaseServerClient.getInstance();

  const posts = await supabase
    .from('posts')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: true });

  if (posts.error) {
    throw posts.error;
  }

  return posts;
}

export async function createPost(data: PostFormType) {
  const { content, ...post } = data;

  const supabase = await supabaseServerClient.getInstance();

  const createdPost = await supabase
    .from('posts')
    .insert(post)
    .select('id')
    .single();

  if (createdPost.error) {
    throw createdPost.error;
  }

  const createdContent = await supabase
    .from('posts_content')
    .insert({ content, related_post_id: createdPost.data.id });

  return createdContent;
}

export async function getUniquePost(post_id: string) {
  const supabase = await supabaseServerClient.getInstance();

  const post = await supabase
    .from('posts')
    .select('*')
    .eq('id', post_id)
    .single();

  return post;
}

export async function deletePost(post_id: string) {
  const supabase = await supabaseServerClient.getInstance();

  const result = await supabase.from('posts').delete().eq('id', post_id);

  revalidatePath(DASHBOARD);
  revalidatePath('/posts/edit/' + post_id);

  return result;
}
