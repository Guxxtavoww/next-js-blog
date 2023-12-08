'use client';

import React from 'react';

import CreatePostForm from '../components/post-form';
import { useCreatePost } from './hooks/create-post.hook';

export default function CreatePost() {
  const { handleSubmit, isPending } = useCreatePost();

  return <CreatePostForm onSubmit={handleSubmit} isLoading={isPending} />;
}
