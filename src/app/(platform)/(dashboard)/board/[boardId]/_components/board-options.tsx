'use client';

import { deleteBoard } from '@/actions/delete-board';
import { Popover } from '@radix-ui/react-popover';
import { MoreHorizontal, XIcon } from 'lucide-react';
import { toast } from 'sonner';

import { useAction } from '@/hooks/use-action';
import { Button } from '@/components/ui/button';
import {
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

type Props = {
  id: string;
};

export const BoardOptions = ({ id }: Props) => {
  const { execute, isLoading } = useAction(deleteBoard, {
    onError: (err) => {
      toast.error(err);
    },
  });

  const onDelete = () => {
    execute({ id });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='transparent' className='size-auto p-2'>
          <MoreHorizontal className='size-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent side='bottom' align='start' className='px-0 py-3'>
        <div className='pb-4 text-center text-sm font-medium text-neutral-600'>
          Board actions
        </div>
        <PopoverClose asChild>
          <Button
            variant='ghost'
            className='absolute right-2 top-2 size-auto p-2 text-neutral-600'
          >
            <XIcon className='size-4' />
          </Button>
        </PopoverClose>
        <Button
          variant='ghost'
          onClick={onDelete}
          disabled={isLoading}
          className='h-auto w-full justify-start rounded-none px-5 py-2 text-sm font-normal'
        >
          Delete this board
        </Button>
      </PopoverContent>
    </Popover>
  );
};
