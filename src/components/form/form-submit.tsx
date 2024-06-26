'use client';

import { useFormStatus } from 'react-dom';

import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

type Props = {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | 'primary';
};

export function FormSubmit({
  children,
  disabled,
  className,
  variant = 'primary',
}: Props) {
  const { pending } = useFormStatus();

  return (
    <Button
      type='submit'
      variant={variant}
      size='sm'
      className={cn(className)}
      disabled={disabled || pending}
    >
      {children}
    </Button>
  );
}
