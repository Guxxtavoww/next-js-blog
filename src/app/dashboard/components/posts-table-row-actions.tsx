'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Pencil1Icon, EyeOpenIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import { PickTableType } from '@/lib/supabase/types';

import PostsTableDeleteAction from './posts-table-delete-action';

interface iPostsTableRowActionsProps {
  data: PickTableType<'posts'>;
}

export default function PostsTableRowActions({
  data,
}: iPostsTableRowActionsProps) {
  const router = useRouter();

  const handleEditButtonClick = useCallback(() => {
    router.replace(`/dashboard/post/edit/${data.id}`);
  }, [router, data]);

  const handleViewButtonClick = useCallback(() => {
    router.replace(`/post/${data.id}`);
  }, [router, data]);

  return (
    <div className="flex items-center justify-center flex-wrap gap-5">
      <Button
        variant="outline"
        className="inline-flex items-center gap-2"
        onClick={handleViewButtonClick}
      >
        <EyeOpenIcon /> Ver
      </Button>
      <Button
        variant="outline"
        className="inline-flex items-center gap-2"
        onClick={handleEditButtonClick}
      >
        <Pencil1Icon /> Editar
      </Button>
      <PostsTableDeleteAction post_id={data.id} post_title={data.title} />
    </div>
  );
}
