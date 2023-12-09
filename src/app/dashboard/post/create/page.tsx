'use client';

import React from 'react';

import PostForm from '../components/post-form';
import { useCreatePost } from './hooks/create-post.hook';

export default function CreatePost() {
  const { handleSubmit, isPending } = useCreatePost();

  return <PostForm onSubmit={handleSubmit} isLoading={isPending} />;
}
