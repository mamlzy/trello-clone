'use client';

import { Card } from '@prisma/client';

type Props = {
  data: Card;
  index: number;
};

export function CardItem({ data, index }: Props) {
  return (
    <div
      role='button'
      className='truncate rounded-md border-2 border-transparent bg-white px-3 py-2 text-sm shadow-sm hover:border-black'
    >
      {data.title}
    </div>
  );
}
