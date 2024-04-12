'use client';

import { ElementRef, useRef } from 'react';
import { copyList } from '@/actions/copy-list';
import { deleteList } from '@/actions/delete-list';
import { List } from '@prisma/client';
import { MoreHorizontalIcon, XIcon } from 'lucide-react';
import { toast } from 'sonner';

import { useAction } from '@/hooks/use-action';
import { FormSubmit } from '@/components/form/form-submit';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';

type Props = {
  data: List;
  onAddCard: () => void;
};

export function ListOptions({ data, onAddCard }: Props) {
  const closeRef = useRef<ElementRef<'button'>>(null);

  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess: (deletedData) => {
      toast.success(`List "${deletedData.title}" deleted`);
      closeRef.current?.click();
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  const { execute: executeCopy } = useAction(copyList, {
    onSuccess: (copiedData) => {
      toast.success(`List "${copiedData.title}" copied`);
      closeRef.current?.click();
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  const onDelete = (formData: FormData) => {
    const id = formData.get('id') as string;
    const boardId = formData.get('boardId') as string;

    executeDelete({ id, boardId });
  };

  const onCopy = (formData: FormData) => {
    const id = formData.get('id') as string;
    const boardId = formData.get('boardId') as string;

    executeCopy({ id, boardId });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='ghost' className='size-auto p-2'>
          <MoreHorizontalIcon className='size-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent side='bottom' align='start' className='px-0 py-3'>
        <div className='pb-4 text-center text-sm font-medium text-neutral-600'>
          List actions
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            variant='ghost'
            className='absolute right-2 top-2 size-auto p-2 text-neutral-600'
          >
            <XIcon className='size-4' />
          </Button>
        </PopoverClose>
        <Button
          variant='ghost'
          onClick={onAddCard}
          className='h-auto w-full justify-start rounded-none px-5 py-2 text-sm font-normal'
        >
          Add card..
        </Button>
        <form action={onCopy}>
          <input hidden id='id' name='id' value={data.id} />
          <input hidden id='boardId ' name='boardId' value={data.boardId} />
          <FormSubmit
            variant='ghost'
            className='h-auto w-full justify-start rounded-none px-5 py-2 text-sm font-normal'
          >
            Copy list
          </FormSubmit>
        </form>
        <Separator />
        <form action={onDelete}>
          <input hidden id='id' name='id' value={data.id} />
          <input hidden id='boardId ' name='boardId' value={data.boardId} />
          <FormSubmit
            variant='ghost'
            className='h-auto w-full justify-start rounded-none px-5 py-2 text-sm font-normal'
          >
            Delete this list
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
}
