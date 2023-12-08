'use client';

import { useCallback, useState, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { PostFormType, postFormSchema } from './post-form.types';

export function usePostForm(
  defaultData: Maybe<PostFormType>,
  onSubmit: (data: PostFormType) => void
) {
  const [isPreview, setPreview] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<PostFormType>({
    mode: 'all',
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: defaultData?.title,
      content: defaultData?.content,
      image_url: defaultData?.image_url,
      is_premium: defaultData?.is_premium,
      is_published: defaultData?.is_published,
    },
  });

  const handleSubmit = useCallback(
    (data: PostFormType) => {
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
