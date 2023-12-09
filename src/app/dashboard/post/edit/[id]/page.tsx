import React from 'react';

import { getUniquePost } from '@/lib/supabase/actions';

import EditPostForm from './components/edit-post-form';

export default async function EditPost({
  params: { id },
}: {
  params: { id: string };
}) {
  const post_data = await getUniquePost(id);

  return <EditPostForm default_data={post_data} post_id={id} />;
}
