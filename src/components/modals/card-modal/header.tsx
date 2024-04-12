'use client';

/* eslint-disable @typescript-eslint/no-shadow */
import { ElementRef, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { updateCard } from '@/actions/update-card';
import { CardWithList } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
import { LayoutIcon } from 'lucide-react';
import { toast } from 'sonner';

import { useAction } from '@/hooks/use-action';
import { FormInput } from '@/components/form/form-input';
import { Skeleton } from '@/components/ui/skeleton';

type Props = {
  data: CardWithList;
};

export const Header = ({ data }: Props) => {
  const qc = useQueryClient();
  const params = useParams();

  const { execute } = useAction(updateCard, {
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ['card', data.id] });
      qc.invalidateQueries({ queryKey: ['card-logs', data.id] });

      toast.success(`Renamed to ${data.title}`);
      setTitle(data.title);
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  const inputRef = useRef<ElementRef<'input'>>(null);

  const [title, setTitle] = useState(data.title);

  const onBlur = () => {
    inputRef.current?.form?.requestSubmit();
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;
    const boardId = params.boardId as string;

    if (title === data.title) return;

    execute({ id: data.id, boardId, title });
  };

  return (
    <div className='mb-6 flex w-full items-start gap-x-3'>
      <LayoutIcon className='mt-1 size-5 text-neutral-700' />
      <div className='w-full'>
        <form action={onSubmit}>
          <FormInput
            ref={inputRef}
            id='title'
            defaultValue={title}
            onBlur={onBlur}
            className='relative -left-1.5 mb-0.5 w-[95%] truncate border-transparent bg-transparent px-1 text-xl font-semibold text-neutral-700 focus-visible:border-input focus-visible:bg-white'
          />
        </form>
        <p className='text-sm text-muted-foreground'>
          in list <span className='underline'>{data.list.title}</span>
        </p>
      </div>
    </div>
  );
};

// eslint-disable-next-line react/function-component-definition
Header.Skeleton = function HeaderSkeleton() {
  return (
    <div className='mb-6 flex items-start gap-x-3'>
      <Skeleton className='mt-1 size-6 bg-neutral-200' />
      <div>
        <Skeleton className='mb-1 h-6 w-24 bg-neutral-200' />
        <Skeleton className='h-4 w-24 bg-neutral-200' />
      </div>
    </div>
  );
};
