'use client';

import { useMutation } from '@tanstack/react-query';

import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/use-toast';
import { PickTableType } from '@/lib/supabase/types';
import { updateBooleanValuesFromPost } from '@/lib/supabase/actions';

interface iPostsTableSwitchProps {
  defaultChecked: boolean;
  type: keyof Pick<PickTableType<'posts'>, 'is_premium' | 'is_published'>;
  post_id: string;
}

export default function PostsTableSwitch({
  defaultChecked,
  type,
  post_id,
}: iPostsTableSwitchProps) {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['switch-update', type],
    mutationFn: (value: boolean) =>
      updateBooleanValuesFromPost(post_id, value, type).catch((err) => {
        toast({
          title: 'Falha ao editar!',
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                {err?.message || JSON.stringify(err, null, 2)}
              </code>
            </pre>
          ),
        });
      }),
  });

  return (
    <Switch
      defaultChecked={defaultChecked}
      onCheckedChange={mutateAsync}
      disabled={isPending}
    />
  );
}
