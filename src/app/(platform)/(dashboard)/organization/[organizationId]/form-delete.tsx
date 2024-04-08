'use client';

import { useFormStatus } from 'react-dom';

import { Button } from '@/components/ui/button';

export function FormDelete() {
  const { pending } = useFormStatus();

  return (
    <Button type='submit' variant='destructive' size='sm' disabled={pending}>
      Delete
    </Button>
  );
}
