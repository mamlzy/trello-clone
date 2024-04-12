'use client';

/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
import { ElementRef, useRef, useState } from 'react';
import { updateList } from '@/actions/update-list';
import { List } from '@prisma/client';
import { toast } from 'sonner';
import { useEventListener } from 'usehooks-ts';

import { useAction } from '@/hooks/use-action';
import { FormInput } from '@/components/form/form-input';
import { ListOptions } from './list-options';

type Props = {
  data: List;
  onAddCard: () => void;
};

export function ListHeader({ data, onAddCard }: Props) {
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

  const { execute } = useAction(updateList, {
    onSuccess: (updatedData) => {
      toast.success(`Renamed to "${updatedData.title}"`);
      setTitle(updatedData.title);
      disableEditing();
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  const handleSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;
    const id = formData.get('id') as string;
    const boardId = formData.get('boardId') as string;

    if (title === data.title) {
      return disableEditing();
    }

    execute({
      id,
      boardId,
      title,
    });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      formRef.current?.requestSubmit();
    }
  };

  useEventListener('keydown', onKeyDown);

  return (
    <div className='flex items-start justify-between gap-x-2 px-2 pt-2 text-sm font-semibold'>
      {isEditing ? (
        <form ref={formRef} action={handleSubmit} className='flex-1 px-[2px]'>
          <input hidden id='id' name='id' value={data.id} />
          <input hidden id='boardId' name='boardId' value={data.boardId} />
          <FormInput
            ref={inputRef}
            id='title'
            placeholder='Enter list title..'
            defaultValue={title}
            onBlur={onBlur}
            className='h-7 truncate border-transparent bg-transparent px-[7px] py-1 text-sm font-medium transition hover:border-input focus:bg-white'
          />
          <button type='submit' hidden />
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className='h-7 w-full border-transparent px-2.5 py-1 text-sm font-medium'
        >
          {data.title}
        </div>
      )}
      <ListOptions data={data} onAddCard={onAddCard} />
    </div>
  );
}
