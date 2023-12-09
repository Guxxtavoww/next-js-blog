'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import { updatePost } from '@/lib/supabase/actions';
import { toast } from '@/components/ui/use-toast';

import { PostFormType } from '../../../components/post-form.types';

export function useEditPost(post_id: string) {
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['update-post', post_id],
    mutationFn: (data: PostFormType) => updatePost(data, post_id),
  });

  const handleSubmit = useCallback(
    async (data: PostFormType) => {
      await mutateAsync(data)
        .then(() => {
          toast({
            title: 'Post editado com sucesso! 🎉',
            description: data.title,
          });

          router.replace('/dashboard');
        })
        .catch((err) => {
          toast({
            title: 'Falha ao editar o post 😢',
            description: (
              <pre className="mt-2 w-[340px] max-w-full rounded-md bg-slate-950 p-4">
                <code className="text-white max-w-full">
                  {err.message || JSON.stringify(err, null, 2)}
                </code>
              </pre>
            ),
          });
        });
    },
    [mutateAsync, router]
  );

  return {
    handleSubmit,
    isPending,
  };
}
