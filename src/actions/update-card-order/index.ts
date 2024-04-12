'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs';

import { createSafeAction } from '@/lib/create-safe-action';
import { db } from '@/lib/db';
import { updateCardOrderSchema } from './schema';
import { InputType, ReturnType } from './types';

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    };
  }

  const { boardId, items } = data;

  let updatedCards;

  try {
    const transaction = items.map((card) =>
      db.card.update({
        where: {
          id: card.id,
          list: {
            board: {
              orgId,
            },
          },
        },
        data: {
          order: card.order,
          listId: card.listId,
        },
      })
    );

    updatedCards = await db.$transaction(transaction);
  } catch (err) {
    console.log('err =>', err);
    return {
      error: 'Failed to reorder',
    };
  }

  revalidatePath(`/board/${boardId}`);
  return {
    data: updatedCards,
  };
};

export const updateCardOrder = createSafeAction(updateCardOrderSchema, handler);
