'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs';

import { createSafeAction } from '@/lib/create-safe-action';
import { db } from '@/lib/db';
import { deleteCardSchema } from './schema';
import { InputType, ReturnType } from './types';

// eslint-disable-next-line consistent-return
const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    };
  }

  const { id, boardId } = data;

  let card;

  try {
    card = await db.card.delete({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
    });
  } catch (err) {
    console.log('err =>', err);
    return {
      error: 'Failed to delete',
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const deleteCard = createSafeAction(deleteCardSchema, handler);
