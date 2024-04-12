'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';
import { ACTION, ENTITY_TYPE } from '@prisma/client';

import { createAuditLog } from '@/lib/create-audit-log';
import { createSafeAction } from '@/lib/create-safe-action';
import { db } from '@/lib/db';
import { decreaseAvailableCount } from '@/lib/org-limit';
import { deleteBoardSchema } from './schema';
import { InputType, ReturnType } from './types';

// eslint-disable-next-line consistent-return
const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    };
  }

  const { id } = data;

  try {
    const board = await db.board.delete({
      where: {
        id,
        orgId,
      },
    });

    await decreaseAvailableCount();

    await createAuditLog({
      entityId: board.id,
      entityTitle: board.title,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.DELETE,
    });
  } catch (err) {
    console.log('err =>', err);
    return {
      error: 'Failed to delete',
    };
  }

  revalidatePath(`/organization/${orgId}`);
  redirect(`/organization/${orgId}`);
};

export const deleteBoard = createSafeAction(deleteBoardSchema, handler);
