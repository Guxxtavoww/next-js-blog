'use client';

import { useCallback, useState } from 'react';
import { TrashIcon } from '@radix-ui/react-icons';
import { useMutation } from '@tanstack/react-query';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import Loader from '@/components/ui/loader';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { deletePost } from '@/lib/supabase/actions';
import { PickTableType } from '@/lib/supabase/types';

export default function PostsTableDeleteAction({
  post_id,
  post_title,
}: {
  post_id: PickTableType<'posts'>['id'];
  post_title: PickTableType<'posts'>['title'];
}) {
  const [isOpen, setIsOpen] = useState(false);

  const { isPending, mutateAsync } = useMutation({
    mutationKey: ['delete-post'],
    mutationFn: async (id: string) => {
      return await deletePost(id).catch((err) => {
        throw err;
      });
    },
  });

  const handleClick = useCallback(async () => {
    try {
      await mutateAsync(post_id).then(() => {
        toast({
          title: `Post: '${post_id}' deletado com sucesso! 🎉`,
        });

        setIsOpen(false);
      });
    } catch (error: any) {
      toast({
        title: 'Falha ao deletar!',
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{error?.message}</code>
          </pre>
        ),
      });
    }
  }, [post_id, mutateAsync]);

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="inline-flex items-center gap-2"
          onClick={() => setIsOpen(true)}
        >
          <TrashIcon /> Deletar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza ?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita. Isso excluirá permanentemente a
            postagem: <strong className="text-extraBold">{post_title}</strong> e
            o conteúdo relacionado a ela.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsOpen(false)}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              handleClick();
              e.preventDefault();
            }}
            disabled={isPending}
          >
            {isPending ? <Loader /> : 'Continar'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
