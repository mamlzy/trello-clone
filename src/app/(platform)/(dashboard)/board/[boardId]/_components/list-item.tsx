'use client';

import { ElementRef, useRef, useState } from 'react';
import { ListWithCards } from '@/types';

import { cn } from '@/lib/utils';
import { CardForm } from './card-form';
import { CardItem } from './card-item';
import { ListHeader } from './list-header';

type Props = {
  data: ListWithCards;
  index: number;
};

export function ListItem({ data, index }: Props) {
  const textareaRef = useRef<ElementRef<'textarea'>>(null);

  const [isEditing, setIsEditing] = useState(false);

  const disableEditing = () => {
    setIsEditing(false);
  };

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };

  return (
    <li className='h-full w-[272px] shrink-0 select-none'>
      <div className='w-full rounded-md bg-[#f1f2f4] pb-2 shadow-md'>
        <ListHeader data={data} onAddCard={enableEditing} />
        <ol
          className={cn(
            'mx-1 flex flex-col gap-y-2 px-1 py-0.5',
            data.cards.length > 0 ? 'mt-2' : 'mt-0'
          )}
        >
          {data.cards.map((card, idx) => (
            <CardItem key={card.id} index={idx} data={card} />
          ))}
        </ol>
        <CardForm
          ref={textareaRef}
          listId={data.id}
          isEditing={isEditing}
          enableEditing={enableEditing}
          disableEditing={disableEditing}
        />
      </div>
    </li>
  );
}
