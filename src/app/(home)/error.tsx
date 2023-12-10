'use client'; // Error components must be Client Components

import { useEffect } from 'react';

import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Algo deu errado!</h2>
      <Button onClick={reset}>Tente novamente.</Button>
    </div>
  );
}
