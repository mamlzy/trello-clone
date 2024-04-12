'use client';

/* eslint-disable @typescript-eslint/no-shadow */
import { useParams } from 'next/navigation';
import { copyCard } from '@/actions/copy-card';
import { deleteCard } from '@/actions/delete-card';
import { CardWithList } from '@/types';
import { CopyIcon, TrashIcon } from 'lucide-react';
import { toast } from 'sonner';

import { useAction } from '@/hooks/use-action';
import { useCardModal } from '@/hooks/use-card-modal';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

type Props = {
  data: CardWithList;
};

export function Actions({ data }: Props) {
  const params = useParams();
  const onClose = useCardModal((state) => state.onClose);

  const { execute: executeCopyCard, isLoading: isLoadingCopy } = useAction(
    copyCard,
    {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" copied`);
        onClose();
      },
      onError: (err) => {
        toast.error(err);
      },
    }
  );
  const { execute: executeDeleteCard, isLoading: isLoadingDelete } = useAction(
    deleteCard,
    {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" deleted`);
        onClose();
      },
      onError: (err) => {
        toast.error(err);
      },
    }
  );

  const onCopy = () => {
    const boardId = params.boardId as string;

    executeCopyCard({ id: data.id, boardId });
  };

  const onDelete = () => {
    const boardId = params.boardId as string;

    executeDeleteCard({ id: data.id, boardId });
  };

  return (
    <div className='mt-2 space-y-2'>
      <p className='text-xs font-semibold'>Actions</p>
      <Button
        variant='gray'
        size='inline'
        onClick={onCopy}
        disabled={isLoadingCopy}
        className='w-full justify-start'
      >
        <CopyIcon className='mr-2 size-4' /> Copy
      </Button>
      <Button
        variant='gray'
        size='inline'
        onClick={onDelete}
        disabled={isLoadingDelete}
        className='w-full justify-start'
      >
        <TrashIcon className='mr-2 size-4' /> Delete
      </Button>
    </div>
  );
}

// eslint-disable-next-line react/function-component-definition
Actions.Skeleton = function ActionsSkeleton() {
  return (
    <div className='mt-2 space-y-2'>
      <Skeleton className='h-4 w-20 bg-neutral-200' />
      <Skeleton className='h-8 w-full bg-neutral-200' />
      <Skeleton className='fieldErrors bg-neutral-200' />
    </div>
  );
};
