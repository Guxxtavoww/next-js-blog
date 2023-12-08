'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

import { toast } from '@/components/ui/use-toast';
import { useMutation } from '@tanstack/react-query';
import { createPost } from '@/utils/server-sider-supabase.util';

import { PostFormType } from '../../components/post-form.types';

export function useCreatePost() {
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['create-post'],
    mutationFn: (data: PostFormType) =>
      createPost(data).catch((err) => {
        throw err;
      }),
  });

  const handleSubmit = useCallback(
    async (data: PostFormType) => {
      try {
        await mutateAsync(data);

        toast({
          title: 'Post criado com sucesso! 🎉',
          description: data.title,
        });

        router.push('/dashboard');
      } catch (error: any) {
        console.log(error);

        toast({
          title: 'Falha ao criar o post 😢',
          description: (
            <pre className="mt-2 w-[340px] max-w-full rounded-md bg-slate-950 p-4">
              <code className="text-white max-w-full">
                {error.message || JSON.stringify(error, null, 2)}
              </code>
            </pre>
          ),
        });
      }
    },
    [router, mutateAsync]
  );

  return {
    handleSubmit,
    isPending,
  };
}
