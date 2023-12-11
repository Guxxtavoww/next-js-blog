'use server';

import { revalidatePath } from 'next/cache';
import { createServerClient } from '@supabase/ssr';
import { cookies as nextCookies } from 'next/headers';
import { SupabaseClient } from '@supabase/supabase-js';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

import { PostFormType } from '@/app/dashboard/post/components/post-form.types';

import { Database, PickTableType } from './types';

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

export async function getUsers() {
  const supabase = await supabaseServerClient.getInstance();

  const users = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: true });

  if (users.error) {
    throw users.error;
  }

  return users.data;
}

export async function getAdminPosts() {
  const supabase = await supabaseServerClient.getInstance();

  const posts = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: true });

  if (posts.error) {
    throw posts.error;
  }

  return posts.data;
}

export async function getPosts() {
  const supabase = await supabaseServerClient.getInstance();

  const posts = await supabase
    .from('posts')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: true });

  if (posts.error) {
    throw posts.error;
  }

  return posts.data;
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
    .insert({ content, post_id: createdPost.data.id });

  revalidatePath(DASHBOARD);
  revalidatePath('/');

  return createdContent;
}

export async function getUniquePostWithContent(post_id: string) {
  const supabase = await supabaseServerClient.getInstance();

  const [post, post_content_response] = await Promise.all([
    supabase.from('posts').select('*').eq('id', post_id).single(),
    supabase
      .from('posts_content')
      .select('content')
      .eq('post_id', post_id)
      .single(),
  ]);

  if (post.error) {
    return undefined;
  }

  return {
    ...post.data,
    content: post_content_response.data?.content || undefined,
  };
}

export async function updatePost(data: PostFormType, post_id: string) {
  const supabase = await supabaseServerClient.getInstance();

  const { content, ...post } = data;

  const [updatedPost, updatedPostContent] = await Promise.all([
    supabase.from('posts').update(post).eq('id', post_id),
    supabase.from('posts_content').update({ content }).eq('post_id', post_id),
  ]);

  if (updatedPost.error || updatedPostContent.error) {
    throw updatedPost.error || updatedPostContent.error;
  }

  revalidatePath('/');
  revalidatePath(DASHBOARD);

  return Promise.resolve();
}

export async function updateBooleanValuesFromPost(
  post_id: string,
  value: boolean,
  type: keyof Omit<
    PickTableType<'posts'>,
    'created_at' | 'id' | 'image_url' | 'title'
  >
) {
  const supabase = await supabaseServerClient.getInstance();

  const updatedPost = await supabase
    .from('posts')
    .update({ [type]: value })
    .eq('id', post_id);

  if (updatedPost.error) {
    throw updatedPost.error;
  }

  revalidatePath('/');
  revalidatePath(DASHBOARD);

  return updatedPost.data;
}

export async function deletePost(post_id: string) {
  const supabase = await supabaseServerClient.getInstance();

  const deletePostResult = await supabase
    .from('posts')
    .delete()
    .eq('id', post_id);

  if (deletePostResult.error) {
    throw deletePostResult.error;
  }

  revalidatePath('/');
  revalidatePath(DASHBOARD);

  return deletePostResult;
}
