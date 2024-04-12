'use client';

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import { Draggable } from '@hello-pangea/dnd';
import { Card } from '@prisma/client';

import { useCardModal } from '@/hooks/use-card-modal';

type Props = {
  data: Card;
  index: number;
};

export function CardItem({ data, index }: Props) {
  const onOpen = useCardModal((state) => state.onOpen);

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={() => onOpen(data.id)}
          role='button'
          className='truncate rounded-md border-2 border-transparent bg-white px-3 py-2 text-sm shadow-sm hover:border-black'
        >
          {data.title}
        </div>
      )}
    </Draggable>
  );
}
