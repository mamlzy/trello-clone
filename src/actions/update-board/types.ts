import { Board } from '@prisma/client';
import { z } from 'zod';

import { ActionState } from '@/lib/create-safe-action';
import { updateBoardSchema } from './schema';

export type InputType = z.infer<typeof updateBoardSchema>;
export type ReturnType = ActionState<InputType, Board>;
