import Link from 'next/link';
import { PlusIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';

import PostsTable from './components/posts-table';

export default function Dashboard() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Blogs</h1>
        <Link href="/dashboard/post/create">
          <Button variant="outline">
            Criar Post <PlusIcon className="ml-2" />
          </Button>
        </Link>
      </div>
      <PostsTable />
    </div>
  );
}
