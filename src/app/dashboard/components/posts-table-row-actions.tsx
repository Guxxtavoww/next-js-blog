'use client';

import { EyeOpenIcon, Pencil1Icon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import { PickTableType } from '@/lib/supabase/types';

import PostsTableDeleteAction from './posts-table-delete-action';

interface iPostsTableRowActionsProps {
  data: PickTableType<'posts'>;
}

export default function PostsTableRowActions({
  data,
}: iPostsTableRowActionsProps) {
  return (
    <div className="flex items-center justify-center flex-wrap gap-5">
      <Button variant="outline" className="inline-flex items-center gap-2">
        <EyeOpenIcon /> Visibilidade
      </Button>
      <Button variant="outline" className="inline-flex items-center gap-2">
        <Pencil1Icon /> Editar
      </Button>
      <PostsTableDeleteAction post_id={data.id} />
    </div>
  );
}
