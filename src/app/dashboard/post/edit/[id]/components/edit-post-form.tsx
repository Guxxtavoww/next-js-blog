'use client';

import PostForm from '../../../components/post-form';
import { useEditPost } from '../hooks/edit-post-form.hook';
import { PostFormType } from '../../../components/post-form.types';

interface iEditPostForm {
  default_data: PostFormType;
  post_id: string;
}

export default function EditPostForm({ default_data, post_id }: iEditPostForm) {
  const { handleSubmit, isPending } = useEditPost(post_id);

  return (
    <PostForm
      onSubmit={handleSubmit}
      isLoading={isPending}
      defaultData={default_data}
      submitButtonText="Editar Post"
    />
  );
}
