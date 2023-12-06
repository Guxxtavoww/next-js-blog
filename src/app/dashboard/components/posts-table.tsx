import React from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import PostsTableRowActions from './posts-table-row-actions';
import { Switch } from '@/components/ui/switch';

export default function PostsTable() {
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
        <TableRow>
          <TableCell align="center">KARALHO</TableCell>
          <TableCell align="center">
            <Switch />
          </TableCell>
          <TableCell align="center">
            <Switch />
          </TableCell>
          <TableCell align="center">
            <PostsTableRowActions data={''} />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
