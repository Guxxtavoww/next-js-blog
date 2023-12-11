import React from 'react';
import Image from 'next/image';

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getUsers } from '@/lib/supabase/actions';

export default async function User() {
  const users = await getUsers();

  if (!users || !users.length) {
    return <h1 className="text-white">Não há usuarios</h1>;
  }

  return (
    <Table className="border bg-gradient-dark rounded-md w-full overflow-x-auto">
      <TableHeader>
        <TableRow>
          <TableCell align="center">Nome</TableCell>
          <TableCell align="center">Inscrição</TableCell>
          <TableCell align="center">Cliente</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user, index) => (
          <TableRow key={index} className="flex items-center gap-2 font-medium">
            <TableCell align="center">
              <Image
                src={user.image_url}
                className="rounded-full ring-green-500 ring-1"
                width={50}
                height={50}
                alt={user.display_name}
              />
              <h1>{user.display_name}</h1>
            </TableCell>
            <TableCell>{user.stripe_subscription_id}</TableCell>
            <TableCell>{user.stripe_customer_id}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
