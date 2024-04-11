'use client';

/* eslint-disable @typescript-eslint/no-shadow */
import { ElementRef, useRef, useState } from 'react';
import { updateBoard } from '@/actions/update-board';
import { Board } from '@prisma/client';
import { toast } from 'sonner';

import { useAction } from '@/hooks/use-action';
import { FormInput } from '@/components/form/form-input';
import { Button } from '@/components/ui/button';

type Props = {
  data: Board;
};

export function BoardTitleForm({ data }: Props) {
  const { execute } = useAction(updateBoard, {
    onSuccess: (board) => {
      toast.success(`Board "${board.title} updated"`);
      setTitle(board.title);
      disableEditing();
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  const formRef = useRef<ElementRef<'form'>>(null);
  const inputRef = useRef<ElementRef<'input'>>(null);

  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;

    execute({ id: data.id, title });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  if (isEditing) {
    return (
      <form
        ref={formRef}
        action={onSubmit}
        className='flex items-center gap-x-2'
      >
        <FormInput
          ref={inputRef}
          id='title'
          onBlur={onBlur}
          defaultValue={title}
          className='h-7 border-none bg-transparent px-[7px] py-1 text-lg font-bold focus-visible:outline-none focus-visible:ring-transparent'
        />
      </form>
    );
  }

  return (
    <Button
      variant='transparent'
      onClick={enableEditing}
      className='size-auto px-2 py-1 text-lg font-bold'
    >
      {title}
    </Button>
  );
}
