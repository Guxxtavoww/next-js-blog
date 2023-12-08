'use server';

import React from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { getUserPosts } from '@/lib/supabase/actions';

import PostsTableRowActions from './posts-table-row-actions';

export default async function PostsTable() {
  const { data: posts } = await getUserPosts();

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
              <Switch defaultChecked={post.is_premium} />
            </TableCell>
            <TableCell align="center">
              <Switch defaultChecked={post.is_published} />
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
