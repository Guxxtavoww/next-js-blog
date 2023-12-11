import React from 'react';

import { getUniquePostWithContent } from '@/lib/supabase/actions';

import EditPostForm from './components/edit-post-form';

export default async function EditPost({
  params: { id },
}: {
  params: { id: string };
}) {
  const post_data = await getUniquePostWithContent(id);

  if (!post_data) {
    return <h1 className="text-white">Inválido</h1>;
  }

  return (
    <EditPostForm
      default_data={{ ...post_data, content: post_data.content || '' }}
      post_id={id}
    />
  );
}
