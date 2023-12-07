'use client';

import { useCallback, useState, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { CreatePostFormType } from '../types/form.types';
import { createPostFormSchema } from '../schemas/create-post-form.schema';

export function useCreatePostForm(
  onSubmit: (data: CreatePostFormType) => void
) {
  const [isPreview, setPreview] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<CreatePostFormType>({
    mode: 'all',
    resolver: zodResolver(createPostFormSchema),
  });

  const handleSubmit = useCallback(
    (data: CreatePostFormType) => {
      startTransition(() => {
        onSubmit(data);
      });
    },
    [startTransition, onSubmit]
  );

  const handlePreviewChange = useCallback(() => {
    setPreview((prev) => !prev && !form.getFieldState('image_url').invalid);
  }, [form]);

  return {
    form,
    isPending,
    handleSubmit,
    isPreview,
    handlePreviewChange,
  };
}
