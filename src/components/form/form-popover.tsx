'use client';

import { ElementRef, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createBoard } from '@/actions/create-board';
import { XIcon } from 'lucide-react';
import { toast } from 'sonner';

import { useAction } from '@/hooks/use-action';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { FormInput } from './form-input';
import { FormPicker } from './form-picker';
import { FormSubmit } from './form-submit';

type Props = {
  children: React.ReactNode;
  side?: 'left' | 'right' | 'top' | 'bottom';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
};

export function FormPopover({
  children,
  side = 'bottom',
  align,
  sideOffset = 0,
}: Props) {
  const router = useRouter();
  const closeRef = useRef<ElementRef<'button'>>(null);

  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      toast.success('Board Created');
      closeRef.current?.click();
      router.push(`/board/${data.id}`);
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;
    const image = formData.get('image') as string;

    execute({ title, image });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        className='w-80 pt-3'
        side={side}
        sideOffset={sideOffset}
      >
        <div className='pb-4 text-center text-sm font-medium text-neutral-600'>
          Create Board
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            variant='ghost'
            className='absolute right-2 top-2 size-auto p-2 text-neutral-600'
          >
            <XIcon className='size-4' />
          </Button>
        </PopoverClose>
        <form action={onSubmit} className='space-y-4'>
          <div className='space-y-4'>
            <FormPicker id='image' errors={fieldErrors} />
            <FormInput
              type='text'
              id='title'
              label='Board Title'
              errors={fieldErrors}
            />
          </div>
          <FormSubmit className='w-full'>Create</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
}
