'use server';

import React from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getAdminPosts } from '@/lib/supabase/actions';

import PostsTableSwitch from './posts-table-switch';
import PostsTableRowActions from './posts-table-row-actions';

export default async function PostsTable() {
  const posts = await getAdminPosts();

  if (!posts || !posts.length) {
    return <span className="text-sm text-center">Não há posts</span>;
  }

  return (
    <Table className="border bg-gradient-dark rounded-md w-full overflow-x-auto">
      <TableHeader>
        <TableRow>
          <TableCell align="center">Título</TableCell>
          <TableCell align="center">Premium</TableCell>
          <TableCell align="center">Publicado</TableCell>
          <TableCell align="center">Ações</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post, index) => (
          <TableRow key={index}>
            <TableCell align="center">{post.title}</TableCell>
            <TableCell align="center">
              <PostsTableSwitch
                defaultChecked={post.is_premium}
                type="is_premium"
                post_id={post.id}
              />
            </TableCell>
            <TableCell align="center">
              <PostsTableSwitch
                defaultChecked={post.is_published}
                type="is_published"
                post_id={post.id}
              />
            </TableCell>
            <TableCell align="center">
              <PostsTableRowActions data={post} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
