'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs';

import { createSafeAction } from '@/lib/create-safe-action';
import { db } from '@/lib/db';
import { createCardSchema } from './schema';
import { InputType, ReturnType } from './types';

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    };
  }

  const { boardId, listId, title } = data;

  let card;

  try {
    const list = await db.list.findUnique({
      where: {
        id: listId,
        board: {
          orgId,
        },
      },
    });

    if (!list) {
      return {
        error: 'List not found',
      };
    }

    const lastCard = await db.card.findFirst({
      where: {
        listId,
      },
      orderBy: {
        order: 'desc',
      },
      select: {
        order: true,
      },
    });

    const newOrder = lastCard ? lastCard.order + 1 : 1;

    card = await db.card.create({
      data: {
        title,
        listId,
        order: newOrder,
      },
    });
  } catch (err) {
    console.log('err =>', err);
    return {
      error: 'Failed to create',
    };
  }

  revalidatePath(`/board/${boardId}`);
  return {
    data: card,
  };
};

export const createCard = createSafeAction(createCardSchema, handler);
