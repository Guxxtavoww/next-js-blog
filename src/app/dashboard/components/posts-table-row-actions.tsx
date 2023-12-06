'use client';

import { EyeOpenIcon, Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';

export default function PostsTableRowActions({ data }: { data: any }) {
  return (
    <div className="flex items-center justify-center flex-wrap gap-5">
      <Button variant="outline" className="inline-flex items-center gap-2">
        <EyeOpenIcon /> Visibilidade
      </Button>
      <Button variant="outline" className="inline-flex items-center gap-2">
        <TrashIcon /> Deletar
      </Button>
      <Button variant="outline" className="inline-flex items-center gap-2">
        <Pencil1Icon /> Editar
      </Button>
    </div>
  );
}
