import React from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function PostsTable() {
  return (
    <Table className="border bg-gradient-dark rounded-md">
      <TableHeader>
        <TableRow>
          <TableCell>Título</TableCell>
          <TableCell>Premium</TableCell>
          <TableCell>Publicado</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableCell className="font-medium">INV001</TableCell>
        <TableCell>Paid</TableCell>
        <TableCell>Credit Card</TableCell>
      </TableBody>
    </Table>
  );
}
