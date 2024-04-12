'use client';

/* eslint-disable @typescript-eslint/no-shadow */
import { ElementRef, forwardRef, KeyboardEventHandler, useRef } from 'react';
import { useParams } from 'next/navigation';
import { createCard } from '@/actions/create-card';
import { PlusIcon, XIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';

import { useAction } from '@/hooks/use-action';
import { FormSubmit } from '@/components/form/form-submit';
import { FormTextArea } from '@/components/form/form-textarea';
import { Button } from '@/components/ui/button';

type Props = {
  listId: string;
  enableEditing: () => void;
  disableEditing: () => void;
  isEditing: boolean;
};

export const CardForm = forwardRef<HTMLTextAreaElement, Props>(
  ({ listId, enableEditing, disableEditing, isEditing }, ref) => {
    const params = useParams();
    const formRef = useRef<ElementRef<'form'>>(null);

    const { execute, fieldErrors } = useAction(createCard, {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" created`);
        formRef.current?.reset();
      },
      onError: (err) => {
        toast.error(err);
      },
    });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        disableEditing();
      }
    };

    useOnClickOutside(formRef, disableEditing);
    useEventListener('keydown', onKeyDown);

    const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
      e
    ) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    };

    const onSubmit = (formData: FormData) => {
      const title = formData.get('title') as string;
      const listId = formData.get('listId') as string;
      const boardId = params.boardId as string;

      execute({ title, listId, boardId });
    };

    if (isEditing) {
      return (
        <form
          ref={formRef}
          action={onSubmit}
          className='m-1 space-y-4 px-1 py-1.5'
        >
          <FormTextArea
            ref={ref}
            id='title'
            onKeyDown={onTextareaKeyDown}
            placeholder='Enter a title for this card'
            errors={fieldErrors}
          />
          <input hidden id='listId' name='listId' defaultValue={listId} />
          <div className='flex items-center gap-x-1'>
            <FormSubmit>Add card</FormSubmit>
            <Button size='sm' variant='ghost' onClick={disableEditing}>
              <XIcon className='size-5' />
            </Button>
          </div>
        </form>
      );
    }

    return (
      <div className='px-2 pt-2'>
        <Button
          size='sm'
          variant='ghost'
          onClick={enableEditing}
          className='h-auto w-full justify-start py-1.5 text-sm text-muted-foreground'
        >
          <PlusIcon className='mr-2 size-4' />
          Add a card
        </Button>
      </div>
    );
  }
);
