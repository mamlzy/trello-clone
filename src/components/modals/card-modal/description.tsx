'use client';

/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ElementRef, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { updateCard } from '@/actions/update-card';
import { CardWithList } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
import { AlignLeftIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';

import { useAction } from '@/hooks/use-action';
import { FormSubmit } from '@/components/form/form-submit';
import { FormTextArea } from '@/components/form/form-textarea';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

type Props = {
  data: CardWithList;
};

export function Description({ data }: Props) {
  const qc = useQueryClient();
  const params = useParams();

  const formRef = useRef<ElementRef<'form'>>(null);
  const textareaRef = useRef<ElementRef<'textarea'>>(null);

  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      disableEditing();
    }
  };

  useEventListener('keydown', onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const { execute, fieldErrors } = useAction(updateCard, {
    onSuccess: (data) => {
      qc.invalidateQueries({
        queryKey: ['card', data.id],
      });
      toast.success(`Card "${data.title} updated"`);
      disableEditing();
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  const onSubmit = (formData: FormData) => {
    const description = formData.get('description') as string;
    const boardId = params.boardId as string;

    execute({
      id: data.id,
      boardId,
      description,
    });
  };

  return (
    <div className='flex w-full items-start gap-x-3'>
      <AlignLeftIcon className='mt-0.5 size-5 text-neutral-700' />
      <div className='w-full'>
        <p className='mb-2 font-semibold text-neutral-700'>Description</p>
        {isEditing ? (
          <form ref={formRef} action={onSubmit} className='space-y-2'>
            <FormTextArea
              ref={textareaRef}
              id='description'
              className='mt-2 w-full'
              placeholder='Add a more detailed description'
              defaultValue={data.description || undefined}
              errors={fieldErrors}
            />
            <div className='flex items-center gap-x-2'>
              <FormSubmit>Save</FormSubmit>
              <Button
                type='button'
                size='sm'
                variant='ghost'
                onClick={disableEditing}
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div
            role='button'
            onClick={enableEditing}
            className='min-h-[78px] rounded-md bg-neutral-200 px-3.5 py-3 text-sm font-medium'
          >
            {data.description || 'Add a more detailed description...'}
          </div>
        )}
      </div>
    </div>
  );
}

// eslint-disable-next-line react/function-component-definition
Description.Skeleton = function DescriptionSkeleton() {
  return (
    <div className='flex w-full items-start gap-x-3'>
      <Skeleton className='size-6 bg-neutral-200' />
      <div className='w-full'>
        <Skeleton className='mb-2 h-6 w-24 bg-neutral-200' />
        <Skeleton className='h-[78px] w-full bg-neutral-200' />
      </div>
    </div>
  );
};
