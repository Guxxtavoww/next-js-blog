import Image from 'next/image';

import { getUniquePostWithContent } from '@/lib/supabase/actions';

import PostContent from './components/post-content';

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const post = await getUniquePostWithContent(id);

  if (!post) {
    return <h1 className="text-white">Inválido!</h1>;
  }

  return (
    <div className="max-w-5xl mx-auto min-h-screen pt-10 space-y-10">
      <div className="sm:px-10 space-y-5">
        <h1 className=" text-3xl font-bold dark:text-gray-200">{post.title}</h1>
        <p className="text-sm dark:text-gray-400">
          {new Date(post.created_at).toLocaleDateString()}
        </p>
      </div>
      <div className="w-full h-96 relative">
        <Image
          priority
          src={post.image_url}
          alt="cover"
          fill
          className="object-cover object-center rounded-md border-[0.5px] border-zinc-600"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <PostContent content={post.content} />
    </div>
  );
}
