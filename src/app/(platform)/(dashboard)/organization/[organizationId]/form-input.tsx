'use client';

import { useFormStatus } from 'react-dom';

import { Input } from '@/components/ui/input';

type Props = {
  errors?: {
    title?: string[];
  };
};

export function FormInput({ errors }: Props) {
  const { pending } = useFormStatus();

  return (
    <div>
      <Input
        id='title'
        name='title'
        placeholder='Enter a board title'
        required
        disabled={pending}
      />
      {errors?.title ? (
        <div>
          {errors.title.map((error: string) => (
            <p key={error} className='text-rose-500'>
              {error}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
}
